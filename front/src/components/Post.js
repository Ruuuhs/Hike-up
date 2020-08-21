import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "../App.css";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import TextsmsOutlinedIcon from "@material-ui/icons/TextsmsOutlined";

const Post = ({ post }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <div className="post_wrapper">
        <div className="post_user">{post.id}</div>
        <div className="post_bar">
          <FavoriteBorderIcon
            style={{ fontSize: 30, color: "#888888", marginRight: "15px" }}
          />
          <TextsmsOutlinedIcon style={{ fontSize: 30, color: "#888888" }} />
          <BookmarkBorderIcon
            style={{ fontSize: 30, color: "#888888", float: "right" }}
          />
        </div>
        <div className="post_content">{post.content}</div>
      </div>
    </React.Fragment>
  );
};

export default Post;
