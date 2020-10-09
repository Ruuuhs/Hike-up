import React, { useContext } from "react";

import Post from "./Post";

import AppContext from "../contexts/AppContext";

const Posts = () => {
  const { state } = useContext(AppContext);

  console.log(state.posts.length);
  if (state.posts.length === 0) {
    return <h3 className="nonPosts">投稿がありません。</h3>;
  } else if (state.posts === "loding") {
    return <></>;
  } else {
    return (
      <>
        {state.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </>
    );
  }
};

export default Posts;
