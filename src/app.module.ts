import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAuthGuard } from './infra/auth/jwt-auth.guard';
import { DatabaseModule } from './infra/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { BrandModule } from './modules/brand/brand.module';
import { UserModule } from './modules/user/user.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    AuthModule,
    BrandModule,
    VehicleModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
