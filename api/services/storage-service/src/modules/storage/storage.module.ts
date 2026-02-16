import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageMessageController } from './storage-message.controller';
import { StorageService } from './domain/storage.service';
import { IStorageGateway } from './domain/storage.gateway';
import { S3Gateway } from './data/s3.gateway';

@Module({
  controllers: [StorageController, StorageMessageController],
  providers: [
    { provide: IStorageGateway, useClass: S3Gateway },
    StorageService,
  ],
  exports: [StorageService],
})
export class StorageModule {}
