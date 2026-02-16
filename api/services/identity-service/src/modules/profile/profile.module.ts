import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infrastructure/database';
import { ProfileController } from './profile.controller';
import { ProfileService } from './domain/profile.service';
import { IProfileGateway } from './domain/profile.gateway';
import { ProfileGateway } from './data/profile.gateway';
import { ProfileMapper } from './data/profile.mapper';
import {
  GetProfileUseCase,
  CreateProfileUseCase,
  UpdateProfileUseCase,
} from './use-cases';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfileController],
  providers: [
    { provide: IProfileGateway, useClass: ProfileGateway },
    ProfileService,
    ProfileMapper,
    GetProfileUseCase,
    CreateProfileUseCase,
    UpdateProfileUseCase,
  ],
  exports: [ProfileService],
})
export class ProfileModule {}
