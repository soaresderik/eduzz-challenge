import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { HashRouter as Router, Switch, Redirect } from "react-router-dom";
import Route from "./Route";
import { ToastContainer } from "react-toastify";

import AppProvider from "./store";

import GlobalStyle from "./global-style";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dasboard";

function App() {
  return (
    <>
      <Router>
        <AppProvider>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} isPrivate />
            <Redirect to="/dashboard" />
          </Switch>
        </AppProvider>
      </Router>
      <ToastContainer />
      <GlobalStyle />
    </>
  );
}

export default App;
