import React, { useContext } from "react";

import Post from "./Post";

import AppContext from "../contexts/AppContext";

const Posts = () => {
  const context = useContext(AppContext);

  return (
    <>
      {context.state.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default Posts;
