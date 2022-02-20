import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

// AuthService的任务是验证密码
@Injectable()
export class AuthService {
  // 注入可以找到密码的 UsersService和密钥
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // 运用检索出来的密码和收到的密码做比较，判断是否密码正确，正确则返回result，不正确返回null
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && (await bcrypt.compare(pass, user.secret))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { secret, ...result } = user;
      return result;
    }
    return null;
  }

  // 用JwtService返回一个token
  async login(user: any) {
    let roles = user.roles.map((element) => {
      return element.role;
    });

    const payload = {
      username: user.name,
      sub: user.user_id,
      roles: roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
