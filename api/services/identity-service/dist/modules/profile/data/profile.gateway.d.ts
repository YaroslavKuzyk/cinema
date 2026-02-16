import { PrismaService } from '@/infrastructure/database/prisma.service';
import { ID, IProfileData, ICreateProfileData, IUpdateProfileData } from '@cinema/shared';
import { IProfileGateway } from '../domain/profile.gateway';
import { ProfileMapper } from './profile.mapper';
export declare class ProfileGateway implements IProfileGateway {
    private readonly prisma;
    private readonly mapper;
    constructor(prisma: PrismaService, mapper: ProfileMapper);
    findByUserId(userId: ID): Promise<IProfileData | null>;
    create(data: ICreateProfileData): Promise<IProfileData>;
    update(userId: ID, data: IUpdateProfileData): Promise<IProfileData>;
    delete(userId: ID): Promise<void>;
}
