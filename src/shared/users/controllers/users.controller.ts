import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Auth } from "@/auth/decorators/auth.decorator";
import { UserRoles } from "@/auth/decorators/role.decorator";
import { RequestUser } from "@/auth/decorators/user.decorator";
import { UuidValidationPipe } from "@/core/pipes/validators.pipe";
import {
  RegisterUserDTO,
  UpdateUserPermissionDTO,
  UpdateUserDTO,
  UserConfig,
  UpdateUserPasswordDTO,
} from "../dto/users.dto";
import { UserService } from "../services/users.service";
import { User } from "../entities/user.entity";
import {
  Paginate,
  PaginateQuery,
  Paginated,
  PaginatedSwaggerDocs,
} from "nestjs-paginate";
import { SwaggerDocs } from "@/core/decorators/swagger.decorator";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly service: UserService) {}

  @SwaggerDocs()
  @Post("/register")
  public async Register(@Body() body: RegisterUserDTO): Promise<User> {
    return this.service.create(body);
  }

  @SwaggerDocs()
  @Auth([UserRoles.admin, UserRoles.user])
  @Get("/profile")
  public async getUser(@RequestUser() user: User) {
    return user;
  }

  @SwaggerDocs()
  @PaginatedSwaggerDocs(User, UserConfig)
  @Auth([UserRoles.admin])
  @Get("/")
  public async allUsers(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<User>> {
    return this.service.findAll(query);
  }

  @SwaggerDocs()
  @Auth([UserRoles.admin])
  @Patch("/:id/reset-password")
  public async updateUserPassword(
    @Param("id", UuidValidationPipe) id: string,
    @Body() data: UpdateUserPasswordDTO,
  ) {
    return this.service.updateUserPassword(id, data);
  }

  @SwaggerDocs()
  @Auth([UserRoles.admin])
  @Patch("/:id/grant-permissions")
  public async assignUserPermissions(
    @Param("id", UuidValidationPipe) id: string,
    @Body() data: UpdateUserPermissionDTO,
  ) {
    return this.service.updateUserPermissions(id, data);
  }

  @SwaggerDocs()
  @Auth([UserRoles.admin, UserRoles.user])
  @Put("/:id")
  public async UpdateUser(
    @Param("id", UuidValidationPipe) id: string,
    @Body() body: UpdateUserDTO,
  ): Promise<User> {
    return this.service.update(id, body);
  }

  @SwaggerDocs()
  @Auth([UserRoles.admin, UserRoles.user])
  @Delete("/:id")
  public async DeleteUser(
    @Param("id", UuidValidationPipe) id: string,
  ): Promise<null> {
    this.service.delete(id);
    return null;
  }
}
