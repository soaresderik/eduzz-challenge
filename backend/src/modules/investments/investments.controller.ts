import { InvestmentsServices } from ".";
import { Get, Controller, Post, Body, CurrentUser } from "routing-controllers";
import HttpException from "../../exceptions/http.exception";
import { checkAuth } from "../../shared/check-user";

@Controller("/investments")
export default class InvestmentsController {
  constructor(private investmentsService = new InvestmentsServices()) {}

  @Get("/current-price")
  public async getCurrentPrice(@CurrentUser() user?) {
    checkAuth(user);
    return this.investmentsService.getCurrentPrice();
  }

  @Post("/purchase")
  public async puchase(@Body() { amount }, @CurrentUser() user?) {
    checkAuth(user);
    if (!Number.isInteger(amount) || amount <= 0)
      throw new HttpException(
        400,
        "Amount deve ser um valor inteiro maior que zero"
      );

    return this.investmentsService.purchase(amount, user);
  }
}
