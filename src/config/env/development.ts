export const config = {
  db: {
    type: process.env.POSTGRES_DB_TYPE || "postgres",
    synchronize: false,
    autoLoadEntities: true,
    logging: true,
    host: process.env.POSTGRES_DB_HOST || "127.0.0.1",
    port: process.env.POSTGRES_DB_PORT || 5432,
    username: process.env.POSTGRES_DB_USER || "postgres",
    password: process.env.POSTGRES_DB_PASSWORD || "password",
    database: process.env.POSTGRES_DB_NAME || "dbname",
    extra: {
      connectionLimit: 10,
    },
  },
};
