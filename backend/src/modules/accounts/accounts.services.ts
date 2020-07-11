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
}
