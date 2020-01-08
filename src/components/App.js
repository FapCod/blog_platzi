import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Menu from "./Menu";
import Usuarios from "./Usuarios/index.js";
import Publicaciones from "./Publicaciones";
import Tareas from "./Tareas";
import TareasGuardar from "./Tareas/Guardar";
const App = () => (
  <BrowserRouter>
    <Menu />
    <Switch>
      <div className="margen">
        <Route exact path="/" component={Usuarios} />
        <Route exact path="/tareas" component={Tareas} />
        <Route exact path="/publicaciones/:key" component={Publicaciones} />
        <Route exact path="/tareas/guardar" component={TareasGuardar} />
        <Route
          exact
          path="/tareas/guardar/:usu_id/:tar_id"
          component={TareasGuardar}
        />
      </div>
    </Switch>
  </BrowserRouter>
);
export default App;
