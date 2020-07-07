import { getRepository, EntityRepository, SelectQueryBuilder } from "typeorm";
import { UserEntity, RegisterDTO, LoginDTO } from "./";
import * as bcrypt from "bcrypt";
import HttpException from "../../exceptions/http.exception";

@EntityRepository(UserEntity)
export default class UsersRepository {
  constructor(
    public _db = getRepository(UserEntity),
    private query?: SelectQueryBuilder<UserEntity>
  ) {
    this.query = this._db.createQueryBuilder();
  }

  public async registerUser(params: RegisterDTO) {
    if (await this._db.findOne({ email: params.email }))
      throw new HttpException(403, "Usuário já cadastrado");

    const user = await this._db.save({
      name: params.name,
      email: params.email,
      password: await this.hashPassword(params.password),
    });

    return user;
  }

  public async validatePassword(params: LoginDTO) {
    const { email, password } = params;
    const user = await this._db.findOne({ email });

    if (user && (await user.validatePassword(password))) return user;

    return false;
  }

  private async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }
}
