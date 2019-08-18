import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import "./style.scss";

const App = () => {
  useEffect(() => console.log(" Use Effect"), []);
  return (
    <>
      <div>
        <h1>Hello React,Webpack 4 & Babel 7!</h1>
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
