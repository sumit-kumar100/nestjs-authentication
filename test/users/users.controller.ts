import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { UserService } from "./users.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { User } from "../models/user.model";
import { model } from "./user.dto";
import { v4 as uuidv4 } from "uuid";

@Controller("users")
@ApiTags("users")
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  @ApiOperation({ summary: "Get all users" })
  async findAll(): Promise<User[]> {
    return await this.usersService.findall();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get one user by ID" })
  async findById(@Param("id") id: string): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new Error("User not found");
    } else {
      return user;
    }
  }

  @Post()
  @ApiOperation({ summary: "Create a new user" })
  async create(@Body() user: model): Promise<User> {
    const newUser = Object.assign({}, user, {
      id: uuidv4(),
    });
    return await this.usersService.create(newUser);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update an existing user by ID" })
  async update(@Param("id") id: string, @Body() user: model): Promise<User> {
    const updatedUser = Object.assign({}, user, { id: id });
    return this.usersService.update(id, updatedUser);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a user by ID" })
  async delete(@Param("id") id: string): Promise<void> {
    //handle the error if user not found
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return this.usersService.delete(id);
  }
}
