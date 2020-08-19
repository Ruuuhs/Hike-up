import React, { useReducer } from "react";
import reducer from "./reducers";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AppContext from "./contexts/AppContext";

import Login from "./components/Login";
import About from "./components/About";

const App = () => {
  const initialState = {
    users: [],
    login: {
      isLoading: false,
      isLoginView: true,
      error: "",
      credentialsSign: {
        name: "",
        email: "",
        password: "",
      },
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={About} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Login" component={Login} />
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
