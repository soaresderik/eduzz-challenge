import BaseHttpService from "./http-base";
import { AxiosResponse } from "axios";

class MainService extends BaseHttpService {
  async balance() {
    return this.get("accounts/balance") as Promise<
      AxiosResponse<{ amount: number }>
    >;
  }

  async history() {
    return this.get("history") as Promise<
      AxiosResponse<{ buy: number; sell: number }[]>
    >;
  }
}

export default new MainService();
