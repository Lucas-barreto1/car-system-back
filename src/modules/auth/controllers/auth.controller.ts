import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  AUTH_SERVICE,
  AuthService,
} from 'src/application/services/auth.service';
import { User } from 'src/domain/entities/user/user';
import { GetCurrentUser } from 'src/infra/auth/current-user.decorator';
import { Public } from 'src/infra/auth/public.guard';
import { LoginDto } from '../DTO/login.dto';

@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: AuthService,
  ) {}

  @Post('login')
  @Public()
  async login(@Body() dto: LoginDto) {
    const token = await this.authService.login(dto.username, dto.password);

    return {
      token,
    };
  }

  @Get('me')
  async me(@GetCurrentUser() user: User): Promise<User> {
    return user;
  }
}
