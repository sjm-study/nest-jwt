import { Module, Logger, } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controller/user.controller'
import { UserServices } from './services/user.services'
import { PermissionServices } from './services/permission.services'
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy'
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt/JwtAuthGuard'
import { RolesGuard } from './permissionGuard/permission.guard'
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    Reflector,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '6000s' },
    }),
    MikroOrmModule.forRoot({
      entities: ['./dist/entities'],
      entitiesTs: ['./src/entities'],
      type: 'mysql',
      host: process.env.DB_BI_HOST,
      port: Number(process.env.DB_BI_PORT),
      user: process.env.DB_BI_USER,
      password: process.env.DB_BI_PASSWORD,
      dbName: process.env.DB_BI_NAME,
      contextName: 'database',
      registerRequestContext: false,
      allowGlobalContext: true,
      debug: ['query']
    }),
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    PermissionServices,
    UserServices,
    JwtStrategy,
    { // 全局使用身份验证(JWT)
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    { // 全局使用接口权限认证
      provide: APP_GUARD,
      useClass: RolesGuard
    },

  ],
})
export class AppModule { }
