import React, { useReducer } from "react";
import reducer from "./reducers";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AppContext from "./contexts/AppContext";

import SignIn from "./components/SignIn";
import About from "./components/About";

const App = () => {
  const initialState = {
    users: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={About} />
          <Route exact path="/signin" component={SignIn} />
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
