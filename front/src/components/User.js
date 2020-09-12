import React, { useEffect, useContext } from "react";
import axios from "axios";

import Posts from "./Posts";

import AppContext from "../contexts/AppContext";
import { READ_POSTS, ROOT_URL } from "../actions";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

import EditProfile from "./EditProfile";
import FollowBtn from "./FollowBtn";

import { useLocation } from "react-router-dom";

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
  const [user, setUser] = React.useState("");

  const id = useLocation().pathname.slice(6);

  //未実装__IDが受け取れない。useEffectでは第二引数にidをセット
  useEffect(() => {
    const f = async () => {
      const res = await axios.get(`${ROOT_URL}/personal/${id}`);
      dispatch({ type: READ_POSTS, data: JSON.parse(res.data.posts) });
      setUser(res.data.user);
    };
    f();
  }, [dispatch, id]);

  return (
    <>
      <div className="mainContent userProfile">
        {user.image ? (
          <Avatar
            aria-label="recipe"
            src={user.image}
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
            <h2 className="profileName">{user.name}</h2>
            {state.currentUser.id === user.id ? <EditProfile /> : <FollowBtn />}
          </div>
          <div>投稿{state.posts.length}件 フォロワーxx人　フォロー中xx人</div>
        </div>
      </div>

      <Posts />
    </>
  );
};

export default User;
