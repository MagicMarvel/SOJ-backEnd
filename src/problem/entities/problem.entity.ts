import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Problem {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column('text')
  description: string;
  @Column('text')
  input: string;
  @Column('text')
  output: string;
  @Column('text')
  sample_input: string;
  @Column('text')
  sample_output: string;
  @Column('text', { nullable: true })
  hint: string;
}
