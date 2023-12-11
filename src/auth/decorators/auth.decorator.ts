import { applyDecorators, UseGuards } from "@nestjs/common";
import { UserRoles } from "./role.decorator";
import { RoleAllowed } from "./role.decorator";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/role.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

export function Auth(roles: UserRoles[]) {
  return applyDecorators(
    ApiBearerAuth(),
    UseGuards(AuthGuard, RolesGuard),
    RoleAllowed(roles),
  );
}
