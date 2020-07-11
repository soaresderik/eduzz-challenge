import { UsersServices, UserEntity } from "../modules/users";
import * as jwt from "jsonwebtoken";
import authConfigs from "../configs/auth.configs";
import { AccountsServices } from "../modules/accounts";
import { InvestmentsServices } from "../modules/investments";

async function getUser(token: string) {
  const decoded = jwt.verify(token, authConfigs.secret);
  return UserEntity.findOne(decoded.id);
}

describe("Main Test", () => {
  let userService: UsersServices;
  let accountService: AccountsServices;
  let invesmentService: InvestmentsServices;
  let user: UserEntity;

  beforeAll(async () => {
    userService = new UsersServices();
    accountService = new AccountsServices();
    invesmentService = new InvestmentsServices();

    await userService.registerUser({
      email: "example@example.com",
      name: "example name",
      password: "12345678",
    });

    const login = await userService.login({
      email: "example@example.com",
      password: "12345678",
    });

    user = await getUser(login.token);
  });

  it("Deposit R$10.000 (cents format) and check balance", async () => {
    const deposit = await accountService.transaction(user, 1000000, "deposit");
    expect(deposit).toMatchObject({ value: 1000000, type: "deposit" });

    const balance = await accountService.getBalance(user);
    expect(balance.amount).toBe(1000000);
  });

  it("Purchase R$150,00 in bitcoin", async () => {
    const purchase = await invesmentService.purchase(15000, user);
    expect(purchase.purchaseAmount).toBe(15000);
  });
});
