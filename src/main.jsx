//core react and dom imports
import React from "react";
import ReactDOM from "react-dom/client";

//main app component
import App from "./App.jsx";

//global styles
import "./index.css";

//mount app to root element with strict mode enabled
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
