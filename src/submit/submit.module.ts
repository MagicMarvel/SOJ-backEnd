import { Module } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { SubmitController } from './submit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submition } from './entities/submit.entity';
import { Problem } from 'src/problem/entities/problem.entity';
import { User } from 'src/users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Submition, Problem, User])],
  controllers: [SubmitController],
  providers: [SubmitService],
})
export class SubmitModule {}
