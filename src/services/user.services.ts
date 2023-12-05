import { Injectable, UseGuards } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'


@Injectable()
export class UserServices {
  constructor(private readonly jwtService: JwtService) { }

  login(data) {
    return {
      access_token: this.jwtService.sign({
        username: 'aw',
        id: 1,
        role: 'admain'
      }),
    }
  }

  getUser() {
    return [1]
  }
}