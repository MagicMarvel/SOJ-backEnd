import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './users_roles.entity';
import { Submition } from '../../submit/entities/submit.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 20 })
  name: string;

  @Column()
  email: string;

  @Column()
  secret: string;

  @Column({ default: 0 })
  ac: number;

  @Column({ default: 0 })
  submit: number;

  @OneToMany(() => Role, (role) => role.user)
  roles: Role[];

  @OneToMany(() => Submition, (submit) => submit.user)
  submitions: Submition[];
}
