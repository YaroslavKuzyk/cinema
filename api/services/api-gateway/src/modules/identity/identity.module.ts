import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { IdentityProxyController } from './identity-proxy.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 80000,
      maxRedirects: 5,
    }),
    ConfigModule,
  ],
  controllers: [IdentityProxyController],
})
export class IdentityModule {}
