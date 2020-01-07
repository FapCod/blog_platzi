import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Menu from "./Menu";
import Usuarios from "./Usuarios/index.js";
const App = () => (
  <BrowserRouter>
    <Menu />
    <Switch>
      <div className="margen">
        <Route exact path="/" component={Usuarios} />
        <Route exact path="/tareas" component="" />
      </div>
    </Switch>
  </BrowserRouter>
);
export default App;
