import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/domain/entities/user/user';
import { REQUIRED_ROLES } from './authorize.guard';
import { IS_PUBLIC_KEY } from './public.guard';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const canActivate = await super.canActivate(context);
    if (!canActivate) return false;

    const user: User = context.switchToHttp().getRequest().user;

    const roles = this.reflector.getAllAndOverride<string[] | undefined>(
      REQUIRED_ROLES,
      [context.getHandler(), context.getClass()],
    );

    if (roles?.length > 0) {
      const valid = roles.some((role) => user.roles.includes(role));

      return valid;
    }

    return true;
  }
}
