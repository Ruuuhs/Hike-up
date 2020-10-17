import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import { resizeImage } from "./resizeImage";

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
  const classes = useStyles();

  const getImage = async (e) => {
    // const imageData = await resizeImage(e);
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
