import * as dotenv from "dotenv";

export const loadEnv = (path = ".env") => {
  return dotenv.config({ path });
};
