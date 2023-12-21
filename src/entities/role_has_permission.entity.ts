import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core'
import { Permission } from './permissions.entity'
import * as dayjs from 'dayjs'

@Entity({
  tableName: 'role_has_permissions'
})
export class RoleHasPermission {

  @PrimaryKey()
  permission_id: number

  @PrimaryKey()
  role_id: number

  @Property({
    default: dayjs().format()
  })
  created_at: Date

  @Property({
    onUpdate: () => new Date()
  })
  updated_at: Date

  @ManyToOne(() => Permission, {
    // joinColumn:'permission_id'
  })
  permission: Permission;

}