import { SetMetadata } from "@nestjs/common";

export enum UserRoles {
  "admin" = "admin",
  "user" = "user",
}

export const RoleAllowed = (role: UserRoles[]) => SetMetadata("roles", role);
