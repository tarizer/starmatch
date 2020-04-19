import React from "react";
import ReactDOM from "react-dom";
import { App, App2 } from "./App";
import Counter from "./react-getting-started/components/Counter";

let runApp = "Counter";

function SelectApp({ appName }) {
  switch (appName) {
    case "App":
      console.log("Inside App");
      return <App />;
    case "App2":
      console.log("Inside App2");
      return <App2 />;
    case "Counter":
      console.log("Inside Counter");
      return <Counter />;

    default:
      console.log("No app selected");
      return "No app selected";
  }
}

ReactDOM.render(
  <React.StrictMode>
    <SelectApp appName={runApp} />
  </React.StrictMode>,
  document.getElementById("root")
);
