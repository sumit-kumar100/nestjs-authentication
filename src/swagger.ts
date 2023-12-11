import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";

export async function initSwagger(app: INestApplication): Promise<void> {
  const options = new DocumentBuilder()
    .setTitle("NestJS-NextJS User-CRUD")
    .setDescription(
      "Create, Read, Update, and Delete Users in a NestJS Application.",
    )
    .setVersion("1.0")
    .addBearerAuth({
      description: `Please enter token in following format: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header'
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api-docs", app, document);
}
