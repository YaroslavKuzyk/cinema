import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ID } from '@cinema/shared';
import { UsersService } from '@/modules/users/domain/users.service';
import { AuthMapper } from '../data/auth.mapper';
import { IUserInfo } from '../domain/auth.types';

@Injectable()
export class GetCurrentUserUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly authMapper: AuthMapper,
  ) {}

  async execute(userId: ID): Promise<IUserInfo> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.authMapper.toUserInfo(user);
  }
}
