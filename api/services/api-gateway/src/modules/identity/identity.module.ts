import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IdentityController } from './identity.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ConfigModule, AuthModule],
  controllers: [IdentityController],
})
export class IdentityModule {}
