import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import { useExpressServer } from "routing-controllers";
import express from "express";
import * as dotenv from "dotenv";
import ErrorHandler from "./middlewares/error-handler.middleware";

dotenv.config();

(async () => {
  try {
    const PORT = 3333;
    const app = express();

    const options = await getConnectionOptions();
    const conn = await createConnection({
      ...options,
      synchronize: true,
    });

    app.use(express.json());

    useExpressServer(app, {
      controllers: [__dirname + "/modules/**/*.controller.ts"],
      middlewares: [ErrorHandler],
      defaultErrorHandler: false,
    });

    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  } catch (err) {
    console.log({ err });
  }
})();
