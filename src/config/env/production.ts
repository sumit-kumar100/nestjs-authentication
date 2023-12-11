export const config = {
  db: {
    type: process.env.POSTGRES_DB_TYPE || "postgres",
    synchronize: false,
    autoLoadEntities: true,
    logging: false,
    replication: {
      master: {
        host: process.env.POSTGRES_DB_HOST || "master-db.example.com",
        port: process.env.POSTGRES_DB_PORT || 5432,
        username: process.env.POSTGRES_DB_USER || "username",
        password: process.env.POSTGRES_DB_PASSWORD || "password",
        database: process.env.POSTGRES_DB_NAME || "dbname",
      },
      slaves: [
        {
          host: "slave-db-1.example.com",
          port: 5432,
          username: "username",
          password: "password",
          database: "dbname",
        },
      ],
    },
    extra: {
      connectionLimit: 30,
    },
  },
};
