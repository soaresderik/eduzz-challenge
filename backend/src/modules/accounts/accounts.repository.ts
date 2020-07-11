import { getRepository, EntityRepository, SelectQueryBuilder } from "typeorm";
import { AccountEntity } from ".";
import { UserEntity } from "../users";
import { TransactionType } from ".";
import HttpException from "../../exceptions/http.exception";

@EntityRepository(AccountEntity)
export default class UsersRepository {
  constructor(
    public _db = getRepository(AccountEntity),
    private query?: SelectQueryBuilder<AccountEntity>
  ) {
    this.query = this._db.createQueryBuilder();
  }

  public async getBalance(user: UserEntity) {
    const { amount } = await this.query
      .select("SUM(value)", "amount")
      .where("user_id = :user", { user: user.id })
      .getRawOne();
    return {
      amount: +amount || 0,
    };
  }

  public async transaction(
    user: UserEntity,
    amount: number,
    transactionType: TransactionType
  ) {
    try {
      const { id, value, transactionType: type } = await this._db.save({
        transactionType,
        value: amount,
        user,
      });

      return {
        id,
        value,
        type,
      };
    } catch (err) {
      throw new HttpException(
        500,
        "Ocorreu um erro! por favor tente mais tarde!"
      );
    }
  }
}
