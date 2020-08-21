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
import Toolbar from "@material-ui/core/Toolbar";

import AppContext from "../contexts/AppContext";
import { READ_USERS, READ_POSTS, ROOT_URL, TOKEN_KEY } from "../actions";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: 280,
  },
  table: {
    minWidth: 650,
  },
}));

const All = () => {
  const { state, dispatch } = useContext(AppContext);
  const classes = useStyles();
  console.log("test");

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
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>POST_ID</TableCell>
                <TableCell align="right">Content</TableCell>
                <TableCell align="right">user_id</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell component="th" scope="row">
                    {post.id}
                  </TableCell>
                  <TableCell align="right">{post.content}</TableCell>
                  <TableCell align="right">{post.user_id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default All;
