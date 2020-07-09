import MercadoBTC from "../../integrations/mercado-btc";

export default class InvestmentsServices {
  constructor(private mercadoAPI = new MercadoBTC()) {}

  public async getCurrentPrice() {
    return this.mercadoAPI.getPriceCoin();
  }
}
