import React, { useContext } from "react";
import axios from "axios";
import { Waypoint } from "react-waypoint";
import CircularProgress from "@material-ui/core/CircularProgress";

import Post from "./Post";

import AppContext from "../contexts/AppContext";
import { ADD_POSTS, TOKEN_KEY } from "../actions";

const Posts = ({ url }) => {
  const { state, dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState(2);

  const readPosts = async () => {
    setIsLoading(true);
    await axios
      .get(url, {
        params: {
          page: page,
        },
        headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: ADD_POSTS, data: res.data });
        setPage(page + 1);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  if (state.posts.length === 0) {
    return <h3 className="nonPosts">投稿がありません。</h3>;
  } else if (state.posts === "loding") {
    return (
      <div style={{ width: 50, marginLeft: "auto", marginRight: "auto" }}>
        <CircularProgress color="primary" />
      </div>
    );
  } else {
    return (
      <>
        {state.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        <Waypoint onEnter={readPosts} />
        {isLoading && (
          <div style={{ width: 50, marginLeft: "auto", marginRight: "auto" }}>
            <CircularProgress color="primary" />
          </div>
        )}
      </>
    );
  }
};

export default Posts;
