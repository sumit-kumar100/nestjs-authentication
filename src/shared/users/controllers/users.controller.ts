import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { AuthGuard } from "@/auth/guards/auth.guard";
import { RolesGuard } from "@/auth/guards/role.guard";
import { RoleAllowed, UserRoles } from "@/auth/decorators/role.decorator";
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
import {
  NO_ENTITY_FOUND,
  UNAUTHORIZED_REQUEST,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} from "@/core/constants";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly service: UserService) { }

  @ApiOperation({ description: "Register a new user" })
  @HttpCode(HttpStatus.CREATED)
  @Post("/register")
  public async Register(@Body() body: RegisterUserDTO): Promise<User> {
    return this.service.create(body);
  }

  @ApiBearerAuth()
  @ApiConsumes("application/json")
  @ApiOperation({ description: "get current session User" })
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOkResponse({ description: "user returned successfully" })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get("/profile")
  public async getUser(@RequestUser() user: User) {
    return user;
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: "get all Users",
  })
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOkResponse({ description: "users returned successfully" })
  @PaginatedSwaggerDocs(User, UserConfig)
  @UseGuards(AuthGuard, RolesGuard)
  @RoleAllowed([UserRoles.admin])
  @Get("/")
  public async allUsers(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<User>> {
    return this.service.findAll(query);
  }

  @ApiBearerAuth()
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOkResponse({ description: "assign permissions" })
  @ApiOperation({
    description: "reset password user",
  })
  @ApiOkResponse({
    description: "password reset successfully",
  })
  @UseGuards(AuthGuard, RolesGuard)
  @RoleAllowed([UserRoles.admin])
  @Patch("/:id/reset-password")
  public async updateUserPassword(
    @Param("id", UuidValidationPipe) id: string,
    @Body() data: UpdateUserPasswordDTO,
  ) {
    return this.service.updateUserPassword(id, data);
  }

  @ApiBearerAuth()
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOkResponse({ description: "assign permissions" })
  @ApiOperation({
    description: "assign permission to user",
  })
  @ApiOkResponse({
    description: "assign permissions to the user",
  })
  @UseGuards(AuthGuard, RolesGuard)
  @RoleAllowed([UserRoles.admin])
  @Patch("/:id/grant-permissions")
  public async assignUserPermissions(
    @Param("id", UuidValidationPipe) id: string,
    @Body() data: UpdateUserPermissionDTO,
  ) {
    return this.service.updateUserPermissions(id, data);
  }

  @ApiBearerAuth()
  @ApiOperation({ description: "user update api " })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Put("/:id")
  public async UpdateUser(
    @Param("id", UuidValidationPipe) id: string,
    @Body() body: UpdateUserDTO,
  ): Promise<User> {
    return this.service.update(id, body);
  }

  @ApiBearerAuth()
  @ApiOperation({ description: "user delete api " })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Delete("/:id")
  public async DeleteUser(
    @Param("id", UuidValidationPipe) id: string,
  ): Promise<null> {
    this.service.delete(id);
    return null;
  }
}
