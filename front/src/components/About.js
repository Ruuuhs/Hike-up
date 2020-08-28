import React, { useEffect, useContext } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

import AppContext from "../contexts/AppContext";

import Navbar from "./Navbar";
import Toolbar from "@material-ui/core/Toolbar";

import { READ_USERS, ROOT_URL, TOKEN_KEY } from "../actions";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: 269,
  },
}));

const About = () => {
  const { state, dispatch } = useContext(AppContext);
  const classes = useStyles();

  const login = async (event) => {
    event.preventDefault();
    const res = await axios.post(
      `${ROOT_URL}/auth/sign_in`,
      {
        name: "test",
        email: "test@example.com",
        password: "foobar",
        password_confirmation: "foobar",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const token = {
      "access-token": res.headers["access-token"],
      client: res.headers["client"],
      uid: res.headers["uid"],
    };
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  };

  const logout = async (event) => {
    localStorage.removeItem(TOKEN_KEY);
  };

  const getPosts = async (event) => {
    event.preventDefault();
    const res = await axios.get(`${ROOT_URL}/post`, {
      headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
    });
    console.log(res);
  };

  const getPost = async (event) => {
    event.preventDefault();
    const res = await axios.get(`${ROOT_URL}/post/10`, {
      headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
    });
    console.log(res);
  };

  const createPost = async (event) => {
    event.preventDefault();
    const res = await axios.post(
      `${ROOT_URL}/post`,
      { content: "test from About" },
      {
        headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
      }
    );
    console.log(res);
  };

  const deletePost = async (event) => {
    event.preventDefault();
    const res = await axios.delete(`${ROOT_URL}/post/187`, {
      headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
    });
    console.log(res);
  };

  const currentUser = async (event) => {
    event.preventDefault();
    const res = await axios.get(`${ROOT_URL}/current`, {
      headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
    });
    console.log(res.data);
    if (res.data === null) {
      window.location.href = "/login";
    }
  };

  const showToken = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log(token);
  };

  return (
    <>
      <Navbar />
      <Toolbar />
      <div className={classes.content}>
        <div>
          <button onClick={login}>login</button>
          <button onClick={logout}>logout</button>
        </div>
        <div>
          <button onClick={getPosts}>getPosts</button>
          <button onClick={getPost}>getPost</button>
          <button onClick={createPost}>createPost</button>
          <button onClick={deletePost}>deletePost</button>
        </div>
        <button onClick={currentUser}>currentUser</button>
        <button onClick={showToken}>showToken</button>
        <button onClick={() => console.log(state)}>console</button>
      </div>
    </>
  );
};

export default About;
