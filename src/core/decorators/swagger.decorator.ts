import { applyDecorators } from "@nestjs/common";
import {
  ApiConsumes,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";

export function SwaggerDocs() {
  return applyDecorators(
    ApiConsumes("application/json"),
    ApiUnauthorizedResponse({ description: "Unauthorized" }),
    ApiNotFoundResponse({ description: "Not Found" }),
    ApiForbiddenResponse({ description: "Forbidden" }),
    ApiUnprocessableEntityResponse({ description: "Bad Request" }),
    ApiInternalServerErrorResponse({ description: "Internal Server Error" }),
  );
}
