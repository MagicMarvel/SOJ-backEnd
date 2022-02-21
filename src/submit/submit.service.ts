import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { Submition } from './entities/submit.entity';
import { submitState } from './submitState.enum';

@Injectable()
export class SubmitService {
  constructor(
    @InjectRepository(Submition)
    private submitionRepository: Repository<Submition>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(uid: number, pid: number, code: string) {
    const user = await this.userRepository.findOne(uid);
    this.submitionRepository.save({
      problemId: pid,
      code: code,
      state: submitState.AC,
      time: Math.random() * 100,
      date: new Date(),
      memory: Math.random() * 10000,
      user: user,
    });
    return 'This action adds a new submit';
  }

  async findAll() {
    return await this.submitionRepository.find();
  }

  async findOne(id: number) {
    const submition = await this.submitionRepository.findOne(id, {
      relations: ['user'],
    });

    submition.user.secret = '';
    return submition;
  }

  async findListByPage(whichPage: number, pageSize: number) {
    return {
      submitions: await this.submitionRepository
        .createQueryBuilder()
        .leftJoinAndSelect('Submition.user', 'user')
        .skip((whichPage - 1) * pageSize)
        .take(pageSize)
        .getMany(),
      maxPageCanGet: Math.ceil(
        (await this.submitionRepository.find()).length / pageSize,
      ),
    };
  }
}
