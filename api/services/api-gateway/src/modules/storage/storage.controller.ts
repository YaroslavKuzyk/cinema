import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  Req,
  Res,
  HttpCode,
  HttpStatus,
  HttpException,
  Logger,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { STORAGE_PATTERNS, IKafkaResponse } from '@cinema/shared';
import { KafkaProxyService } from '../../infrastructure/kafka/kafka-proxy.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUploadUrlDto, GetDownloadUrlDto } from './dtos';

@ApiTags('Storage')
@Controller('storage')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StorageController {
  private readonly logger = new Logger(StorageController.name);

  constructor(private readonly kafkaProxy: KafkaProxyService) {}

  private handleResponse<T>(
    res: Response,
    response: IKafkaResponse<T>,
    successStatus = HttpStatus.OK,
  ): T {
    this.kafkaProxy.applyResponseMetadata(res, response);

    if (!response.success) {
      throw new HttpException(
        {
          statusCode: response.error?.statusCode || 500,
          message: response.error?.message || 'Internal server error',
          error: response.error?.error,
        },
        response.error?.statusCode || 500,
      );
    }

    res.status(successStatus);
    return response.data as T;
  }

  @Post('upload-url')
  @ApiOperation({ summary: 'Get a presigned URL for file upload' })
  @ApiCreatedResponse({ description: 'Upload URL generated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid request parameters' })
  async getUploadUrl(
    @Body() dto: GetUploadUrlDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // Generate unique key from fileName and folder
    const ext = dto.fileName.split('.').pop() || '';
    const uniqueName = `${uuid()}${ext ? `.${ext}` : ''}`;
    const key = dto.folder ? `${dto.folder}/${uniqueName}` : uniqueName;

    const context = this.kafkaProxy.buildContext(req);
    const response = await this.kafkaProxy.sendToStorage(
      STORAGE_PATTERNS.GET_UPLOAD_URL,
      { key, contentType: dto.contentType, expiresIn: dto.expiresIn },
      context,
    );
    return this.handleResponse(res, response, HttpStatus.CREATED);
  }

  @Post('download-url')
  @ApiOperation({ summary: 'Get a presigned URL for file download' })
  @ApiCreatedResponse({ description: 'Download URL generated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid request parameters' })
  async getDownloadUrl(
    @Body() dto: GetDownloadUrlDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const context = this.kafkaProxy.buildContext(req);
    const response = await this.kafkaProxy.sendToStorage(
      STORAGE_PATTERNS.GET_DOWNLOAD_URL,
      dto,
      context,
    );
    return this.handleResponse(res, response, HttpStatus.CREATED);
  }

  @Delete('*key')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a file from storage' })
  @ApiOkResponse({ description: 'File deleted successfully' })
  @ApiNotFoundResponse({ description: 'File not found' })
  async delete(
    @Param('key') key: string[],
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const context = this.kafkaProxy.buildContext(req);
    const keyPath = Array.isArray(key) ? key.join('/') : key;
    const response = await this.kafkaProxy.sendToStorage(
      STORAGE_PATTERNS.DELETE,
      { key: keyPath },
      context,
    );
    return this.handleResponse(res, response);
  }
}
