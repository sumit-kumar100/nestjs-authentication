import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult, DeleteResult, Not } from "typeorm";
import { AuthService } from "@/auth/services/auth.service";
import {
  UserConfig,
  RegisterUserDTO,
  UpdateUserDTO,
  UpdateUserPasswordDTO,
  UpdateUserPermissionDTO,
} from "../dto/users.dto";
import { User } from "../entities/user.entity";
import { PaginateQuery, paginate, Paginated } from "nestjs-paginate";
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async findOneById(id: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: {
        email,
      },
    });
  }

  async updateOneById(id: string, data: UpdateUserDTO): Promise<UpdateResult> {
    return await this.userRepo.update(id, data);
  }

  async deleteOneById(id: string): Promise<DeleteResult> {
    return this.userRepo.delete(id);
  }

  async create(data: RegisterUserDTO): Promise<User> {
    const existingUser = await this.findOneByEmail(data.email);

    if (existingUser) {
      throw new ConflictException("user with email already exists");
    }

    const user = this.userRepo.create({
      ...data,
      encPassword: data.password,
    });

    return await this.userRepo.save(user);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.userRepo, UserConfig);
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    const user = await this.findOneById(id);

    if (!user) {
      throw new NotFoundException("user doesn't exits");
    }

    const userConflict = await this.userRepo.findOne({
      where: {
        id: Not(id),
        email: data.email,
      },
    });

    if (userConflict) {
      throw new ConflictException(`user already exist with same email`);
    }

    await this.updateOneById(id, data);

    return user;
  }

  async updateUserPassword(id: string, data: UpdateUserPasswordDTO) {
    const user = await this.findOneById(id);

    if (!user) {
      throw new NotFoundException("user doesn't exits");
    }

    const isMatch = await this.authService.comparePassword(
      data.oldPassword,
      user.password,
    );

    if (!isMatch) {
      throw new HttpException("password didn't match", HttpStatus.BAD_REQUEST);
    }

    user.password = data.newPassword;
    user.encPassword = data.newPassword;

    return await user.save();
  }

  async updateUserPermissions(id: string, payload: UpdateUserPermissionDTO) {
    const user = await this.findOneById(id);

    if (!user) {
      throw new NotFoundException("user doesn't exits");
    }

    user.permissions = payload.permissions;

    return await user.save();
  }

  async delete(id: string): Promise<void> {
    await this.deleteOneById(id);
  }
}
