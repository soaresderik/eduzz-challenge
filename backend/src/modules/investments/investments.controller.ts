import { InvestmentsServices } from ".";
import { Get, Controller } from "routing-controllers";

@Controller("/investments")
export default class InvestmentsController {
  constructor(private investmentsService = new InvestmentsServices()) {}

  @Get("/current-price")
  public async getCurrentPrice() {
    return this.investmentsService.getCurrentPrice();
  }
}
