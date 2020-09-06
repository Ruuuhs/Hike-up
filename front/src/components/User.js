import React, { useEffect, useContext } from "react";
import axios from "axios";

import Posts from "./Posts";

import AppContext from "../contexts/AppContext";
import { READ_POSTS, ROOT_URL } from "../actions";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

import EditProfile from "./EditProfile";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
    marginRight: 60,
  },
  editButton: {
    display: "inline-block",
  },
}));

const User = (props) => {
  const { state, dispatch } = useContext(AppContext);

  const classes = useStyles();

  // console.log("tes", props);

  //未実装__IDが受け取れない。useEffectでは第二引数にidをセット
  useEffect(() => {
    const f = async () => {
      const res = await axios.get(`${ROOT_URL}/post/1`);
      dispatch({ type: READ_POSTS, data: res.data });
    };
    f();
  }, [dispatch]);

  console.log();

  return (
    <>
      <div className="mainContent userProfile">
        {state.currentUser.image ? (
          <Avatar
            aria-label="recipe"
            src={state.currentUser.image}
            className={classes.large}
          />
        ) : (
          <Avatar
            aria-label="recipe"
            src="/images/defaultUser.png"
            className={classes.large}
          />
        )}
        <div className="profileContent">
          <div className="profileTop">
            <h2 className="profileName">{state.currentUser.name}</h2>
            <EditProfile />
          </div>
          <div>投稿{state.posts.length}件 フォロワーxx人　フォロー中xx人</div>
        </div>
      </div>

      <Posts />
    </>
  );
};

export default User;
