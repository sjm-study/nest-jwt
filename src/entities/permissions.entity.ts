import { Entity, PrimaryKey, Property, OneToMany, ManyToMany, Collection, Cascade } from '@mikro-orm/core'
import { RoleHasPermission } from './role_has_permission.entity'
import * as dayjs from 'dayjs'

@Entity({
  tableName: 'permissions'
})
export class Permission {

  @PrimaryKey({
    autoincrement: true
  })
  id: number

  @Property()
  name: string

  @Property()
  categories: string

  @Property()
  description: string

  @Property({
    default: dayjs().format()
  })
  created_at: Date

  @Property({
    onUpdate: () => new Date()
  })
  updated_at: Date

  // @OneToMany(() => RoleHasPermission, ro=> ro['permissions'],{
  //   mappedBy: 'role_id',
  //   joinColumn:'permission'
  // })
  @OneToMany({
    entity: 'RoleHasPermission',
    mappedBy: 'permission',
    fieldName: 'role'
  })
  role_detail = new Collection<RoleHasPermission>(this)

}