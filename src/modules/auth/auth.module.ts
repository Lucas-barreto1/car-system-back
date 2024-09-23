import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_SERVICE } from 'src/application/services/auth.service';
import { JwtStrategy } from 'src/infra/auth/jwt.strategy';
import { JwtTokenService } from 'src/infra/services/jwt.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';

const authService = {
  provide: AUTH_SERVICE,
  useClass: JwtTokenService,
};

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [authService, JwtStrategy],
  exports: [authService],
})
export class AuthModule {}
