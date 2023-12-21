import { Injectable, CanActivate, ExecutionContext, HttpException, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from './permission.decorator'
import { PermissionServices } from 'src/services/permission.services'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly permissionServices: PermissionServices,

  ) { }

  async canActivate(context: ExecutionContext) {
    let permission: {names: string[], key: '||' | '&&'} = {
      names: [],
      key: '||'
    }
    const requiredRoles = this.reflector.getAllAndOverride(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const { user } = context.switchToHttp().getRequest()

    if (typeof requiredRoles === 'string') {
      permission.names.push(requiredRoles)
    } else if(Array.isArray(requiredRoles)) {
      permission.names.push(...requiredRoles)
    } else {
      permission = requiredRoles
    }

    // 可以做用户权限认证
    if (!requiredRoles) return true
    const validate = await this.permissionServices.validatePermissions(user.user_id, permission.names, permission.key)
    if (validate) return true
    throw new HttpException('该用户无权限查看', 403)

  }


}