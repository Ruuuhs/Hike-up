import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TextsmsOutlinedIcon from "@material-ui/icons/TextsmsOutlined";
// import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";

import Background from "../Switzerland.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    minWidth: 600,
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: 60,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  like_button: {
    color: "#f73d6c",
  },
  bookmark_button: {
    marginLeft: "auto",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Post = ({ post }) => {
  const classes = useStyles();
  const [like, setLike] = React.useState(false);
  const [bookmark, setBookmark] = React.useState(false);

  const handleLikeClick = () => {
    setLike(!like);
  };
  const handleBookmarkClick = () => {
    setBookmark(!bookmark);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          post.user.image ? (
            <Avatar
              aria-label="recipe"
              src={post.user.image}
              component={Link}
              to={`/user/${post.user.id}`}
            />
          ) : (
            <Avatar
              aria-label="recipe"
              src="/images/defaultUser.png"
              component={Link}
              to={`/user/${post.user.id}`}
            />
          )
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Link
            to={`/user/${post.user.id}`}
            style={{ textDecoration: "none", color: "#2b2b2b" }}
          >
            {post.user.name}
          </Link>
        }
        subheader={post.created_at}
      />
      {post.image ? (
        <CardMedia className={classes.media} image={post.image} />
      ) : (
        <CardMedia className={classes.media} image={Background} />
        // <CircularProgress />
      )}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleLikeClick} aria-label="add to favorites">
          {like ? (
            <FavoriteIcon className={classes.like_button} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <IconButton aria-label="add to favorites">
          <TextsmsOutlinedIcon />
        </IconButton>
        <IconButton
          onClick={handleBookmarkClick}
          className={classes.bookmark_button}
          aria-label="add to bookmarks"
        >
          {bookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
