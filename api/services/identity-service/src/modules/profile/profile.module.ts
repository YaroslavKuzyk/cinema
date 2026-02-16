import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '@/infrastructure/database';
import { UsersModule } from '@/modules/users/users.module';
import { ProfileController } from './profile.controller';
import { ProfileMessageController } from './profile-message.controller';
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
  imports: [DatabaseModule, forwardRef(() => UsersModule)],
  controllers: [ProfileController, ProfileMessageController],
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
