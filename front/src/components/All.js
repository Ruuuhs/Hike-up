import React, { useEffect, useContext } from "react";
import axios from "axios";

import Posts from "./Posts";

import AppContext from "../contexts/AppContext";
import { READ_POSTS, ROOT_URL } from "../actions";

const All = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const f = async () => {
      const res = await axios.get(`${ROOT_URL}/post`);
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

export default All;
