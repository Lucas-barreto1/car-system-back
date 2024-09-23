import { SetMetadata } from '@nestjs/common';
import { roles } from './roles';

export const REQUIRED_ROLES = 'requiredRoles';

export const Authorize = (...requiredRoles: (keyof typeof roles)[]) =>
  SetMetadata(REQUIRED_ROLES, requiredRoles);
