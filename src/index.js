import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import Counter from "./react-getting-started/components/Counter";
import GithubCards from "./react-getting-started/components/GithubCards";

let runApp = "GithubCards";

function SelectApp({ appName }) {
  switch (appName) {
    case "App":
      console.log("Inside App");
      return <App />;
    case "Counter":
      console.log("Inside Counter");
      return <Counter />;
    case "GithubCards":
      console.log("Inside GithubCards");
      return <GithubCards title="⚛️ The GitHub Cards App" />;

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
