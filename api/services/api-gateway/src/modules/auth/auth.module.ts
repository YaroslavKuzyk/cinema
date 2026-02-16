import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Module({
  imports: [ConfigModule],
  providers: [JwtAuthGuard, JwtRefreshGuard],
  exports: [JwtAuthGuard, JwtRefreshGuard],
})
export class AuthModule {}
