import {
  Controller,
  All,
  Req,
  Res,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import type { AxiosError, AxiosRequestConfig, Method } from 'axios';

@ApiTags('Storage')
@Controller('storage')
export class StorageProxyController {
  private readonly logger = new Logger(StorageProxyController.name);
  private readonly storageServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.storageServiceUrl =
      this.configService.get<string>('STORAGE_SERVICE_URL') || 'http://localhost:8003';
  }

  @All('*')
  @ApiOperation({ summary: 'Proxy storage requests to storage-service' })
  async proxyStorage(@Req() req: Request, @Res() res: Response): Promise<void> {
    await this.proxyRequest(req, res);
  }

  private async proxyRequest(req: Request, res: Response): Promise<void> {
    const targetPath = req.url;
    const targetUrl = `${this.storageServiceUrl}${targetPath}`;

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
      timeout: 60000,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.request(config).pipe(
          timeout(60000),
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

      const contentDisposition = response.headers['content-disposition'];
      if (contentDisposition) {
        res.setHeader('Content-Disposition', contentDisposition);
      }

      res.status(response.status).send(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.code === 'ECONNREFUSED') {
        this.logger.error(`Storage service is unavailable at ${this.storageServiceUrl}`);
        throw new HttpException(
          {
            statusCode: HttpStatus.SERVICE_UNAVAILABLE,
            message: 'Storage service is currently unavailable',
            error: 'Service Unavailable',
          },
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      if (axiosError.code === 'ETIMEDOUT' || axiosError.code === 'ECONNABORTED') {
        this.logger.error(`Request to storage service timed out: ${targetUrl}`);
        throw new HttpException(
          {
            statusCode: HttpStatus.GATEWAY_TIMEOUT,
            message: 'Request to storage service timed out',
            error: 'Gateway Timeout',
          },
          HttpStatus.GATEWAY_TIMEOUT,
        );
      }

      this.logger.error(`Unexpected proxy error: ${axiosError.message}`, axiosError.stack);
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_GATEWAY,
          message: 'An error occurred while communicating with the storage service',
          error: 'Bad Gateway',
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
