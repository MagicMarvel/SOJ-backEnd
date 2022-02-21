import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { submitState } from '../submitState.enum';
import { User } from '../../users/entities/users.entity';

@Entity()
export class Submition {
  @PrimaryGeneratedColumn()
  submitId: number;
  @Column()
  problemId: number;
  @Column('varchar')
  state: submitState;
  @Column()
  time: number;
  @Column()
  memory: number;
  @Column('datetime')
  date: Date;
  @Column('text')
  code: string;
  @ManyToOne(() => User, (user) => user.submitions)
  user: User;
}
