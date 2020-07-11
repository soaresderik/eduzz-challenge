import { createConnection, getConnectionOptions, getConnection } from "typeorm";
const connection = {
  async create() {
    const options = await getConnectionOptions();
    const conn = await createConnection({
      ...options,
      synchronize: true,
    });

    return conn;
  },
  async close(): Promise<void> {
    await getConnection().close();
  },

  async clear(): Promise<void> {
    const conn = getConnection();
    const entities = conn.entityMetadatas;

    await Promise.all(
      entities.map(async (entity) => {
        const repository = conn.getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName}`);
      })
    );
  },
};

export default connection;
