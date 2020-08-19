import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import AppContext from "../contexts/AppContext";

import {
  CREATE_USER,
  READ_USERS,
  READ_USER,
  ROOT_URL,
  TOKEN_KEY,
} from "../actions";

const About = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const f = async () => {
      const response = await axios.get(`${ROOT_URL}/user`);
      dispatch({ type: READ_USER, data: response.data });
    };
    f();
  });

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
    window.location.href = "/login";
  };

  const getToken = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log(token);
  };

  return (
    <>
      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>
      <button onClick={getToken}>getToken</button>
      <button onClick={() => console.log(state)}>console</button>
    </>
  );
};

export default About;
