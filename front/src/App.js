import React, { useReducer, useEffect } from "react";
import "./App.css";
import reducer from "./reducers";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";

import AppContext from "./contexts/AppContext";

import ScrollToTopOnMount from "./components/ScrollToTopOnMount";
import Login from "./components/Login";
import About from "./components/About";
import All from "./components/All";
import Trend from "./components/Trend";
import Bookmark from "./components/Bookmark";
import Test from "./components/Test";
import User from "./components/User";
import GuestRoute from "./components/GuestRoute";
import PrivateRoute from "./components/PrivateRoute";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#cfd8dc",
      contrastText: "#000000",
    },
    secondary: {
      main: "#6bbcff",
      contrastText: "#ffffff",
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
    currentUser: [],
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
          <ScrollToTopOnMount />

          <Switch>
            <Route exact path="/login" component={Login} />
            <GuestRoute exact path="/" children={<All />} />
            <GuestRoute exact path="/user/:id" children={<User />} />
            <GuestRoute exact path="/test" children={<Test />} />
            <GuestRoute exact path="/about" children={<About />} />
            <PrivateRoute exact path="/bookmark" children={<Bookmark />} />
            <GuestRoute exact path="/trend" children={<Trend />} />
            {/* <PrivateRoute exact path="/" children={< />} /> */}
            {/* <GuestRoute exact path="/" children={< />} /> */}
            {/* <Route exact path="/post/:id" component={Post} />
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
