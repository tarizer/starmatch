import React from "react";
import ReactDOM from "react-dom";

import Counter from "./react-getting-started/components/Counter";
import GithubCards from "./react-getting-started/components/GithubCards";
import StarMatch from "./react-getting-started/components/StarMatch";

let runApp = "StarMatch";

function SelectApp({ appName }) {
  switch (appName) {
    case "Counter":
      console.log("Inside Counter");
      return <Counter />;
    case "GithubCards":
      console.log("Inside GithubCards");
      return <GithubCards title="⚛️ The GitHub Cards App" />;
    case "StarMatch":
      console.log("Inside Star Match");
      return <StarMatch title="⚛️ The Star Match Game" />;

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
