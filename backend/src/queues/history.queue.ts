import MercadoBTC from "../integrations/mercado-btc";
import { HistoryEntity } from "../modules/history";

const mercadoBTC = new MercadoBTC();

export default {
  key: "call-api",
  async handle() {
    const { buy, sell } = await mercadoBTC.getPriceCoin();

    const hist = await HistoryEntity.create({ buy, sell }).save();
    console.log({ hist });
  },
  options: { repeat: { cron: "*/10 * * * *" } },
};
