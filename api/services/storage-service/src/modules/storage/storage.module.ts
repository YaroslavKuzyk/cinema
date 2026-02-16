import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './domain/storage.service';
import { IStorageGateway } from './domain/storage.gateway';
import { S3Gateway } from './data/s3.gateway';

@Module({
  controllers: [StorageController],
  providers: [
    { provide: IStorageGateway, useClass: S3Gateway },
    StorageService,
  ],
  exports: [StorageService],
})
export class StorageModule {}
