import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../contexts/AppContext";
import Badge from "@material-ui/core/Badge";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Avatar from "@material-ui/core/Avatar";

import AddImage from "./AddImage";
import axios from "axios";
import { ROOT_URL, TOKEN_KEY, CURRENT_USER } from "../actions";

const useStyles = makeStyles((theme) => ({
  follow: {},
}));

export default function EditProfile() {
  const classes = useStyles();
  const { state, dispatch } = useContext(AppContext);

  const [follow, setFollow] = React.useState("");

  const handleLikeClick = async (event) => {
    event.preventDefault();
    setFollow(!follow);
    // if (!like) {
    //   setLike(!like);
    //   const res = await axios.post(
    //     `${ROOT_URL}/like`,
    //     { post_id: post.id },
    //     {
    //       headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
    //     }
    //   );
    //   setLikeId(res.data.like.id);
    //   setLikeNum(likeNum + 1);
    //   console.log(res);
    // } else {
    //   setLike(!like);
    //   const res = await axios.delete(`${ROOT_URL}/like/${likeId}`, {
    //     headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
    //   });
    //   setLikeId(false);
    //   setLikeNum(likeNum - 1);
    //   console.log("destroy", res);
    // }
  };

  return (
    <>
      {follow ? (
        <Button
          variant="contained"
          // className={classes.follow}
          color="secondary"
          onClick={handleLikeClick}
        >
          フォロー中
        </Button>
      ) : (
        <Button variant="outlined" color="secondary" onClick={handleLikeClick}>
          フォロー
        </Button>
      )}
    </>
  );
}
