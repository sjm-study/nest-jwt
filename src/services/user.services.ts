import { InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/sqlite';
import { Injectable, UseGuards, HttpException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Permission } from 'src/entities/permissions.entity'
import { RoleHasPermission } from 'src/entities/role_has_permission.entity'
import { User } from 'src/entities/users.entity'

@Injectable()
export class UserServices {
  constructor(
    private readonly jwtService: JwtService,
    @InjectEntityManager('database') private readonly em: EntityManager,

  ) { }

  async login(data) {
    console.log('data', data)
    const user = await this.em.findOne(User, {
      account: data.account,
      password: data.password
    })
    if (user?.id) {
      return {
        access_token: this.jwtService.sign({
          user_id: user.id,
          role: user.role,
          name: user.name,
          account: user.account
        }),
      }
    } else {
      throw new HttpException('登录失败', 401)
    }

  }

  async getUser(auth) {
    const d = await this.em.findOne(RoleHasPermission, {
      role_id: auth.user_id
    }, {
      populate: ['permission'],
      refresh: true,
      // disableIdentityMap: true // 使得this.em.flush()无效果，即修改内容不能映射到源表
    })
    return [d]
  }

  async getItems() {
    return [12]
   }

  async validateUserPermission(query, callback?) {
    const d = await this.em.find(RoleHasPermission, {
      role_id: query.user_id
    }, {
      populate: ['permission'],
      refresh: true,
      // disableIdentityMap: true // 使得this.em.flush()无效果，即修改内容不能映射到源表
    })
    const permissionList = d.map(i => i.permission.name)
    if (callback) {
      return callback(permissionList)
    } else return permissionList.includes(query.permission)
  }

}