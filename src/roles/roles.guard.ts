import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

// 自定义的守卫，检测元数据中的要求的角色权限，并与request中的user.roles数组对照，user形如下
/**
 *   class User {
 *   // ...other properties
 *   roles: Role[];
 *   }
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  // 守卫输入一个上下文，这个上下文可以用来获取当前守卫着的控制器是什么，用户发过来的参数是什么
  canActivate(context: ExecutionContext): boolean {
    // 获取元数据，提取这个控制器要求什么权限，返回一个权限数组
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 没有要求权限则返回true
    if (!requiredRoles) {
      return true;
    }

    // 获取到请求中的request里面的user
    // 要确保该方法工作，request里面需要有一个user对象，里面需要有一个名为roles的数组，数组每一项都需要是Role(string)
    const { user } = context.switchToHttp().getRequest();
    // console.log(context.switchToHttp().getRequest());

    // 遍历所有权限，看看user里面是否具有要求的全部权限
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
