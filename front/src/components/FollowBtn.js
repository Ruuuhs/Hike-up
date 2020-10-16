import React from "react";

import Button from "@material-ui/core/Button";

import axios from "axios";
import { TOKEN_KEY } from "../actions";

export default function EditProfile(props) {
  const handleLikeClick = async (event) => {
    event.preventDefault();
    props.setFollow(!props.follow);
    if (!props.follow) {
      props.setFollow(!props.follow);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/relationship`,
        { followed_id: props.id },
        {
          headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
        }
      );
      props.setFollowersNum(props.followersNum + 1);
      console.log(res);
    } else {
      props.setFollow(!props.follow);
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/relationship/${props.id}`,
        {
          headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
        }
      );
      props.setFollowersNum(props.followersNum - 1);
      console.log("destroy", res);
    }
  };

  return (
    <>
      {props.follow ? (
        <Button variant="contained" color="secondary" onClick={handleLikeClick}>
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
