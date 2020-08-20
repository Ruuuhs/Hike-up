import React, { useReducer } from "react";
import reducer from "./reducers";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AppContext from "./contexts/AppContext";

import Login from "./components/Login";
import About from "./components/About";
import All from "./components/All";

const App = () => {
  const initialState = {
    users: [],
    posts: [],
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
          <Route exact path="/" component={All} />
          <Route exact path="/about" component={About} />
          <Route exact path="/Login" component={Login} />
          {/* <Route exact path="/user/:id" component={User} />
          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/feed" component={feed} />
          <Route exact path="/trend/:period" component={Trend} />
          <Route exact path="/bookmark" component={Bookmark} />
          <Route exact path="/" component={} /> */}
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
