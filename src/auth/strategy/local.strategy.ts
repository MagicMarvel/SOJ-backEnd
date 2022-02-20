import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

// 设置本地身份验证策略
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // 注入authService,这个东西能让我们知道我们的密码和数据库的密码是否正确
  constructor(private readonly authService: AuthService) {
    super();
  }

  // 正确则返回这个 user，这个 user 会被加载到 req 中，不正确则抛出异常，守卫自动运行这个
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
