import { AccountsServices } from ".";
import { Get, Controller, Post, Body, CurrentUser } from "routing-controllers";
import HttpException from "../../exceptions/http.exception";
import { checkAuth } from "../../shared/check-user";

@Controller("/accounts")
export default class AccountsController {
  constructor(private accountsService = new AccountsServices()) {}

  @Get("/balance")
  public async getBalance(@CurrentUser() user?) {
    checkAuth(user);
    return this.accountsService.getBalance(user);
  }

  @Get("/extract")
  public async getExtract(@CurrentUser() user?) {
    checkAuth(user);
    return this.accountsService.getExtract(user);
  }

  @Post("/deposit")
  public async deposit(@Body() { amount }, @CurrentUser() user?) {
    checkAuth(user);
    if (!Number.isInteger(amount) || amount <= 0)
      throw new HttpException(
        400,
        "Amount deve ser um valor inteiro maior que zero"
      );

    return this.accountsService.transaction(user, amount, "deposit");
  }
}
