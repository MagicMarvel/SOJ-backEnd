import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { LocalAuthGuard } from '../auth/guard/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';

import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('user')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('regist')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // 使用守卫，把守卫配置成身份验证守卫，策略为Local
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // 使用守卫，把守卫配置成身份验证守卫，策略为Jwt
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    const { secret, ...result } = await this.usersService.findOne(
      req.user.username,
    );
    return result;
  }
}
