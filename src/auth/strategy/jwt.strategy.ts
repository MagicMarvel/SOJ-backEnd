import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// 设置验证策略
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // 对验证策略做一些配置
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // 必要的，守卫会自动运行这个，并把结果插入req，由于这个是服务器发送的并经过了签名，便不需要验证数据库是否有这一条，
  // 只要解码正确即可，解码是passport做的，如果解码错误会抛出异常
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
