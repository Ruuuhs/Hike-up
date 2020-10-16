import React, { useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import AppContext from "../contexts/AppContext";
import { TOKEN_KEY } from "../actions";

import UserImage from "./UserImage";

const useStyles = makeStyles((theme) => ({
  title: {
    borderBottom: `1px solid lightgray`,
    padding: "5px 10px",
    textAlign: "center",
  },
  submit: {
    float: "right",
  },
  margin: {
    float: "left",
  },
}));

export default function DmNewUser({ setRooms, rooms }) {
  const context = useContext(AppContext);
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState("");
  const [following, setFollowing] = React.useState([]);

  const handleClickOpen = async (event) => {
    event.preventDefault();
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/personal/${context.state.currentUser.id}`
    );
    setFollowing(res.data.following);
    setOpen(true);
  };

  const createRoom = async (event) => {
    event.preventDefault();
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/room`,
      { user_id: selectedUser },
      {
        headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
      }
    );
    res.data.otherUser = res.data.users.find((user) => {
      return user.id !== context.state.currentUser.id;
    });
    setRooms(rooms.concat(res.data));
    setOpen(false);
    setSelectedUser("");
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser("");
  };

  const handleListItemClick = (value) => {
    setSelectedUser(value);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        メッセージを送信
      </Button>
      <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="xs">
        <DialogTitle id="simple-dialog-title" className={classes.title}>
          <IconButton
            aria-label="delete"
            className={classes.margin}
            size="small"
            onClick={handleClose}
          >
            <ClearIcon />
          </IconButton>
          新規メッセージ
          <Button
            type="submit"
            className={classes.submit}
            color="secondary"
            disabled={selectedUser === ""}
            onClick={createRoom}
          >
            送信する
          </Button>
        </DialogTitle>
        <List>
          {following.map((user) => (
            <ListItem
              button
              onClick={() => handleListItemClick(user.id)}
              key={user.id}
              selected={selectedUser === user.id}
            >
              <ListItemAvatar>
                <UserImage user={user} />
              </ListItemAvatar>
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
}
