import { StrictMode } from "react";
import ReactDOM from "react-dom";

// import App2 from "./App2";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
