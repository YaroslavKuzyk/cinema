import {
  Controller,
  All,
  Req,
  Res,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import type { AxiosError, AxiosRequestConfig, Method } from 'axios';

@ApiTags('Identity')
@Controller()
export class IdentityProxyController {
  private readonly logger = new Logger(IdentityProxyController.name);
  private readonly identityServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.identityServiceUrl =
      this.configService.get<string>('IDENTITY_SERVICE_URL') || 'http://localhost:8001';
  }

  @All('auth/*')
  @ApiOperation({ summary: 'Proxy authentication requests to identity-service' })
  async proxyAuth(@Req() req: Request, @Res() res: Response): Promise<void> {
    await this.proxyRequest(req, res, 'auth');
  }

  @All('profile/*')
  @ApiOperation({ summary: 'Proxy profile requests to identity-service' })
  async proxyProfile(@Req() req: Request, @Res() res: Response): Promise<void> {
    await this.proxyRequest(req, res, 'profile');
  }

  @All('users/*')
  @ApiExcludeEndpoint()
  async proxyUsers(@Req() req: Request, @Res() res: Response): Promise<void> {
    await this.proxyRequest(req, res, 'users');
  }

  private async proxyRequest(
    req: Request,
    res: Response,
    basePath: string,
  ): Promise<void> {
    const targetPath = req.url;
    const targetUrl = `${this.identityServiceUrl}${targetPath}`;

    this.logger.debug(`Proxying ${req.method} ${req.url} -> ${targetUrl}`);

    const headers: Record<string, string> = {};

    if (req.headers.authorization) {
      headers['Authorization'] = req.headers.authorization;
    }

    if (req.headers['content-type']) {
      headers['Content-Type'] = req.headers['content-type'];
    }

    if (req.headers.cookie) {
      headers['Cookie'] = req.headers.cookie;
    }

    if (req.headers['x-request-id']) {
      headers['X-Request-Id'] = req.headers['x-request-id'] as string;
    }

    if (req.headers['x-forwarded-for']) {
      headers['X-Forwarded-For'] = req.headers['x-forwarded-for'] as string;
    } else if (req.ip) {
      headers['X-Forwarded-For'] = req.ip;
    }

    const config: AxiosRequestConfig = {
      method: req.method as Method,
      url: targetUrl,
      headers,
      data: req.body,
      validateStatus: () => true,
      timeout: 80000,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.request(config).pipe(
          timeout(80000),
          catchError((error: AxiosError) => {
            this.logger.error(
              `Proxy error for ${req.method} ${targetUrl}: ${error.message}`,
              error.stack,
            );
            throw error;
          }),
        ),
      );

      const setCookieHeader = response.headers['set-cookie'];
      if (setCookieHeader) {
        res.setHeader('Set-Cookie', setCookieHeader);
      }

      const contentType = response.headers['content-type'];
      if (contentType) {
        res.setHeader('Content-Type', contentType);
      }

      res.status(response.status).send(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.code === 'ECONNREFUSED') {
        this.logger.error(`Identity service is unavailable at ${this.identityServiceUrl}`);
        throw new HttpException(
          {
            statusCode: HttpStatus.SERVICE_UNAVAILABLE,
            message: 'Identity service is currently unavailable',
            error: 'Service Unavailable',
          },
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      if (axiosError.code === 'ETIMEDOUT' || axiosError.code === 'ECONNABORTED') {
        this.logger.error(`Request to identity service timed out: ${targetUrl}`);
        throw new HttpException(
          {
            statusCode: HttpStatus.GATEWAY_TIMEOUT,
            message: 'Request to identity service timed out',
            error: 'Gateway Timeout',
          },
          HttpStatus.GATEWAY_TIMEOUT,
        );
      }

      this.logger.error(`Unexpected proxy error: ${axiosError.message}`, axiosError.stack);
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_GATEWAY,
          message: 'An error occurred while communicating with the identity service',
          error: 'Bad Gateway',
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
