import React, { useEffect, useContext } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

import { Route, Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import Toolbar from "@material-ui/core/Toolbar";
import AppContext from "../contexts/AppContext";
import { TOKEN_KEY, CURRENT_USER } from "../actions";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: 269,
  },
  table: {
    minWidth: 650,
  },
}));

function GuestRoute(props) {
  const { state, dispatch } = useContext(AppContext);
  const classes = useStyles();

  useEffect(() => {
    const f = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/current`, {
        headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
      });
      dispatch({ type: CURRENT_USER, data: res.data });
    };
    f();
  }, [dispatch]);

  // 渡された props をそのまま Route に設定する
  return (
    <>
      <Navbar />
      <Toolbar />
      <div className={classes.content}>
        <Route {...props} />
      </div>
    </>
  );
}

export default GuestRoute;
