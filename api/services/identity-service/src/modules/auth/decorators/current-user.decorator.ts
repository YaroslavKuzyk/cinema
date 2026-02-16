import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ID } from '@cinema/shared';

export interface ICurrentUser {
  id: ID;
  email: string;
  refreshToken?: string;
}

export const CurrentUser = createParamDecorator(
  (data: keyof ICurrentUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: ICurrentUser }>();
    const user = request.user;

    if (data) {
      return user[data];
    }

    return user;
  },
);
