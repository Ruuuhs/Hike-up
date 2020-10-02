import React, { useEffect, useContext, useRef } from "react";
import axios from "axios";

import Posts from "./Posts";
import TurnedInIcon from "@material-ui/icons/TurnedIn";

import AppContext from "../contexts/AppContext";
import { makeStyles } from "@material-ui/core/styles";

import { READ_POSTS, TOKEN_KEY, ROOT_URL } from "../actions";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginRight: 10,
    color: "#fa6d6d",
  },
  editButton: {
    display: "inline-block",
  },
}));

const All = () => {
  const { state, dispatch } = useContext(AppContext);
  const classes = useStyles();

  const willMount = useRef(true);
  if (willMount.current) {
    dispatch({ type: READ_POSTS, data: [] });
  }
  willMount.current = false;

  useEffect(() => {
    const f = async () => {
      const res = await axios.get(`${ROOT_URL}/bookmark`, {
        headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
      });
      dispatch({ type: READ_POSTS, data: res.data });
    };
    f();
  }, [dispatch]);

  return (
    <>
      <div className="mainContent pageTop">
        <TurnedInIcon className={classes.large} />
        <h2 className="pageName">ブックマーク</h2>
      </div>

      <Posts />
    </>
  );
};

export default All;
