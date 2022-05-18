import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Main from "./Main";
import { store } from "./features/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Main />
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
