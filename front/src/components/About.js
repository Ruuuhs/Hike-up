import React, { useContext } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

import AppContext from "../contexts/AppContext";

import { START_LOADING, FINISH_LOADING, ROOT_URL, TOKEN_KEY } from "../actions";

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

  const startLoading = async () => {
    dispatch({ type: START_LOADING });
  };

  const finishLoading = async () => {
    dispatch({ type: FINISH_LOADING });
  };

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
    const res = await axios.get(`${ROOT_URL}/post/1`, {
      headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
    });
    console.log(res);
    console.log(res.data);
  };

  const createPost = async (event) => {
    event.preventDefault();
    const res = await axios.post(
      `${ROOT_URL}/post`,
      {
        content: "Image test",
        image:
          "data:image/png;base64,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",
      },
      {
        headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
      }
    );
    console.log(res.data.image);
  };

  const deletePost = async (event) => {
    event.preventDefault();
    const res = await axios.delete(`${ROOT_URL}/post/187`, {
      headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
    });
    console.log(res);
  };

  const likePost = async (event) => {
    event.preventDefault();
    const res = await axios.post(
      `${ROOT_URL}/like`,
      { post_id: 3 },
      {
        headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
      }
    );
    console.log(res);
  };

  const currentUser = async (event) => {
    event.preventDefault();
    const res = await axios.get(`${ROOT_URL}/current`, {
      headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
    });
    console.log(res.data);
    // if (res.data === null) {
    //   window.location.href = "/login";
    // }
  };

  const getUser = async (event) => {
    event.preventDefault();
    const res = await axios.get(`${ROOT_URL}/user/1`);
    console.log(res.data);
  };

  const showToken = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log(token);
  };

  const test = async (event) => {
    event.preventDefault();
    const res = await axios.get(
      "https://rallycoding.herokuapp.com/api/music_albums"
    );
    console.log(res.data);
  };

  return (
    <>
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
        <div>
          <button onClick={likePost}>likePost</button>
        </div>
        <div>
          <button onClick={startLoading}>startLoading</button>
          <button onClick={finishLoading}>finishLoading</button>
        </div>
        <div>
          <button onClick={currentUser}>currentUser</button>
          <button onClick={getUser}>getUser</button>
          <button onClick={showToken}>showToken</button>
          <button onClick={() => console.log(state)}>console</button>
          <button onClick={test}>test</button>
        </div>
      </div>
    </>
  );
};

export default About;
