import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controller/user.controller'
import { UserServices } from './services/user.services'
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy'
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt/JwtAuthGuard'
import { RolesGuard } from './permissionGuard/permission.guard'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '6000s' },
    }),],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    UserServices,
    JwtStrategy,
    // { // 全局使用身份验证(JWT)
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard
    // },
    { // 全局使用接口权限认证
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule { }
