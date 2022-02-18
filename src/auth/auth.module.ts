import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

// 将Strategy作为provider引入，才能让nestjs看到这个东西
@Module({
  // 这里引入UserModule是为了引入它导出的UsersService
  imports: [
    UsersModule,
    PassportModule,
    // 引入jwt模块，设置token过期时间，生成token的那个工具也在这里引入，才能进行注入
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
