import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProblemService } from './problem.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@Controller('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  create(@Body() createProblemDto: CreateProblemDto) {
    return this.problemService.create(createProblemDto);
  }

  // 这个一定要写在`:id`前面
  @Get('list')
  async findSomeByPage(
    @Query('whichPage') whichPage: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.problemService.findSomeByPage(whichPage, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.problemService.findOne(+id);
  }

  @Get()
  findAll() {
    return this.problemService.findAll();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateProblemDto: UpdateProblemDto) {
    return this.problemService.update(+id, updateProblemDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.problemService.remove(+id);
  }
}
