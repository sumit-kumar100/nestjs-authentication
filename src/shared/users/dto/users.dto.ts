import { FilterOperator, FilterSuffix, PaginateConfig } from "nestjs-paginate";
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Exclude, Type as validateType } from "class-transformer";
import { User } from "../entities/user.entity";
import { UserRoles } from "@/auth/decorators/role.decorator";

export const UserConfig: PaginateConfig<User> = {
  loadEagerRelations: true,
  sortableColumns: ["id", "firstName"],
  nullSort: "last",
  defaultSortBy: [["id", "DESC"]],
  searchableColumns: ["firstName"],
  filterableColumns: {
    name: [FilterOperator.EQ, FilterSuffix.NOT],
  },
};

export class RegisterUserDTO {
  @ApiProperty({
    description: "firstName",
    example: "Alex",
    required: false,
  })
  @IsOptional()
  @IsString()
  public firstName!: string;

  @ApiProperty({
    description: "lastName",
    example: "Smith",
    required: false,
  })
  @IsOptional()
  @IsString()
  public lastName!: string;

  @ApiProperty({
    description: "email",
    example: "alex@gmail.com",
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsEmail()
  public email!: string;

  @ApiProperty({
    description: "password",
    example: "alex@123",
    required: true,
  })
  @IsDefined()
  @IsString()
  @MinLength(8)
  public password!: string;
}

export class UpdateUserDTO extends OmitType(RegisterUserDTO, [
  "password",
] as const) {}

export class UpdateUserPasswordDTO {
  @IsDefined()
  @IsString()
  oldPassword: string;

  @IsDefined()
  @IsString()
  newPassword: string;
}

export class UpdateUserPermissionDTO {
  @IsEnum(UserRoles)
  public permissions!: UserRoles;
}
