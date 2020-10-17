import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import { START_ALERT } from "../actions";
const sizeLimit = 1024 * 1024 * 100; // 制限サイズ

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export default function AddImage({ setImage, setImageData, acceptType }) {
  const { dispatch } = useContext(AppContext);

  const classes = useStyles();

  const getImage = async (e) => {
    if (e.target.files[0].size > sizeLimit) {
      dispatch({
        type: START_ALERT,
        data: {
          message: "ファイルサイズは100MB以下にしてください",
          severity: "error",
        },
      });
      return; // この時点で処理を終了する
    }
    setImageData(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <div className={classes.root}>
        <input
          accept={acceptType}
          className={classes.input}
          id="icon-button-file"
          type="file"
          onChange={getImage}
        />
        <label htmlFor="icon-button-file">
          <IconButton
            color="secondary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
      </div>
    </>
  );
}
