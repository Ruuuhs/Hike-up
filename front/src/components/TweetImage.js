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
  image: {
    width: 230,
  },
}));

export default function TweetImage(props) {
  const classes = useStyles();
  const [image, setImage] = React.useState(null);

  const getImage = async (e) => {
    const imageData = await resizeImage(e);
    setImage(imageData.imageUri);
    props.setImage(imageData.imageUri);
  };

  return (
    <>
      <div>
        <img src={image} className={classes.image} alt="" />
      </div>
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
    </>
  );
}
