import type { NestExpressApplication } from "@nestjs/platform-express";
import { NestFactory } from "@nestjs/core";
import { Logger, LoggerErrorInterceptor } from "nestjs-pino";
import { middleware } from "./app.middleware";
import { AppModule } from "./app.module";
import { initSwagger } from "./swagger";

async function initApp(): Promise<string> {
  const isProduction = process.env.NODE_ENV === "production";
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.enableShutdownHooks();
  app.setGlobalPrefix("api/v1");

  if (isProduction) {
    app.enable("trust proxy");
  }

  middleware(app);

  initSwagger(app);

  await app.listen(3007);

  return app.getUrl();
}

initApp();
