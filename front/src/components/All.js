import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Navbar from "./Navbar";
import Post from "./Post";
import Toolbar from "@material-ui/core/Toolbar";

import AppContext from "../contexts/AppContext";
import { READ_USERS, READ_POSTS, ROOT_URL, TOKEN_KEY } from "../actions";

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
      dispatch({ type: READ_POSTS, data: res.data });
    };
    f();
  }, []);

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
