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
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import AddIcon from "@material-ui/icons/Add";

import UploadS3 from "./UploadS3";
import CropImage from "./CropImage";

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
  const { dispatch } = useContext(AppContext);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [context, setContext] = useState("");

  const [encodedData, setEncodedData] = useState("");
  const [ext, setExt] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setContext("");
    setEncodedData("");
  };

  const createPost = async (event) => {
    event.preventDefault();

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/post`,
        { content: context, image: ext },
        {
          headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
        }
      )
      .then((res) => {
        const params = {
          dir: "post-video/",
          id: res.data.id, //post.id
        };
        UploadS3(encodedData, ext, params);
        dispatch({
          type: START_ALERT,
          data: { message: "投稿しました。", severity: "success" },
        });
        // window.location.href = "/";
        handleClose();
      })
      .catch((err) => {
        console.log("err:", err);
        dispatch({
          type: START_ALERT,
          data: { message: "投稿に失敗しました。", severity: "error" },
        });
      });
  };

  const unCreatable =
    context === "" || context.length > 140 || encodedData === "";

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
          <CropImage setEncodedData={setEncodedData} setExt={setExt} />
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
            <label htmlFor="icon-button-file">
              <IconButton
                color="secondary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
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
