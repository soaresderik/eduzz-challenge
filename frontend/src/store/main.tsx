import React, { createContext, useState, useContext, useCallback } from "react";

import { MainService } from "../services";
import { toast } from "react-toastify";
import { formatPrice } from "../utils/currency";

interface MainContextData {
  balance: string;
  history: { name: string; data: number[] }[];
  price: { buy: string; sell: string };
  getBalance(): Promise<void>;
  getHistory(): Promise<void>;
  currentPrice(): Promise<void>;
  deposit(amount: number): Promise<void>;
  purchaseBTC(amount: number): Promise<void>;
}

interface MainState {
  balance: string;
  history: { name: string; data: number[] }[];
  price: { buy: string; sell: string };
}

const MainContext = createContext<MainContextData>({} as MainContextData);

export const MainProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<MainState>(() => {
    return {
      balance: formatPrice(0),
      history: [
        { name: "compra", data: [0] },
        { name: "venda", data: [0] },
      ],
      price: { buy: "", sell: "" },
    };
  });

  const getBalance = useCallback(async () => {
    try {
      const { data } = await MainService.balance();

      setData((state) => ({
        ...state,
        balance: formatPrice(data.amount / 100),
      }));
    } catch (err) {
      if (err?.response?.data) {
        toast.error(err?.response.data.message);
        return;
      }
      toast.error("Erro ao tentar buscar saldo.");
    }
  }, []);

  const getHistory = useCallback(async () => {
    try {
      const { data } = await MainService.history();

      const buy = data.map((i) => i.buy);
      const sell = data.map((i) => i.sell);

      setData((state) => ({
        ...state,
        history: [
          { name: "compra", data: buy },
          { name: "venda", data: sell },
        ],
      }));
    } catch (err) {
      if (err?.response.data) {
        toast.error(err?.response.data.message);
        return;
      }
      toast.error("Erro ao tentar buscar saldo.");
    }
  }, []);

  const currentPrice = useCallback(async () => {
    try {
      const { data } = await MainService.currentPrice();

      setData((state) => ({
        ...state,
        price: {
          buy: formatPrice(data.buy / 100),
          sell: formatPrice(data.sell / 100),
        },
      }));
    } catch (err) {
      if (err?.response.data) {
        toast.error(err?.response.data.message);
        return;
      }
      toast.error("Erro ao tentar buscar valor atual do bitcoin.");
    }
  }, []);

  const deposit = useCallback(async (amount: number) => {
    try {
      await MainService.deposit(amount);
      await getBalance();

      toast.success(
        `Deposito de ${formatPrice(amount / 100)} realizado com sucesso!`
      );
    } catch (err) {
      if (err?.response.data) {
        toast.error(err?.response.data.message);
        return;
      }
      toast.error("Erro ao tentar realizar deposito.");
    }
  }, []);

  const purchaseBTC = useCallback(async (amount: number) => {
    try {
      const { data } = await MainService.purchaseBTC(amount);
      await getBalance();

      toast.success(
        `Compra realizada com sucesso! Você comprou ${data.cryptoAmount} em BTC.`
      );
    } catch (err) {
      if (err?.response.data) {
        toast.error(err?.response.data.message);
        return;
      }
      toast.error("Erro ao tentar realizar compra.");
    }
  }, []);

  return (
    <MainContext.Provider
      value={{
        balance: data.balance,
        history: data.history,
        price: data.price,
        getBalance,
        getHistory,
        currentPrice,
        deposit,
        purchaseBTC,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export function useMain(): MainContextData {
  const context = useContext(MainContext);

  if (!context) {
    throw new Error("useMain must be used within a AuthProvider");
  }

  return context;
}
