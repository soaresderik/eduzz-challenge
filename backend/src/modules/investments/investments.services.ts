import MercadoBTC from "../../integrations/mercado-btc";
import { UserEntity } from "../users";
import { AccountsServices } from "../accounts";
import HttpException from "../../exceptions/http.exception";
import { InvestmentsRepository, InvesmentArgs } from ".";
import Queue from "../../queues";

export default class InvestmentsServices {
  constructor(
    private mercadoAPI = new MercadoBTC(),
    private investmentRepository = new InvestmentsRepository(),
    private accountService = new AccountsServices()
  ) {}

  public async getCurrentPrice() {
    return this.mercadoAPI.getPriceCoin();
  }

  public async purchase(amount: number, user: UserEntity) {
    const balance = await this.accountService.getBalance(user);

    if (balance.amount < amount)
      throw new HttpException(
        401,
        "Parece que você não tem saldo suficiente para executar esta ação."
      );

    const cryptoPrice = await this.getCurrentPrice();

    const investment = {
      cryptoAmount: amount / cryptoPrice.buy,
      purchaseCryptoPrice: cryptoPrice.buy,
      purchaseAmount: amount,
      user,
    } as InvesmentArgs;

    const result = await this.investmentRepository.purchase(investment);

    // TODO: Create email template
    Queue.add("mail", {
      from: "Eduzz Challenge <example@example.com>",
      to: `${user.name} <${user.email}>`,
      subject: "Compra de Bitcoin realizada!",
      html: `
        <h2>Detalhes do investimento</h2>
        <p>
          Valor Investido: <strong> ${
            result.purchaseAmount / 100
          } </strong> <br/>
          Valor em BTC: <strong> ${result.cryptoAmount} </strong>
        </p>
      `,
    });

    return result;
  }
}
