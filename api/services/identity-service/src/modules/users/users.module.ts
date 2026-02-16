import { Module } from '@nestjs/common';
import { UsersService } from './domain/users.service';
import { IUsersGateway } from './domain/users.gateway';
import { UsersMapper } from './data/users.mapper';
import { UsersGateway } from './data/users.gateway';

@Module({
  providers: [
    { provide: IUsersGateway, useClass: UsersGateway },
    UsersService,
    UsersMapper,
  ],
  exports: [
    { provide: IUsersGateway, useClass: UsersGateway },
    UsersService,
    UsersMapper,
  ],
})
export class UsersModule {}
