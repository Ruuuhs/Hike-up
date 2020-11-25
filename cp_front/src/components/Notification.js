import React, { useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import AppContext from "../contexts/AppContext";
import { FINISH_ALERT } from "../actions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Notification() {
  const { state, dispatch } = useContext(AppContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({ type: FINISH_ALERT });
  };

  return (
    <Snackbar
      open={state.notification.isAlert}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={state.notification.severity}>
        {state.notification.message}
      </Alert>
    </Snackbar>
  );
}
