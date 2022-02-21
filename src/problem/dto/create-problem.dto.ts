import { IsString } from 'class-validator';

export class CreateProblemDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  input: string;
  @IsString()
  output: string;
  @IsString()
  sample_input: string;
  @IsString()
  sample_output: string;
  @IsString()
  hint: string;
}
