import axios from "axios";

export default class BaseHttpService {
  private BASE_URL: string = "http://localhost:3333";
  private token: string | null = null;

  async get(endpoint: string, options = {}) {
    Object.assign(options, this.getCommonOptions());
    return axios
      .get(`${this.BASE_URL}/${endpoint}`, options)
      .catch((error: any) => this.handleHttpError(error));
  }

  async post(endpoint: string, data = {}, options = {}) {
    Object.assign(options, this.getCommonOptions());
    return axios
      .post(`${this.BASE_URL}/${endpoint}`, data, options)
      .catch((error: any) => this.handleHttpError(error));
  }

  async delete(endpoint: string, options = {}) {
    Object.assign(options, this.getCommonOptions());
    return axios
      .delete(`${this.BASE_URL}/${endpoint}`, options)
      .catch((error: any) => this.handleHttpError(error));
  }

  async patch(endpoint: string, data = {}, options = {}) {
    Object.assign(options, this.getCommonOptions());
    return axios
      .patch(`${this.BASE_URL}/${endpoint}`, data, options)
      .catch((error: any) => this.handleHttpError(error));
  }

  async put(endpoint: string, data = {}, options = {}) {
    Object.assign(options, this.getCommonOptions());
    return axios
      .put(`${this.BASE_URL}/${endpoint}`, data, options)
      .catch((error: any) => this.handleHttpError(error));
  }

  public getAccessToken = () => {
    return this.token || this.loadToken();
  };

  public loadToken = () => {
    const token = localStorage.getItem("token");
    this.token = token;
    return token;
  };

  public saveToken = (token: string) => {
    this.token = token;
    return localStorage.setItem("token", token);
  };

  public removeToken = () => {
    localStorage.removeItem("token");
  };

  private handleHttpError = (error: any) => {
    const statusCode = error?.response?.data?.statusCode;

    if (statusCode !== 401) throw error;

    this.removeToken();
    throw error;
  };

  private getCommonOptions = () => {
    const token = this.loadToken();

    return {
      headers: {
        Authorization: `${token}`,
      },
    };
  };
}
