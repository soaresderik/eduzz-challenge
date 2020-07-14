import React, { createContext, useCallback, useState, useContext } from "react";

import { AuthService, IAuthenticate, IRegister } from "../services";
import { toast } from "react-toastify";

interface AuthContextData {
  token: string;
  login(params: IAuthenticate): Promise<void>;
  register(params: IRegister): Promise<boolean>;
  logout(): void;
}

interface AuthState {
  token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = AuthService.getAccessToken();

    if (token) {
      return {
        token,
      };
    }

    return {} as AuthState;
  });

  const register = useCallback(async ({ name, email, password }) => {
    try {
      await AuthService.register({ name, email, password });

      return true;
    } catch (err) {
      if (err?.response.data) {
        toast.error(err?.response.data.message);
        return false;
      }
      toast.error("Erro ao tentar realizar login!");
      return false;
    }
  }, []);

  const login = useCallback(async ({ email, password }) => {
    try {
      const response = await AuthService.login({ email, password });

      const { token } = response.data;
      AuthService.saveToken(token);

      setData({ token });
    } catch (err) {
      if (err?.response.data) {
        toast.error(err?.response.data.message);
        return;
      }
      toast.error("Erro ao tentar realizar login!");
    }
  }, []);

  const logout = useCallback(() => {
    AuthService.removeToken();

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ token: data.token, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}
