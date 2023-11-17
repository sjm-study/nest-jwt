import {Injectable} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserServices {
  constructor(private readonly jwtService: JwtService){}
 
  login(data) {
    return {
      access_token: this.jwtService.sign({
        username: '123',
        id: 222
      }),
    }
  }
}