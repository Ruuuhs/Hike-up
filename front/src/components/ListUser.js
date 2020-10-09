import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import axios from "axios";
import { ROOT_URL, TOKEN_KEY } from "../actions";

const useStyles = makeStyles((theme) => ({
  user: {
    borderBottom: "1px solid lightgray",
  },
}));

const ListUser = (props) => {
  const classes = useStyles();
  const { state } = useContext(AppContext);

  const isFollow =
    state.currentUser.active_relationships.find(
      (x) => x.followed_id === props.user.id
    ) !== undefined;
  const [follow, setFollow] = React.useState(isFollow);

  const handleLikeClick = async (event) => {
    event.preventDefault();
    if (!follow) {
      setFollow(!props.follow);
      const res = await axios.post(
        `${ROOT_URL}/relationship`,
        { followed_id: props.user.id },
        {
          headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
        }
      );
      console.log(res);
    } else {
      setFollow(!follow);
      const res = await axios.delete(
        `${ROOT_URL}/relationship/${props.user.id}`,
        {
          headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
        }
      );
      console.log("destroy", res);
    }
  };

  return (
    <ListItem className={classes.user}>
      <ListItemAvatar>
        <Avatar aria-label="recipe" src="/images/defaultUser.png" />
      </ListItemAvatar>
      <ListItemText primary={props.user.name} />
      {follow ? (
        <Button variant="contained" color="secondary" onClick={handleLikeClick}>
          フォロー中
        </Button>
      ) : (
        <Button variant="outlined" color="secondary" onClick={handleLikeClick}>
          フォロー
        </Button>
      )}
    </ListItem>
  );
};

export default ListUser;
