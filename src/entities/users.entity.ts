import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core'
import * as dayjs from 'dayjs'

@Entity({
  tableName: 'users'
})
export class User {

  @PrimaryKey()
  id: number

  @Property()
  name: string

  @Property()
  account: string

  @Property()
  password: string

  @Property()
  role: string

  @Property({
    default: dayjs().format()
  })
  created_at: Date

  @Property({
    onUpdate: () => new Date()
  })
  updated_at: Date


}