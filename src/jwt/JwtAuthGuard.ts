import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlackList } from './anth.blackList'

// see node_modules/@nestjs/passport/dist/auth.guard.js
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // 在这里添加自定义的认证逻辑
    const req = this.getRequest(context)
    const verifyName = `${req.method}${req.path}`
    return BlackList.includes(verifyName) ? true : super.canActivate(context);
  }

  handleRequest(err, user, info, context, status) {
    // 可以抛出一个基于info或者err参数的异常
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    // 可以通过user信息 做进一步的信息处理，比如获取人员其他信息
    // 将解析出来的信息(user)追加到 req.query 中
    this.getRequest(context).query.token = user
    return user;
  }
}
