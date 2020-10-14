import React, { useEffect, useContext } from "react";
import axios from "axios";

import Posts from "./Posts";
import TurnedInIcon from "@material-ui/icons/TurnedIn";

import AppContext from "../contexts/AppContext";
import { makeStyles } from "@material-ui/core/styles";

import { READ_POSTS, TOKEN_KEY, ROOT_URL } from "../actions";
const url = `${ROOT_URL}/bookmark`;

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: 5,
    color: "#a1a1a1",
  },
  editButton: {
    display: "inline-block",
  },
}));

const Bookmark = () => {
  const { dispatch } = useContext(AppContext);
  const classes = useStyles();

  useEffect(() => {
    const f = async () => {
      const res = await axios.get(url, {
        headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
      });
      dispatch({ type: READ_POSTS, data: res.data });
    };
    f();

    return () => dispatch({ type: READ_POSTS, data: "loding" });
  }, [dispatch]);

  return (
    <>
      <div className="pageTitle">ブックマーク</div>

      <Posts url={url} />
    </>
  );
};

export default Bookmark;
