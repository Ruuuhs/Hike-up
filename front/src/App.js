import React, { useReducer } from "react";
import "./App.css";
import reducer from "./reducers";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";

import AppContext from "./contexts/AppContext";

import Login from "./components/Login";
import About from "./components/About";
import All from "./components/All";
import Test from "./components/Test";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#cfd8dc",
      contrastText: "#000000",
    },
    secondary: {
      main: "#ff9f44",
      contrastText: "#000000",
    },
  },
});

// 不明なRouteは全てNotFound
const NotFound = () => {
  return <h2>ページが見つかりません</h2>;
};

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
    <MuiThemeProvider theme={theme}>
      <AppContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={All} />
            <Route exact path="/about" component={About} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Test" component={Test} />
            {/* <Route exact path="/user/:id" component={User} />
          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/feed" component={feed} />
          <Route exact path="/trend/:period" component={Trend} />
          <Route exact path="/bookmark" component={Bookmark} />
          <Route exact path="/" component={} /> */}
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </AppContext.Provider>
    </MuiThemeProvider>
  );
};

export default App;
