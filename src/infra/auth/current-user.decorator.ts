import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/domain/entities/user/user';

export const GetCurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    return request?.user;
  },
);
