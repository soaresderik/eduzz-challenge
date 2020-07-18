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

export interface PositionResponse {
  id: string;
  purchaseCryptoPrice: number;
  currentCryptoPrice: number;
  cryptoAmount: number;
  purchaseAmount: number;
  variation: number;
  purchasedDate: string;
}

export interface ExtractResponse {
  id: string;
  value: number;
  type: string;
  createdAt: string;
}
