import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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

export default function UploadButtons() {
  const classes = useStyles();
  const [image, setImage] = React.useState(null);

  const getImage = async (e) => {
    const { imageFile, imageUri } = await resizeImage(e);
    console.log(imageUri);
    setImage(imageUri);
  };

  return (
    <>
      <div className={classes.root}>
        <input
          accept="image/*"
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
      <div>
        <img src={image} />
      </div>
    </>
  );
}
