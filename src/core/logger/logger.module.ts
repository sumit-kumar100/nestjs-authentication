import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { LoggerService } from "./services/logger.service";
import { LoggerMiddleware } from "./middlewares/logger.middleware";

@Module({
  imports: [],
  controllers: [],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
