import { Controller, Post, Body, UseGuards,Get, Query, Request  } from '@nestjs/common'
import { UserServices } from 'src/services/user.services'
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/jwt/JwtAuthGuard'
import { Auth } from 'src/jwt/auth.decorator'

@Controller()
export class UserController {
  constructor(private readonly userServices: UserServices) { }
 
  @Post('/api/login')
  login(@Body() data) {
    return this.userServices.login(data)
  }

  @Get('/api/login')
  getUser(@Auth() auth) {
    console.log('query',auth)
    return {
      success: true 
    }
  }
}


