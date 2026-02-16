import { Controller, Post, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { IStorageResult } from '@cinema/shared';
import { StorageService } from './domain/storage.service';
import {
  GetUploadUrlDto,
  UploadUrlResponseDto,
  GetDownloadUrlDto,
  DownloadUrlResponseDto,
} from './dtos';

@ApiTags('Storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload-url')
  @ApiOperation({ summary: 'Get a presigned URL for file upload' })
  @ApiCreatedResponse({
    description: 'Upload URL generated successfully',
    type: UploadUrlResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid request parameters' })
  async getUploadUrl(@Body() dto: GetUploadUrlDto): Promise<UploadUrlResponseDto> {
    return this.storageService.getUploadUrl(dto.key, dto.contentType, dto.expiresIn);
  }

  @Post('download-url')
  @ApiOperation({ summary: 'Get a presigned URL for file download' })
  @ApiCreatedResponse({
    description: 'Download URL generated successfully',
    type: DownloadUrlResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid request parameters' })
  async getDownloadUrl(@Body() dto: GetDownloadUrlDto): Promise<DownloadUrlResponseDto> {
    return this.storageService.getDownloadUrl(dto.key, dto.expiresIn);
  }

  @Delete('*key')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a file from storage' })
  @ApiOkResponse({
    description: 'File deleted successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        key: { type: 'string', example: 'movies/poster-123.jpg' },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'File not found' })
  async delete(@Param('key') key: string): Promise<IStorageResult> {
    return this.storageService.delete(key);
  }
}
