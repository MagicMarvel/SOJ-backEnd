import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';

export const ROLES_KEY = 'roles';
// 这个是用来设置权限元数据的装饰器
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
