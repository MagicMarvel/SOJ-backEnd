import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Problem {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  input: string;
  @Column()
  output: string;
  @Column()
  sample_input: string;
  @Column()
  sample_output: string;
  @Column({ nullable: true })
  hint: string;
}
