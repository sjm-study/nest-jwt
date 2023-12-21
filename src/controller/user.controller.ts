import { Controller, Post, Body, UseGuards,Get, Query, Request  } from '@nestjs/common'
import { UserServices } from 'src/services/user.services'
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/jwt/JwtAuthGuard'
import { Auth } from 'src/jwt/auth.decorator'
import { RolesGuard } from 'src/permissionGuard/permission.guard'
import { Roles } from 'src/permissionGuard/permission.decorator'
import { PermissionServices } from 'src/services/permission.services'

@Controller()
export class UserController {
  constructor(
    private readonly userServices: UserServices,
    private readonly permissionServices: PermissionServices
    
    ) { }
 
  @Post('/api/login')
  login(@Body() data) {
    return this.userServices.login(data)
  }

  @Roles('ceshila')
  @Get('/api/user')
  getUser(@Auth() auth) {
    // console.log('query',auth)
    return this.userServices.getUser(auth)
  }

  @Roles('read_items')
  @Get('/api/item')
  getItems(@Auth() auth) {
    // console.log('query',auth)
    return this.userServices.getItems()
  }

}


