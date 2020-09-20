import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

// import CircularProgress from "@material-ui/core/CircularProgress";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import { Link } from "react-router-dom";

import { ROOT_URL, TOKEN_KEY } from "../actions";
import axios from "axios";

import Background from "../Switzerland.jpg";

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
      `${ROOT_URL}/comment`,
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
        open={open != false}
        onClose={handleClose}
        maxWidth={"md"}
        scroll={"body"}
      >
        <DialogContent
          className={classes.post}
          dividers={false}
          style={{ paddingTop: "0px" }}
        >
          <img src={Background} className="postImage" />
          <div className="postContent">
            <div className="postHeader">
              {post.user.image ? (
                <Avatar aria-label="recipe" src={post.user.image} />
              ) : (
                <Avatar aria-label="recipe" src="/images/defaultUser.png" />
              )}
              <span className="postHeaderName">{post.user.name}</span>
            </div>
            <div className={classes.root}>
              <ListItem alignItems="flex-start" key={post.id}>
                <ListItemAvatar>
                  {post.user.image ? (
                    <Avatar
                      aria-label="recipe"
                      src={post.user.image}
                      className={classes.small}
                    />
                  ) : (
                    <Avatar
                      aria-label="recipe"
                      src="/images/defaultUser.png"
                      className={classes.small}
                    />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={post.user.name}
                  secondary={post.content}
                />
              </ListItem>
              {comments.map((comment) => (
                <ListItem alignItems="flex-start" key={comment.id}>
                  <ListItemAvatar>
                    {comment.user.image ? (
                      <Avatar
                        aria-label="recipe"
                        src={comment.user.image}
                        className={classes.small}
                      />
                    ) : (
                      <Avatar
                        aria-label="recipe"
                        src="/images/defaultUser.png"
                        className={classes.small}
                      />
                    )}
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
