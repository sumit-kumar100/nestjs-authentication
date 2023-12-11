import * as bcrypt from "bcrypt";
import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UserService } from "@/shared/users/services/users.service";
import { AccessTokenDTO, RefreshTokenDTO } from "../dto/auth.dto";
import { JwtPayload } from "jsonwebtoken";
import { JwtService } from "@nestjs/jwt";
import { User } from "@/shared/users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateJwtPayload(payload: JwtPayload) {
    const data = await this.usersService.findOneById(payload.userId);
    delete data.password;
    return data;
  }

  public async comparePassword(enteredPassword: string, dbPassword: string) {
    return await bcrypt.compare(enteredPassword, dbPassword);
  }

  public async createToken(user: User, expiresIn: string) {
    const data: JwtPayload = {
      userId: user.id,
      email: user.email,
      permissions: user.permissions,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(data, {
        secret: "SuperSecretJWTKey",
        expiresIn: expiresIn,
      }),
      this.jwtService.signAsync(data, {
        secret: "SuperSecretJWTKey",
        expiresIn: "1d",
      }),
    ]);

    return { ...data, accessToken, refreshToken };
  }

  public async accessToken(payload: AccessTokenDTO) {
    const { email, password } = payload;

    const user = await this.usersService.findOneByEmail(email);

    const isMatch = await this.comparePassword(password, user.password);

    if (!isMatch) {
      throw new NotFoundException(`user with email password not found`);
    }

    return await this.createToken(user, "2h");
  }

  public async refreshToken(payload: RefreshTokenDTO) {
    const { refreshToken } = payload;

    const decodedToken = this.jwtService.verify(refreshToken, {
      secret: "SuperSecretJWTKey",
    });

    const user = await this.usersService.findOneByEmail(decodedToken.email);

    if (!user) {
      throw new ForbiddenException();
    }

    return await this.createToken(user, "1d");
  }
}
