import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//import config from "./amplifyconfiguration.json";
//import { Amplify } from "aws-amplify";

//test pushing this to github

// Amplify.configure(config);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);