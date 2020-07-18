import { AccountsRepository } from ".";
import { UserEntity } from "../users";
import { TransactionType } from ".";

export default class AccountsServices {
  constructor(private accountsRepository = new AccountsRepository()) {}

  public async getBalance(user: UserEntity) {
    return this.accountsRepository.getBalance(user);
  }

  public async transaction(
    user: UserEntity,
    amount: number,
    type: TransactionType
  ) {
    return this.accountsRepository.transaction(user, amount, type);
  }

  public async getExtract(user: UserEntity) {
    const extract = await this.accountsRepository._db.find({
      where: {
        user,
      },
      order: {
        createdAt: "DESC",
      },
    });
    return extract.map((i) => ({
      id: i.id,
      value: i.value,
      type: i.transactionType,
      createdAt: i.createdAt,
    }));
  }
}
