import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemesProvider } from "./contexts/ThemeContext";
import { store } from "./stores/Store";
import { Provider } from "react-redux";
import api from "./api/APIInterceptor";
import { ErrorBoundary } from "./contexts/ErrorBoundaryContext";

api.interceptor(store);

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ThemesProvider>
          <App />
        </ThemesProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
