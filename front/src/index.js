import React from "react";
import { render } from "react-dom";
import App from "~/components/App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

// Redux関連
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "~/reducers/rootReducer";
import { getPosts } from "~/actions/postAction";

// Redux-Thunk関連（非同期データ取得用）
import thunk from "redux-thunk";
import logger from "redux-logger";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

store.dispatch(getPosts());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
