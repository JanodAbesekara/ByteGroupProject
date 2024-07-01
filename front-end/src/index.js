import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SocketContextProvider } from "./Contex/SocketContex";
import axios from 'axios';

axios.defaults.baseURL = "https://byte-group-project-7p46.vercel.app";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
