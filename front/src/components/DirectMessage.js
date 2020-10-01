import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TelegramIcon from "@material-ui/icons/Telegram";
import Avatar from "@material-ui/core/Avatar";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";

import { ROOT_URL, TOKEN_KEY } from "../actions";

import DmNewUser from "./DmNewUser";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "90%",
    border: "1px solid lightgray",
    maxWidth: 900,
    minWidth: 600,
    maxHeight: 600,
    minHeight: 400,
    marginRight: "auto",
    marginLeft: "auto",
  },
  header: {
    width: 250,
    borderBottom: `1px solid lightgray`,
    fontSize: 18,
    textAlign: "center",
  },
  tabs: {
    width: 250,
    borderRight: `1px solid lightgray`,
  },
  dmUserList: {
    height: "90%",
    overflow: "auto",
  },
  dmNew: {
    width: "100%",
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  newMessage: {
    color: "gray",
    marginBottom: 20,
  },
  dmWrapper: {
    flexDirection: "column",
    width: "100%",
    position: "relative",
  },
  dmHeader: {
    height: 49,
    display: "flex",
    verticalAlign: "middle",
    padding: "5px 10px",
    borderBottom: `1px solid lightgray`,
  },
  noneDm: {
    textAlign: "center",
    fontSize: "18px",
    marginTop: 30,
  },
  dmHeaderUser: {
    lineHeight: "40px",
    marginLeft: 15,
  },
  messages: {
    height: "75%",
    overflow: "auto",
  },
  myMessage: {
    backgroundColor: "#f0f0f0",
    textAlign: "right",
    marginLeft: "auto",
    flex: "none",
    maxWidth: 300,
    borderRadius: 10,
    padding: "5px 10px",
  },
  otherMessage: {
    border: `1px solid lightgray`,
    flex: "none",
    maxWidth: 300,
    borderRadius: 10,
    padding: "5px 10px",
  },
  formDm: {
    border: `1px solid lightgray`,
    width: "90%",
    borderRadius: 20,
    margin: "10px 15px",
    padding: "0 10px",
    position: "absolute",
    bottom: 0,
  },
  commentInput: {
    width: "80%",
  },
  dmSubmit: {
    float: "right",
  },
}));

export default function DirectMessage() {
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [rooms, setRooms] = React.useState([]);
  const [CurrentUser, setCurrentUser] = React.useState("");
  const [room, setRoom] = React.useState([]);
  const [context, setContext] = useState("");

  useEffect(() => {
    const f = async () => {
      const res = await axios.get(`${ROOT_URL}/room`, {
        headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
      });
      setCurrentUser(res.data[0].current_user);
      const Rooms = JSON.parse(res.data[0].rooms);

      Rooms.map((t, index) => {
        Rooms[index].otherUser = t.users.find((user) => {
          return user.id !== res.data[0].current_user.id;
        });
      });
      setRooms(Rooms);
    };
    f();
  }, []);

  const handleListItemClick = (event, room) => {
    event.preventDefault();
    if (room === 0) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(room.id);
      setRoom(room);
    }
  };

  const createMessage = async (event) => {
    event.preventDefault();
    const res = await axios.post(
      `${ROOT_URL}/message`,
      { content: context, room_id: room.id },
      {
        headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
      }
    );
    const newRoom = { ...room, messages: room.messages.concat(res.data) };
    const isEq = (element) => element.id === newRoom.id;

    rooms.splice(rooms.findIndex(isEq), 1, newRoom);
    setRoom((room) => newRoom);
    setContext("");
    const textareaForm = document.getElementById("comment");
    textareaForm.value = "";
  };

  const unCreatable = context === "" || context.length > 140;

  return (
    <div className={classes.root}>
      <div className={classes.tabs}>
        <div className={classes.header}>
          <a>Direct</a>
          <IconButton
            className={classes.messageBtn}
            color="primary"
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <TelegramIcon />
          </IconButton>
        </div>
        <List className={classes.dmUserList}>
          {rooms.map((list_room) => (
            <ListItem
              button
              selected={selectedIndex === list_room.id}
              key={list_room.id}
              onClick={(event) => handleListItemClick(event, list_room)}
            >
              <ListItemIcon>
                {list_room.otherUser.image ? (
                  <Avatar aria-label="recipe" src={list_room.otherUser.image} />
                ) : (
                  <Avatar aria-label="recipe" src="/images/defaultUser.png" />
                )}
              </ListItemIcon>
              <ListItemText primary={list_room.otherUser.name} />
            </ListItem>
          ))}
        </List>
      </div>

      {selectedIndex === 0 ? (
        <div className={classes.dmNew}>
          <div>
            <EmailOutlinedIcon style={{ fontSize: 60, color: "gray" }} />
            <Typography variant="h5" gutterBottom>
              メッセージ
            </Typography>
            <Typography
              className={classes.newMessage}
              variant="body2"
              gutterBottom
            >
              フォローしている友達にメッセージを送信できます
            </Typography>
            <DmNewUser setRooms={setRooms} rooms={rooms} />
          </div>
        </div>
      ) : (
        <div className={classes.dmWrapper}>
          <div className={classes.dmHeader}>
            {room.otherUser.image ? (
              <Avatar aria-label="recipe" src={room.otherUser.image} />
            ) : (
              <Avatar aria-label="recipe" src="/images/defaultUser.png" />
            )}
            <Typography variant="body1" className={classes.dmHeaderUser}>
              {room.otherUser.name}
            </Typography>
          </div>
          {room.messages.length === 0 ? (
            <div className={classes.noneDm}>メッセージはありません</div>
          ) : (
            <List className={classes.messages} aria-label="dm">
              {room.messages.map((message) => (
                <ListItem key={message.id}>
                  {message.user_id === CurrentUser.id ? (
                    <ListItemText
                      className={classes.myMessage}
                      primary={message.content}
                    />
                  ) : (
                    <ListItemText
                      className={classes.otherMessage}
                      primary={message.content}
                    />
                  )}
                </ListItem>
              ))}
            </List>
          )}

          <form className={classes.formDm} onSubmit={createMessage}>
            <InputBase
              className={classes.commentInput}
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
              className={classes.dmSubmit}
              color="secondary"
              disabled={unCreatable}
            >
              投稿する
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
