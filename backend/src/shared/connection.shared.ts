import { getConnectionOptions, createConnection } from "typeorm";

export default async () => {
  const options = await getConnectionOptions();
  const conn = await createConnection({
    ...options,
    synchronize: true,
  });

  return conn;
};
