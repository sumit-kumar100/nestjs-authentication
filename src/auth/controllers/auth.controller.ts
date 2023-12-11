import { Request, Response } from "@nestjs/common";
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "../services/auth.service";
import { AuthDTO, AccessTokenDTO, RefreshTokenDTO } from "../dto/auth.dto";
import { SwaggerDocs } from "@/core/decorators/swagger.decorator";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @SwaggerDocs()
  @HttpCode(HttpStatus.OK)
  @Post("/access-token")
  public async getAccessToken(
    @Body() body: AccessTokenDTO,
    @Request() req: any,
    @Response() res: any,
  ): Promise<AuthDTO> {
    const response = await this.service.accessToken(body);
    res.cookie("accessToken", response.accessToken, {
      httpOnly: true,
      sameSite: "lax",
    });
    res.cookie("refreshToken", response.refreshToken, {
      httpOnly: true,
      sameSite: "lax",
    });
    return res.send(response);
  }

  @SwaggerDocs()
  @HttpCode(HttpStatus.OK)
  @Post("/refresh-token")
  public async getRefreshToken(
    @Body() body: RefreshTokenDTO,
    @Request() req: any,
    @Response() res: any,
  ): Promise<AuthDTO> {
    const response = await this.service.refreshToken(body);
    res.cookie("accessToken", response.accessToken, {
      httpOnly: true,
      sameSite: "lax",
    });
    res.cookie("refreshToken", response.refreshToken, {
      httpOnly: true,
      sameSite: "lax",
    });
    return res.send(response);
  }
}
