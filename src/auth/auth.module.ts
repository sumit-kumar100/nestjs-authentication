import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { AccessTokenJwtStrategy } from "./strategies/access-token.strategy";
import { RefreshTokenJwtStrategy } from "./strategies/refresh-token.strategy";
import { UserModule } from "@/shared/users/users.module";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [forwardRef(() => UserModule), PassportModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenJwtStrategy, RefreshTokenJwtStrategy],
  exports: [AuthService, AccessTokenJwtStrategy, RefreshTokenJwtStrategy],
})
export class AuthModule {}
