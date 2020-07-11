import * as jwt from "jsonwebtoken";
import { EntityRepository } from "typeorm";
import { UserEntity, RegisterDTO, UsersRepository } from "./";
import { LoginDTO } from "./user.dto";
import authConfig from "../../configs/auth.configs";
import HttpException from "../../exceptions/http.exception";

@EntityRepository(UserEntity)
export default class UsersServices {
  constructor(private usersRepository = new UsersRepository()) {}

  public async login(params: LoginDTO) {
    const user = await this.usersRepository.validatePassword(params);

    if (!user) throw new HttpException(401, "Usuário não autorizado.");

    user.token = await jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expires,
    });

    return {
      token: user.token,
    };
  }

  public async registerUser(params: RegisterDTO) {
    const user = await this.usersRepository.registerUser(params);
    delete user.password;
    return user;
  }
}
