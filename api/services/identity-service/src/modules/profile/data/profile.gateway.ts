import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { ID, IProfileData, ICreateProfileData, IUpdateProfileData } from '@cinema/shared';
import { IProfileGateway } from '../domain/profile.gateway';
import { ProfileMapper } from './profile.mapper';

@Injectable()
export class ProfileGateway implements IProfileGateway {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ProfileMapper,
  ) {}

  async findByUserId(userId: ID): Promise<IProfileData | null> {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });
    return profile ? this.mapper.toProfileData(profile) : null;
  }

  async create(data: ICreateProfileData): Promise<IProfileData> {
    const profile = await this.prisma.profile.create({ data });
    return this.mapper.toProfileData(profile);
  }

  async update(userId: ID, data: IUpdateProfileData): Promise<IProfileData> {
    const profile = await this.prisma.profile.update({
      where: { userId },
      data,
    });
    return this.mapper.toProfileData(profile);
  }

  async delete(userId: ID): Promise<void> {
    await this.prisma.profile.delete({ where: { userId } });
  }
}
