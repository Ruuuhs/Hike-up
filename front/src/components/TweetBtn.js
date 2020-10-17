import React, { useState, useContext } from "react";
import axios from "axios";
import AppContext from "../contexts/AppContext";
import { makeStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import AddIcon from "@material-ui/icons/Add";

import AddImage from "./AddImage";
import UploadS3 from "./UploadS3";

import { START_ALERT, TOKEN_KEY } from "../actions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    width: 500, // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  image: {
    marginLeft: 50,
    width: 400,
  },
}));

export default function TweetBtn() {
  const { state, dispatch } = useContext(AppContext);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [context, setContext] = useState("");
  const [image, setImage] = useState("");
  const [imageData, setImageData] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setContext("");
    setImage("");
  };

  const createPost = async (event) => {
    event.preventDefault();
    const params = {
      dir: "post-video/",
      id: state.currentUser.id,
    };
    const url = await UploadS3(imageData, params);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/post`,
        { content: context, image: url },
        {
          headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
        }
      )
      .then(() => {
        window.location.href = "/";
        dispatch({
          type: START_ALERT,
          data: { message: "投稿しました。", severity: "success" },
        });
      })
      .catch((err) => {
        console.log("err:", err);
        dispatch({
          type: START_ALERT,
          data: { message: "投稿に失敗しました。", severity: "error" },
        });
      });
  };

  const unCreatable = context === "" || context.length > 140 || image === "";

  return (
    <>
      <ListItem button onClick={handleOpen} key="投稿">
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="投稿" />
      </ListItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form className={classes.form} onSubmit={createPost}>
          <div>
            <img src={image} className={classes.image} alt="" />
          </div>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Context"
              multiline
              fullWidth
              rows={6}
              onChange={(e) => setContext(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <AddImage
              setImage={setImage}
              setImageData={setImageData}
              acceptType="*"
            />
            <Button onClick={handleClose} color="primary">
              キャンセル
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={unCreatable}
            >
              投稿
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
