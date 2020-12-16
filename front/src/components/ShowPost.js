import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import axios from "axios";
import ReactPlayer from "react-player";
import UserImage from "./UserImage";

import { TOKEN_KEY } from "../actions";

import Background from "../images/Switzerland.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 390,
    backgroundColor: theme.palette.background.paper,
    borderBottom: "1px solid lightgray",
    overflow: "auto",
  },
  inline: {
    display: "inline",
  },
  post: {
    maxHeight: 500,
    minHeight: 500,
    padding: 0,
    paddingTop: 0,
    borderRadius: 0,
    width: "100%",
  },
  postImage: {
    width: "500px",
    height: "500px",
    maxWidth: "600px",
    display: "inline-block",
    objectFit: "cover",
  },
  margin: {
    margin: theme.spacing(1),
    width: 250,
  },
  commentPost: {
    float: "right",
    marginTop: 5,
    marginRight: 5,
  },
  commentText: {
    wordWrap: "break-word",
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const ShowPost = ({
  post,
  setOpen,
  open,
  comments,
  setComments,
  setCommentNum,
  commentNum,
}) => {
  const classes = useStyles();
  const [context, setContext] = useState("");

  const handleClose = () => {
    setOpen(false);
    setContext("");
  };

  const createComment = async (event) => {
    event.preventDefault();
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/comment`,
      { content: context, post_id: post.id },
      {
        headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
      }
    );
    console.log(comments.concat(res.data));
    setComments(comments.concat(res.data));
    setContext("");
    const textareaForm = document.getElementById("comment");
    textareaForm.value = "";
    setCommentNum(commentNum + 1);
  };

  const unCreatable = context === "" || context.length > 140;

  return (
    <>
      <Dialog
        open={open !== false}
        onClose={handleClose}
        maxWidth={"md"}
        scroll={"body"}
      >
        <DialogContent
          className={classes.post}
          dividers={false}
          style={{ paddingTop: "0px" }}
        >
          {/* <ReactPlayer
            url="https://hike-up-bucket.s3-ap-northeast-1.amazonaws.com/post-video/test_movie.mov"
            controls
            className="postImage"
          /> */}
          <img src={Background} className="postImage" alt="post" />
          <div className="postContent">
            <div className="postHeader">
              <UserImage user={post.user} />
              <span className="postHeaderName">{post.user.name}</span>
            </div>
            <div className={classes.root}>
              <ListItem alignItems="flex-start" key={post.id}>
                <ListItemAvatar>
                  <UserImage user={post.user} />
                </ListItemAvatar>
                <ListItemText
                  primary={post.user.name}
                  secondary={post.content}
                />
              </ListItem>
              {comments.map((comment) => (
                <ListItem alignItems="flex-start" key={comment.id}>
                  <ListItemAvatar>
                    <UserImage user={comment.user} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.user.name}
                    secondary={comment.content}
                    className={classes.commentText}
                  />
                </ListItem>
              ))}
            </div>
            <form onSubmit={createComment}>
              <InputBase
                className={classes.margin}
                id="comment"
                placeholder="コメントを追加..."
                inputProps={{ "aria-label": "description" }}
                onChange={(e) => {
                  e.preventDefault();
                  setContext(e.target.value);
                }}
              />
              <Button
                type="submit"
                className={classes.commentPost}
                color="secondary"
                disabled={unCreatable}
              >
                投稿する
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShowPost;
