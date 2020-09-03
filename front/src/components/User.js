import React, { useEffect, useContext } from "react";
import axios from "axios";

import Posts from "./Posts";

import AppContext from "../contexts/AppContext";
import { READ_POSTS, ROOT_URL } from "../actions";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  console.log("tes", props);

  //未実装__IDが受け取れない。useEffectでは第二引数にidをセット
  useEffect(() => {
    const f = async () => {
      const res = await axios.get(`${ROOT_URL}/post/1`);
      dispatch({ type: READ_POSTS, data: res.data });
    };
    f();
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <div>
            <h2 className="profileName">{state.currentUser.name}</h2>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
              className={classes.editButton}
            >
              Open form dialog
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To subscribe to this website, please enter your email address
                  here. We will send updates occasionally.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                  Subscribe
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div>投稿xx件 フォロワーxx人　フォロー中xx人</div>
        </div>
      </div>

      <Posts />
    </>
  );
};

export default User;
