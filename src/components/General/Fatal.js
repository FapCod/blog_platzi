import React from "react";
import error from "../../img/error.svg";
const Fatal = props => {
  return (
    <div className="center">
      <h2 className="center rojo">{props.mensaje}</h2>
      <img src={error} alt="IMAGEN DE ERROR" />
    </div>
  );
};

export default Fatal;
