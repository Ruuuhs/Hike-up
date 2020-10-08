import React, { useEffect, useContext } from "react";
import axios from "axios";

import Posts from "./Posts";

import AppContext from "../contexts/AppContext";
import { READ_POSTS, ROOT_URL } from "../actions";

const All = () => {
  const { state, dispatch } = useContext(AppContext); // eslint-disable-line

  useEffect(() => {
    const f = async () => {
      const res = await axios.get(`${ROOT_URL}/post`);

      dispatch({ type: READ_POSTS, data: res.data });
    };
    f();

    return () => dispatch({ type: READ_POSTS, data: [] });
  }, [dispatch]);

  return (
    <>
      <Posts />
    </>
  );
};

export default All;
