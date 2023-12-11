import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";

export async function initAppSwagger(app: INestApplication): Promise<void> {
  const options = new DocumentBuilder()
    .setTitle("Nest Auth")
    .setDescription(
      "NestJS Authentication and Authorization",
    )
    .setVersion("1.0")
    .addBearerAuth({
      description: `Please enter token in following format: Bearer <JWT>`,
      name: "Authorization",
      bearerFormat: "Bearer",
      scheme: "Bearer",
      type: "http",
      in: "Header",
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup("api-docs", app, document);
}
