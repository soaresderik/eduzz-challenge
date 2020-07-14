import React from "react";

import { AuthProvider } from "./auth";
import { MainProvider } from "./main";

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <MainProvider>{children}</MainProvider>
  </AuthProvider>
);

export default AppProvider;
