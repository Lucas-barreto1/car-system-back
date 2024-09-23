import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/application/repositories/user.repository';
import {
  AuthService,
  TokenPayload,
} from 'src/application/services/auth.service';
import { IBcryptService } from 'src/application/services/bcrypt.service';
import { User } from 'src/domain/entities/user/user';
import { BcryptService } from './bcrypt.service';

@Injectable()
export class JwtTokenService implements AuthService {
  private bcryptService: IBcryptService;

  constructor(
    private readonly jwtService: JwtService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {
    this.bcryptService = new BcryptService();
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.userRepository.findUserByUsername(username);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isPasswordMatch = await this.bcryptService.compare(
      password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new Error('Senha inválida');
    }

    return this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email.getValue(),
      } as TokenPayload,
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      },
    );
  }

  findById(id: string): Promise<User> {
    return this.userRepository.findUserById(id);
  }
}
