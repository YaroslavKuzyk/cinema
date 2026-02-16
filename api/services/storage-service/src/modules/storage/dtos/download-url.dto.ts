import { IsString, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

export class DownloadUrlResponseDto {
  @ApiProperty({
    example: 'https://bucket.s3.region.amazonaws.com/movies/poster-123.jpg?...',
    description: 'The presigned URL to download the file',
  })
  url: string;

  @ApiProperty({
    example: 'movies/poster-123.jpg',
    description: 'The key of the file',
  })
  key: string;

  @ApiProperty({
    example: '2024-01-15T12:00:00.000Z',
    description: 'The expiration time of the URL',
  })
  expiresAt: Date;
}
