export interface IAuthenticate {
  email: string;
  password: string;
}

export interface IRegister extends IAuthenticate {
  name: string;
}

export interface AuthResponse {
  token: string;
}

export interface PurchaseResponse {
  cryptoAmount: number;
  id: string;
  purchaseAmount: number;
  purchaseCryptoPrice: number;
  createdAt: Date;
}
