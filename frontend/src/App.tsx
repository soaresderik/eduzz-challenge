import "./App.css";
import React from "react";
import { HashRouter as Router, Switch } from "react-router-dom";
import Route from "./Route";

import GlobalStyle from "./global-style";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dasboard";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
      <GlobalStyle />
    </>
  );
}

export default App;
