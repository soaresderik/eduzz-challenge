import * as dotenv from "dotenv";
dotenv.config();
import connection from "./shared/connection.shared";

import Queue from "./queues";

(async () => {
  try {
    await connection();

    Queue.add("call-api", {});

    Queue.process();
  } catch (err) {
    console.log({ err });
  }
})();
