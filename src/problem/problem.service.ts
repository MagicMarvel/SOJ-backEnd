import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './entities/problem.entity';

@Injectable()
export class ProblemService {
  constructor(
    @InjectRepository(Problem) private problemRepository: Repository<Problem>,
  ) {}

  // 创建新的题目
  async create(createProblemDto: CreateProblemDto) {
    if (
      (await this.problemRepository.findOne({
        name: createProblemDto.name,
      })) === undefined
    ) {
      this.problemRepository.save(createProblemDto);
      return 'This action adds a new problem';
    } else throw new NotAcceptableException();
  }

  async findAll() {
    const problems = await this.problemRepository.find();
    if (problems.length === 0) throw new NotFoundException();
    else return problems;
  }

  async findOne(id: number) {
    const problem = await this.problemRepository.findOne(id);
    if (problem === undefined) throw new NotFoundException();
    else return problem;
  }

  async findSomeByPage(whichPage: number, pageSize: number) {
    const sum = (await this.problemRepository.findAndCount())[1];

    return {
      whichPage: whichPage,
      pageSize: pageSize,
      maxPageCanChoose: Math.ceil(sum / pageSize),
      problemSum: sum,
      problems: await this.problemRepository
        .createQueryBuilder()
        .skip((whichPage - 1) * pageSize)
        .take(pageSize)
        .getMany(),
    };
  }

  async update(id: number, updateProblemDto: UpdateProblemDto) {
    const problem = await this.problemRepository.findOneOrFail(id);
    this.problemRepository.save(Object.assign(problem, updateProblemDto));
    return 'update success!';
  }

  async remove(id: number) {
    const problem = await this.problemRepository.findOne(id);
    if (problem !== undefined) {
      this.problemRepository.remove(problem);
      return `remove success`;
    } else return 'the problem has already removed';
  }
}
