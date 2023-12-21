import { InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/sqlite';
import { Injectable, UseGuards, HttpException } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Permission } from 'src/entities/permissions.entity'
import { RoleHasPermission } from 'src/entities/role_has_permission.entity'
import { User } from 'src/entities/users.entity'
import { Request } from 'express';
import { Auth } from 'src/jwt/auth.decorator'

@Injectable()
export class PermissionServices {
  constructor(
    private readonly jwtService: JwtService,
    @InjectEntityManager('database') private readonly em: EntityManager,

  ) { }

  async getPermissionsByUser(user_id: number) {
    const data = await this.em.find(RoleHasPermission, {
      role_id: user_id
    }, {
      populate: ['permission'],
      refresh: true,
    })
    return data.map(i => i.permission)
  }

  async validatePermission(user_id: number, permission: string) {
    const userPermissions = (await this.getPermissionsByUser(user_id)).map(i => i.name)
    return userPermissions.includes(permission)
  }

  async validatePermissions(user_id: number, permissions: string[], key: '||' | '&&') {
    const userPermissions = (await this.getPermissionsByUser(user_id)).map(i => i.name)
    if (key === '||') return permissions.some(i => userPermissions.includes(i))
    if (key === '&&') return permissions.every(i => userPermissions.includes(i))
    return false
  }

}