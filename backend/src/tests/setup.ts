import { loadEnv } from "../configs/load-env.configs";
loadEnv(".env.test");
import connection from "../shared/connection.shared";

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.clear();
});
