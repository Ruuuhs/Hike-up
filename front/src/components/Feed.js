import React, { useEffect, useContext } from "react";
import axios from "axios";

import Posts from "./Posts";

import AppContext from "../contexts/AppContext";
import { READ_POSTS, TOKEN_KEY, ROOT_URL } from "../actions";

const Feed = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const f = async () => {
      const res = await axios.get(`${ROOT_URL}/feed`, {
        headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
      });
      dispatch({ type: READ_POSTS, data: res.data });
    };
    f();
  }, [dispatch]);

  return (
    <>
      <Posts />
    </>
  );
};

export default Feed;
