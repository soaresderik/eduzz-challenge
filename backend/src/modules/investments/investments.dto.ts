import { UserEntity } from "../users";

export interface InvesmentArgs {
  purchaseAmount: number;
  cryptoAmount: number;
  purchaseCryptoPrice: number;
  user: UserEntity;
}
