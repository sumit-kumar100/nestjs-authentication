import type { INestApplication } from "@nestjs/common";
import * as compression from "compression";
import * as session from "express-session";
import * as passport from "passport";
import helmet from "helmet";

export function middleware(app: INestApplication): INestApplication {
  const isProduction = process.env.NODE_ENV === "production";

  app.use(compression());
  app.use(
    session({
      // Requires 'store' setup for production
      secret: "tEsTeD",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: isProduction },
    }),
  );
  app.use(passport.initialize());
  // https://github.com/graphql/graphql-playground/issues/1283#issuecomment-703631091
  // https://github.com/graphql/graphql-playground/issues/1283#issuecomment-1012913186
  app.use(
    helmet({
      contentSecurityPolicy: isProduction ? undefined : false,
      crossOriginEmbedderPolicy: isProduction ? undefined : false,
    }),
  );
  app.enableCors();
  return app;
}
