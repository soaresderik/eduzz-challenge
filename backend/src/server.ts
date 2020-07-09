import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import { useExpressServer, Action } from "routing-controllers";
import express from "express";
import ErrorHandler from "./middlewares/error-handler.middleware";
import connection from "./shared/connection.shared";
import { UserEntity } from "./modules/users";
import authConfigs from "./configs/auth.configs";
import * as jwt from "jsonwebtoken";

(async () => {
  try {
    const PORT = 3333;
    const app = express();

    await connection();

    app.use(express.json());

    useExpressServer(app, {
      controllers: [__dirname + "/modules/**/*.controller.ts"],
      middlewares: [ErrorHandler],
      defaultErrorHandler: false,
      authorizationChecker: async (action: Action, roles: string[]) => {
        const token = action.request.headers.authorization;

        let user: UserEntity | null = null;

        if (token) {
          const decoded = jwt.verify(token, authConfigs.secret);
          user = await UserEntity.findOne(decoded.id);
        }

        if (user) return true;

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
