import React, { useEffect, useContext } from "react";
import axios from "axios";

import Posts from "./Posts";

import AppContext from "../contexts/AppContext";

import { READ_POSTS, TOKEN_KEY } from "../actions";
const url = `${process.env.REACT_APP_API_URL}/bookmark`;

const Bookmark = () => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    const f = async () => {
      const res = await axios.get(url, {
        headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
      });
      dispatch({ type: READ_POSTS, data: res.data });
    };
    f();

    return () => dispatch({ type: READ_POSTS, data: "loding" });
  }, [dispatch]);

  return (
    <>
      <div className="pageTitle">ブックマーク</div>

      <Posts url={url} />
    </>
  );
};

export default Bookmark;
