import React, { createContext, useState, useContext, useCallback } from "react";

import { MainService } from "../services";
import { toast } from "react-toastify";
import { formatPrice } from "../utils/currency";

interface MainContextData {
  balance: string;
  history: { name: string; data: number[] }[];
  getBalance(): Promise<void>;
  getHistory(): Promise<void>;
}

interface MainState {
  balance: string;
  history: { name: string; data: number[] }[];
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
      if (err?.response.data) {
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

  return (
    <MainContext.Provider
      value={{
        balance: data.balance,
        history: data.history,
        getBalance,
        getHistory,
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
