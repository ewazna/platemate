/// <reference types="react/canary" />

import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { store } from "./store";
import { Provider } from "react-redux";
import { ToastProvider } from "./components/Toast/ToastProvider.tsx";
import { BrowsingStateProvider } from "./pages/RecipesPage/BrowsingStateProvider.tsx";
import { AuthProvider } from "./components/AuthProvider/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AuthProvider>
      <ToastProvider>
        <BrowsingStateProvider>
          <App />
        </BrowsingStateProvider>
      </ToastProvider>
    </AuthProvider>
  </Provider>,
);
