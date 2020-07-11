import { UserEntity } from "modules/users";
import HttpException from "../exceptions/http.exception";

export function checkAuth(user: UserEntity | null | undefined) {
  if (!user)
    throw new HttpException(401, "Ops! você precisa estar autenticado.");
}
