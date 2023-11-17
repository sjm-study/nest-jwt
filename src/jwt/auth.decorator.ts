import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 用于获取jwt解析的信息的装饰器
export const Auth = createParamDecorator((data:unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request?.user
});