import { Request, Response } from "@nestjs/common";
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AuthService } from "../services/auth.service";
import { AuthDTO, AccessTokenDTO, RefreshTokenDTO } from "../dto/auth.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiOperation({ description: "Get access token" })
  @ApiBadRequestResponse({ description: "bad request" })
  @ApiInternalServerErrorResponse({
    description: "internal server error occurred",
  })
  @ApiOkResponse({ description: "access-token response", type: AuthDTO })
  @HttpCode(HttpStatus.OK)
  @Post("/access-token")
  public async getAccessToken(
    @Body() body: AccessTokenDTO,
    @Request() req: any,
    @Response() res: any,
  ) {
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

  @ApiConsumes("application/json")
  @ApiOperation({ description: "refresh-token" })
  @ApiBadRequestResponse({ description: "bad request" })
  @ApiInternalServerErrorResponse({
    description: "internal server error occurred",
  })
  @ApiOkResponse({
    description: "refresh-token response",
    type: AuthDTO,
  })
  @HttpCode(HttpStatus.OK)
  @Post("/refresh-token")
  public async getRefreshToken(
    @Body() body: RefreshTokenDTO,
    @Request() req: any,
    @Response() res: any,
  ) {
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
