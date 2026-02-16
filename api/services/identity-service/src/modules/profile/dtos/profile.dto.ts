import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiPropertyOptional({ example: 'movie-enthusiast' })
  @IsString()
  @IsOptional()
  keyword?: string;

  @ApiPropertyOptional({ example: 'A passionate movie lover with a taste for classics' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'California' })
  @IsString()
  @IsOptional()
  state?: string;
}

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'movie-enthusiast' })
  @IsString()
  @IsOptional()
  keyword?: string;

  @ApiPropertyOptional({ example: 'A passionate movie lover with a taste for classics' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'California' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({ example: 'avatars/user-123/photo.jpg' })
  @IsString()
  @IsOptional()
  avatarKey?: string | null;
}

export class ProfileResponseDto {
  @ApiProperty({ example: 'user-id-550e8400-e29b-41d4-a716-446655440000' })
  userId: string;

  @ApiPropertyOptional({ example: 'movie-enthusiast' })
  keyword?: string;

  @ApiPropertyOptional({ example: 'A passionate movie lover' })
  description?: string;

  @ApiPropertyOptional({ example: 'California' })
  state?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
