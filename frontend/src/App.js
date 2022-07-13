import React from "react";
import InputForm from "./components/Input";
import "./app.css"
import { Route, Switch } from "react-router";
import View from "./components/view";
import ErrorPage from "./components/error";
import ContextStore from "./store/context";

const App = () => {
  return (
    <ContextStore>
      <Route exact path="/" component={InputForm} />
      <Switch>
        <Route path="/view/:number" component={View} />
        <Route path="/view" component={ErrorPage} />
      </Switch>
    </ContextStore>
  )
}

export default App;
