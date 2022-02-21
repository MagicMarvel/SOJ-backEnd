import { IsNumber, IsString } from 'class-validator';

export class CreateSubmitDto {
  @IsNumber()
  problemId: number;

  @IsString()
  code: string;
}
