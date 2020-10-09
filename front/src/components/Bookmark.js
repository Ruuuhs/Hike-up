import React, { useEffect, useContext } from "react";
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
  const { dispatch } = useContext(AppContext);
  const classes = useStyles();

  useEffect(() => {
    const f = async () => {
      const res = await axios.get(`${ROOT_URL}/bookmark`, {
        headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
      });
      dispatch({ type: READ_POSTS, data: res.data });
    };
    f();

    return () => dispatch({ type: READ_POSTS, data: [] });
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
