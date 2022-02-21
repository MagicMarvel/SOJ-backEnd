import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { SubmitService } from './submit.service';
import { CreateSubmitDto } from './dto/create-submit.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@Controller('submit')
export class SubmitController {
  constructor(private readonly submitService: SubmitService) {}

  @Post()
  @UseGuards(JwtAuthGuard, UseGuards)
  @Roles(Role.Admin, Role.User)
  async sumbitCode(@Body() createSubmitDto: CreateSubmitDto, @Req() req: any) {
    return await this.submitService.create(
      req.user.user_id,
      createSubmitDto.problemId,
      createSubmitDto.code,
    );
  }

  @Get()
  findAll() {
    return this.submitService.findAll();
  }

  @Get('list')
  findListByPage(
    @Query('whichPage') whichPage: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.submitService.findListByPage(whichPage, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submitService.findOne(+id);
  }
}
