import { IsString, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetUploadUrlDto {
  @ApiProperty({
    example: 'avatar.jpg',
    description: 'The name of the file to upload',
  })
  @IsString()
  fileName: string;

  @ApiProperty({
    example: 'image/jpeg',
    description: 'The MIME type of the file to upload',
  })
  @IsString()
  contentType: string;

  @ApiPropertyOptional({
    example: 'avatars',
    description: 'The folder where the file will be stored',
  })
  @IsString()
  @IsOptional()
  folder?: string;

  @ApiPropertyOptional({
    example: 3600,
    description: 'URL expiration time in seconds (default: 3600)',
  })
  @IsNumber()
  @Min(60)
  @IsOptional()
  expiresIn?: number;
}

export class GetDownloadUrlDto {
  @ApiProperty({
    example: 'movies/poster-123.jpg',
    description: 'The key (path) of the file to download',
  })
  @IsString()
  key: string;

  @ApiPropertyOptional({
    example: 3600,
    description: 'URL expiration time in seconds (default: 3600)',
  })
  @IsNumber()
  @Min(60)
  @IsOptional()
  expiresIn?: number;
}
