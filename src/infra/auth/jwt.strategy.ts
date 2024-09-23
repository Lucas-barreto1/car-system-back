import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/application/repositories/user.repository';
import { TokenPayload } from 'src/application/services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(USER_REPOSITORY) private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(payload: TokenPayload) {
    const user = await this.userRepository.findUserById(payload.id);
    return user;
  }
}
