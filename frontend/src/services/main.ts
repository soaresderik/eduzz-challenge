import BaseHttpService from "./http-base";
import { AxiosResponse } from "axios";
import {
  PurchaseResponse,
  PositionResponse,
  ExtractResponse,
} from "./interfaces";

class MainService extends BaseHttpService {
  async balance() {
    return this.get("accounts/balance") as Promise<
      AxiosResponse<{ amount: number }>
    >;
  }

  async getExtract() {
    return this.get("accounts/extract") as Promise<
      AxiosResponse<ExtractResponse[]>
    >;
  }

  async deposit(amount: number) {
    return this.post("accounts/deposit", { amount }) as Promise<
      AxiosResponse<{ amount: number }>
    >;
  }

  async history() {
    return this.get("history") as Promise<
      AxiosResponse<{ buy: number; sell: number }[]>
    >;
  }

  async currentPrice() {
    return this.get("investments/current-price") as Promise<
      AxiosResponse<{ buy: number; sell: number }>
    >;
  }

  async purchaseBTC(amount: number) {
    return this.post("investments/purchase", { amount }) as Promise<
      AxiosResponse<PurchaseResponse>
    >;
  }

  async getPosition() {
    return this.get("investments/position") as Promise<
      AxiosResponse<PositionResponse[]>
    >;
  }
}

export default new MainService();
