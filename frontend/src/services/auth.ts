import BaseHttpService from "./http-base";
import { IAuthenticate, IRegister, AuthResponse } from "./interfaces";
import { AxiosResponse } from "axios";

class AuthService extends BaseHttpService {
  async login(data: IAuthenticate) {
    return this.post("users/login", data) as Promise<
      AxiosResponse<AuthResponse>
    >;
  }

  async register(data: IRegister): Promise<any> {
    return this.post("users/register", data);
  }
}

export default new AuthService();
