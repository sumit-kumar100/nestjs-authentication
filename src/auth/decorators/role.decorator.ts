import { SetMetadata } from "@nestjs/common";

export enum UserRoles {
  "admin" = "admin",
  "user" = "user",
}

export const RoleAllowed = (roles: UserRoles[]) => SetMetadata("roles", roles);
