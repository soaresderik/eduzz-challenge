import { loadEnv } from "./configs/load-env.configs";
loadEnv();
import connection from "./shared/connection.shared";

import Queue from "./queues";

(async () => {
  try {
    await connection.create();

    Queue.add("call-api", {});

    Queue.process();
  } catch (err) {
    console.log({ err });
  }
})();
