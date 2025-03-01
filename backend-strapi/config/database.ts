import path from "path";

type DbClient = "mysql" | "postgres" | "sqlite";

interface MysqlConnectionConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl?: any; // Mejorar
  pool?: { min: number; max: number }; // Define pool aquí si es específico de MySQL
}

interface PostgresConnectionConfig {
  connectionString?: string;
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl?: any; // Mejorar
  schema: string;
  pool?: { min: number; max: number }; // Define pool aquí si es específico de Postgres
}

interface SqliteConnectionConfig {
  filename: string;
  useNullAsDefault: boolean;
}

// Un tipo de unión discriminada
type DatabaseConnectionConfig =
  | ({ client: "mysql" } & MysqlConnectionConfig)
  | ({ client: "postgres" } & PostgresConnectionConfig)
  | ({ client: "sqlite" } & SqliteConnectionConfig);

interface DatabaseConfig {
  connection: DatabaseConnectionConfig & {
    acquireConnectionTimeout: number;
  };
}
// ... (resto del código similar a antes, pero usando los tipos definidos aquí) ...

export default ({ env }: { env: any }): DatabaseConfig => {
    const client: DbClient = env("DATABASE_CLIENT", "sqlite") as DbClient;
  
    const connections = {
      mysql: {
        connection: {
          host: env("DATABASE_HOST", "localhost"),
          port: env.int("DATABASE_PORT", 3306),
          database: env("DATABASE_NAME", "strapi"),
          user: env("DATABASE_USERNAME", "strapi"),
          password: env("DATABASE_PASSWORD", "strapi"),
          ssl: env.bool("DATABASE_SSL", false) && { /* ... */ },
        },
        pool: {
          min: env.int("DATABASE_POOL_MIN", 2),
          max: env.int("DATABASE_POOL_MAX", 10),
        },
      },
      postgres: {
        connection: {
          connectionString: env("DATABASE_URL"),
          host: env("DATABASE_HOST", "localhost"),
          port: env.int("DATABASE_PORT", 5432),
          database: env("DATABASE_NAME", "strapi"),
          user: env("DATABASE_USERNAME", "strapi"),
          password: env("DATABASE_PASSWORD", "strapi"),
          ssl: env.bool("DATABASE_SSL", false) && { /* ... */ },
          schema: env("DATABASE_SCHEMA", "public"),
        },
         pool: {
          min: env.int("DATABASE_POOL_MIN", 2),
          max: env.int("DATABASE_POOL_MAX", 10),
        },
      },
      sqlite: {
        connection: {
          filename: path.join(__dirname, "..", "..", env("DATABASE_FILENAME", ".tmp/data.db")),
        },
        useNullAsDefault: true,
      },
    };
  
    let connectionConfig: DatabaseConnectionConfig;

    switch (client) {
        case "mysql":
            connectionConfig = { client, ...connections.mysql.connection, pool: connections.mysql.pool };
            break;
        case "postgres":
            connectionConfig = { client, ...connections.postgres.connection, pool: connections.postgres.pool  };
            break;
        case "sqlite":
            connectionConfig = { client, ...connections.sqlite.connection, useNullAsDefault: connections.sqlite.useNullAsDefault };
            break;
    }
  
    return {
      connection: {
        ...connectionConfig,
        acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
      },
    };
  };