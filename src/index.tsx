import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./stores/Store";
import api from "./api/APIInterceptor";
import { ThemeProviderContext } from "./providers/ThemeProvider";
import 'bootstrap/dist/css/bootstrap.min.css';

api.interceptor(store);

ReactDOM.render(
  <React.StrictMode>
    {/* <ThemeProviderContext> */}
      <Provider store={store}>
        <App />
      </Provider>
    {/* </ThemeProviderContext> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
