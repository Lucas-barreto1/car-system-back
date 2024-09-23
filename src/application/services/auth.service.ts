import { User } from 'src/domain/entities/user/user';

export const AUTH_SERVICE = 'AUTH_SERVICE';

export interface TokenPayload {
  email: string;
  id: string;
}

export interface AuthService {
  login(username: string, password: string): Promise<string>;
  findById(id: string): Promise<User>;
}
