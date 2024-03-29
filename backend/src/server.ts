import "reflect-metadata";
import { loadEnv } from "./configs/load-env.configs";
loadEnv();
import { useExpressServer, Action } from "routing-controllers";
import express from "express";
import ErrorHandler from "./middlewares/error-handler.middleware";
import connection from "./shared/connection.shared";
import { UserEntity } from "./modules/users";
import authConfigs from "./configs/auth.configs";
import * as jwt from "jsonwebtoken";
import cors from "cors";

(async () => {
  try {
    const PORT = 3333;
    const app = express();

    await connection.create();

    app.use(express.json());
    app.use(cors());

    useExpressServer(app, {
      controllers: [__dirname + "/modules/**/*.controller.ts"],
      middlewares: [ErrorHandler],
      defaultErrorHandler: false,
      currentUserChecker: async (action: Action) => {
        const token = action.request.headers.authorization;

        let user: UserEntity | null = null;

        if (token) {
          const decoded = jwt.verify(token, authConfigs.secret);
          user = await UserEntity.findOne(decoded.id);
        }

        if (user) return user;

        return false;
      },
    });

    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  } catch (err) {
    console.log({ err });
  }
})();
