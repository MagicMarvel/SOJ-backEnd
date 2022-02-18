import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  // 导出UserService以便其他模块import的时候能顺便import这个UsersService
  exports: [UsersService],
})
export class UsersModule {}
