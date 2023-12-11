import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const RequestUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    if (req.user) {
      return req.user;
    }
    return null;
  },
);
