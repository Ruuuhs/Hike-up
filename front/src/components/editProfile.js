import React, { useState, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../contexts/AppContext";
import Badge from "@material-ui/core/Badge";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import AddImage from "./AddImage";
import UploadS3 from "./UploadS3";
import CropImage from "./CropImage";
import { TOKEN_KEY, CURRENT_USER, START_ALERT } from "../actions";

const useStyles = makeStyles((theme) => ({
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
  logout: {
    marginLeft: 15,
    color: "#ff5e5e",
    border: "1px solid #ff5e5e",
  },
}));

export default function EditProfile() {
  const classes = useStyles();
  const { state, dispatch } = useContext(AppContext);

  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [encodedData, setEncodedData] = useState("");
  const [ext, setExt] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    setName(state.currentUser.name);
    setEmail(state.currentUser.email);
    setImage(state.currentUser.image);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = async () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/login";
  };

  const editSubmit = async (event) => {
    event.preventDefault();
    const params = { name: name, email: email };

    if (encodedData !== "") {
      const file = {
        dir: "user-image/",
        id: state.currentUser.id,
      };
      const url = await UploadS3(encodedData, ext, file);
      params["image"] = url;
      console.log(url);
    }
    await axios
      .put(`${process.env.REACT_APP_API_URL}/auth`, params, {
        headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
      })
      .then((res) => {
        dispatch({ type: CURRENT_USER, data: res.data.data });
        window.location.reload();
      })
      .catch((err) => {
        console.log("err:", err);
        dispatch({
          type: START_ALERT,
          data: { message: "編集に失敗しました", severity: "error" },
        });
      });
  };

  const unCreatable =
    name === "" || name.length > 20 || email === "" || email.length > 50;

  return (
    <>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        プロフィールを編集
      </Button>
      <Button
        className={classes.logout}
        variant="outlined"
        color="default"
        onClick={logout}
      >
        ログアウト
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form className={classes.form} onSubmit={editSubmit}>
          <DialogContent>
            <CropImage
              setEncodedData={setEncodedData}
              setExt={setExt}
              circular={true}
            />
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="secondary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              }
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
