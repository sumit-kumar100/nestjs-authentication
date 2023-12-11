import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";
import { IsDefined, IsString, IsEmail } from "class-validator";

export class AccessTokenDTO {
  @ApiProperty({
    description: "email",
    example: "hello@gmail.com",
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsEmail()
  public email!: string;

  @ApiProperty({
    description: "password",
    example: "hello@123",
    required: true,
  })
  @IsDefined()
  @IsString()
  public password!: string;
}

export class RefreshTokenDTO {
  @ApiProperty({
    description: "refresh token",
    example: "euuuuuuuwscdswcscfdes.fwdesfwdwfcews.qwdewefdwefw",
    required: true,
  })
  @IsDefined()
  @IsString()
  public refreshToken!: string;
}

export class AuthDTO {
  @ApiResponseProperty({
    example: "da9b9f51-23b8-4642-97f7-52537b3cf53b",
    format: "v4",
  })
  public userId: string;

  @ApiResponseProperty({
    example: "user@gmail.com",
  })
  public email: string;

  @ApiResponseProperty({
    example: new Date().toDateString(),
  })
  public expiration: string;

  @ApiResponseProperty({
    example: "admin",
  })
  public permission: string[];

  @ApiResponseProperty({
    example: "euuuuuuuwscdswcscfdes.fwdesfwdwfcews.qwdewefdwefw",
  })
  public accesns_token: string;
}
