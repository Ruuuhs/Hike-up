import React, { useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "../contexts/AppContext";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

import Posts from "./Posts";
import EditProfile from "./EditProfile";
import FollowList from "./FollowList";
import FollowBtn from "./FollowBtn";

import { READ_POSTS, ROOT_URL, TOKEN_KEY } from "../actions";

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

const User = () => {
  const { state, dispatch } = useContext(AppContext);
  const classes = useStyles();
  const [user, setUser] = React.useState("");
  const [following, setFollowing] = React.useState("");
  const [followers, setFollowers] = React.useState("");
  const [followersNum, setFollowersNum] = React.useState(followers.length);
  const [follow, setFollow] = React.useState("");
  const [followList, setFollowList] = React.useState("");

  const id = useLocation().pathname.slice(6);

  useEffect(() => {
    const f = async () => {
      const res = await axios.get(`${ROOT_URL}/personal/${id}`);
      dispatch({ type: READ_POSTS, data: JSON.parse(res.data.posts) });
      setUser(res.data.user);
      setFollowing(res.data.following);
      setFollowers(res.data.followers);
      setFollowersNum(res.data.followers.length);

      const res_current = await axios.get(`${ROOT_URL}/current`, {
        headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
      });
      setFollow(
        res.data.followers.find((x) => x.id === res_current.data.id) !==
          undefined
      );
    };
    f();
    return () => dispatch({ type: READ_POSTS, data: "loding" });
  }, [dispatch, id]);

  if (followList === "") {
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
              {state.currentUser.id === user.id ? (
                <EditProfile />
              ) : (
                <FollowBtn
                  id={user.id}
                  followersNum={followersNum}
                  setFollowersNum={setFollowersNum}
                  follow={follow}
                  setFollow={setFollow}
                />
              )}
            </div>
            <div>
              投稿{state.posts.length}件　
              <Link
                to="#"
                onClick={() => setFollowList("followers")}
                style={{ textDecoration: "none", color: "#2b2b2b" }}
              >
                フォロワー{followersNum}人　
              </Link>
              <Link
                to="#"
                onClick={() => setFollowList("following")}
                style={{ textDecoration: "none", color: "#2b2b2b" }}
              >
                フォロー中{following.length}人
              </Link>
            </div>
          </div>
        </div>

        <Posts />
      </>
    );
  } else {
    return (
      <FollowList
        followList={followList}
        setFollowList={setFollowList}
        following={following}
        followers={followers}
        user={user}
      />
    );
  }
};

export default User;
