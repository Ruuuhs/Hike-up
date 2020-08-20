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

import AppContext from "../contexts/AppContext";
import { READ_USERS, READ_POSTS, ROOT_URL, TOKEN_KEY } from "../actions";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const About = () => {
  const { state, dispatch } = useContext(AppContext);
  const classes = useStyles();

  useEffect(() => {
    const f = async () => {
      const res = await axios.get(`${ROOT_URL}/post`);
      dispatch({ type: READ_POSTS, data: res.data });
    };
    f();
  });

  const logout = async (event) => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/login";
  };

  const getPosts = async (event) => {
    event.preventDefault();
    const res = await axios.get(`${ROOT_URL}/post`);
    console.log(res);
  };

  return (
    <>
      <div>
        <button onClick={logout}>logout</button>
        <button onClick={getPosts}>getPosts</button>
        <button onClick={() => console.log(state)}>console</button>
      </div>

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
    </>
  );
};

export default About;
