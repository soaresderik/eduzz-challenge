import axios, { AxiosInstance } from "axios";
import HttpException from "../exceptions/http.exception";

interface CoinResponse {
  high: number;
  low: number;
  vol: number;
  last: number;
  buy: number;
  sell: number;
  open: number;
  date: number;
}

class MercadoBTC {
  constructor(private api?: AxiosInstance) {
    this.api = axios.create({
      baseURL: process.env.URL_MERCADO_BTC,
    });
  }
  public async getPriceCoin(coin = "BTC") {
    try {
      const { data } = await this.api.get<{ ticker: CoinResponse }>(
        `${coin}/ticker`
      );

      return {
        buy: +Number(data.ticker.buy).toFixed(2) * 100,
        sell: +Number(data.ticker.sell).toFixed(2) * 100,
      };
    } catch (err) {
      console.log({ response: err.message });
      if (err.response?.status)
        throw new HttpException(err.response.status, err.response.statusText);
      throw new Error("Erro when tried to call external service");
    }
  }
}

export default MercadoBTC;
