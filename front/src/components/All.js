import React, { useEffect, useContext, useRef } from "react";
import axios from "axios";

import Posts from "./Posts";

import AppContext from "../contexts/AppContext";
import { READ_POSTS, ROOT_URL } from "../actions";

const All = () => {
  const { state, dispatch } = useContext(AppContext);

  const willMount = useRef(true);
  if (willMount.current) {
    dispatch({ type: READ_POSTS, data: [] });
  }
  willMount.current = false;

  useEffect(() => {
    const f = async () => {
      const res = await axios.get(`${ROOT_URL}/post`);

      dispatch({ type: READ_POSTS, data: res.data });
      console.log(res);
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
