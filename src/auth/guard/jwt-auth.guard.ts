import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// 自定义一个 Guard，这样便不需要再写这个jwt魔术字符串
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
