const { SnakeNamingStrategy } = require("typeorm-naming-strategies");
const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

module.exports = {
  type: "postgres",
  host: DB_HOST,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASS,
  port: DB_PORT,
  logging: false,
  cli: {
    migrationsDir: "src/migrations",
  },
  entities: ["src/modules/**/*.entity.{js,ts}"],
  migrations: ["src/migrations/*.{js,ts}"],
  namingStrategy: new SnakeNamingStrategy(),
};
