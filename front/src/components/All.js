import React, { useEffect, useContext } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

import Navbar from "./Navbar";
import Post from "./Post";
import Toolbar from "@material-ui/core/Toolbar";

import AppContext from "../contexts/AppContext";
import { READ_POSTS, ROOT_URL } from "../actions";

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

const All = () => {
  const { state, dispatch } = useContext(AppContext);
  const classes = useStyles();

  useEffect(() => {
    const f = async () => {
      const res = await axios.get(`${ROOT_URL}/post`);
      console.log(res);
      dispatch({ type: READ_POSTS, data: res.data });
    };
    f();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Toolbar />
      <div className={classes.content}>
        {state.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default All;
