import React, { useContext } from "react";
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

import { Link } from "react-router-dom";

import AppContext from "../contexts/AppContext";
import { ROOT_URL, TOKEN_KEY } from "../actions";
import axios from "axios";

import Background from "../Switzerland.jpg";
import ShowPost from "./ShowPost";

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

const Post = ({ post, current }) => {
  const classes = useStyles();
  const context = useContext(AppContext);

  const isLike =
    post.likes.find((x) => x.user_id === context.state.currentUser.id) !==
    undefined;

  const isLikeId = isLike
    ? post.likes.find((x) => x.user_id === context.state.currentUser.id).id
    : false;

  const isBookmark =
    post.bookmarks.find((x) => x.user_id === context.state.currentUser.id) !==
    undefined;

  const isBookmarkId = isBookmark
    ? post.bookmarks.find((x) => x.user_id === context.state.currentUser.id).id
    : false;

  const [like, setLike] = React.useState(isLike);
  const [likeId, setLikeId] = React.useState(isLikeId);
  const [likeNum, setLikeNum] = React.useState(post.likes.length);
  const [bookmark, setBookmark] = React.useState(isBookmark);
  const [bookmarkId, setBookmarkId] = React.useState(isBookmarkId);
  const [comments, setComments] = React.useState([]);
  const [commentNum, setCommentNum] = React.useState(post.comments.length);

  const handleLikeClick = async (event) => {
    event.preventDefault();
    if (!like) {
      setLike(!like);
      const res = await axios.post(
        `${ROOT_URL}/like`,
        { post_id: post.id },
        {
          headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
        }
      );
      setLikeId(res.data.like.id);
      setLikeNum(likeNum + 1);
      console.log(res);
    } else {
      setLike(!like);
      const res = await axios.delete(`${ROOT_URL}/like/${likeId}`, {
        headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
      });
      setLikeId(false);
      setLikeNum(likeNum - 1);
      console.log("destroy", res);
    }
  };

  const handleBookmarkClick = async (event) => {
    event.preventDefault();
    if (!bookmark) {
      setBookmark(!bookmark);
      const res = await axios.post(
        `${ROOT_URL}/bookmark`,
        { post_id: post.id },
        {
          headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
        }
      );
      setBookmarkId(res.data.bookmark.id);
      console.log(res);
    } else {
      setBookmark(!bookmark);
      const res = await axios.delete(`${ROOT_URL}/bookmark/${bookmarkId}`, {
        headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
      });
      setBookmarkId(false);
      console.log("destroy", res);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = async (event) => {
    event.preventDefault();
    const res = await axios.get(`${ROOT_URL}/comment/${post.id}`, {
      headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
    });
    setComments(res.data);
    setOpen(true);
  };

  const dt = new Date(post.created_at);
  const y = dt.getFullYear();
  const m = ("00" + (dt.getMonth() + 1)).slice(-2);
  const d = ("00" + dt.getDate()).slice(-2);
  const h = dt.getHours();
  const min = dt.getMinutes();
  const time = y + "/" + m + "/" + d + "・" + h + ":" + min;

  return (
    <>
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
          subheader={time}
        />

        {post.image ? (
          <CardMedia className={classes.media} image={post.image} />
        ) : (
          <CardMedia className={classes.media} image={Background} />
          // <CircularProgress />
        )}

        <CardContent onClick={handleOpen}>
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
          <Typography variant="body2" color="textSecondary" component="p">
            {likeNum}
          </Typography>
          <IconButton onClick={handleOpen} aria-label="add to favorites">
            <TextsmsOutlinedIcon />
          </IconButton>
          <Typography variant="body2" color="textSecondary" component="p">
            {commentNum}
          </Typography>
          <IconButton
            onClick={handleBookmarkClick}
            className={classes.bookmark_button}
            aria-label="add to bookmarks"
          >
            {bookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </CardActions>
        <ShowPost
          post={post}
          setOpen={setOpen}
          open={open}
          setComments={setComments}
          comments={comments}
          setCommentNum={setCommentNum}
          commentNum={commentNum}
        />
      </Card>
    </>
  );
};

export default Post;
