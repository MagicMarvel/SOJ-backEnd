import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Role as RoleEmun } from '../roles/role.enum';
import { Role } from './entities/users_roles.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  // 返回某用户的所有信息、包括密码散列值
  async findOne(username: string) {
    return await this.usersRepository.findOne(
      { name: username },
      { relations: ['roles'] },
    );
  }

  async create(createUserDto: CreateUserDto) {
    const oldUser = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.name= :name', { name: createUserDto.name })
      .orWhere('user.email = :email', { email: createUserDto.email })
      .getRawOne();

    if (JSON.stringify(oldUser) !== undefined) {
      throw new HttpException('email or name unavailble!', 404);
    }

    const newUser = new User();
    newUser.email = createUserDto.email;
    newUser.name = createUserDto.name;
    newUser.secret = await bcrypt.hash(createUserDto.secret, 12);
    const newRole = new Role();
    newRole.role = RoleEmun.User;
    newRole.user = newUser;
    this.rolesRepository.save(newRole);
    return 'add user success';
  }
}
