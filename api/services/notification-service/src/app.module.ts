import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './modules/email/email.module';
import { KafkaModule } from './infrastructure/messaging';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EmailModule,
    KafkaModule,
  ],
})
export class AppModule {}
