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
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}));

export default function EditProfile() {
  const classes = useStyles();
  const { state, dispatch } = useContext(AppContext);

  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    setName(state.currentUser.name);
    setEmail(state.currentUser.email);
    setImage(state.currentUser.image);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createPost = async (event) => {
    event.preventDefault();
    console.log(image);
    const res = await axios.put(
      `${ROOT_URL}/auth`,
      { name: name, email: email, image: image },
      {
        headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
      }
    );
    dispatch({ type: CURRENT_USER, data: res.data.data });
    window.location.reload();
  };

  const unCreatable =
    name === "" || name.length > 20 || email === "" || email.length > 50;

  return (
    <>
      <Button variant="outlined" color="default" onClick={handleClickOpen}>
        プロフィールを編集
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form className={classes.form} onSubmit={createPost}>
          <DialogContent>
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={<AddImage setImage={setImage} />}
            >
              {image ? (
                <Avatar
                  aria-label="recipe"
                  src={image}
                  className={classes.large}
                />
              ) : (
                <Avatar
                  aria-label="recipe"
                  src="/images/defaultUser.png"
                  className={classes.large}
                />
              )}
            </Badge>

            <TextField
              autoFocus
              margin="dense"
              label="名前"
              fullWidth
              rows={6}
              variant="outlined"
              defaultValue={state.currentUser.name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="メールアドレス"
              fullWidth
              rows={6}
              variant="outlined"
              defaultValue={state.currentUser.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              キャンセル
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={unCreatable}
            >
              決定
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
