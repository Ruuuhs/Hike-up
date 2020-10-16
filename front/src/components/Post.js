import React, { useContext } from "react";
import ReactPlayer from "react-player";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
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
import { DELETE_POST, START_ALERT, TOKEN_KEY } from "../actions";
import axios from "axios";

import ShowPost from "./ShowPost";
import UserImage from "./UserImage";

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
  menuFont: {
    fontSize: 15,
    fontWeight: 30,
  },
  fontRed: {
    color: "red",
  },
}));

const Post = ({ post, current }) => {
  const { state, dispatch } = useContext(AppContext);
  const classes = useStyles();

  const isLike =
    post.likes.find((x) => x.user_id === state.currentUser.id) !== undefined;

  const isLikeId = isLike
    ? post.likes.find((x) => x.user_id === state.currentUser.id).id
    : false;

  const isBookmark =
    post.bookmarks.find((x) => x.user_id === state.currentUser.id) !==
    undefined;

  const isBookmarkId = isBookmark
    ? post.bookmarks.find((x) => x.user_id === state.currentUser.id).id
    : false;

  const [isExist, setIsExist] = React.useState(false);

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
        `${process.env.REACT_APP_API_URL}/like`,
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
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/like/${likeId}`,
        {
          headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
        }
      );
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
        `${process.env.REACT_APP_API_URL}/bookmark`,
        { post_id: post.id },
        {
          headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
        }
      );
      setBookmarkId(res.data.bookmark.id);
      console.log(res);
    } else {
      setBookmark(!bookmark);
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/bookmark/${bookmarkId}`,
        {
          headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
        }
      );
      setBookmarkId(false);
      console.log("destroy", res);
    }
  };

  //post menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const deletePost = async (event) => {
    event.preventDefault();
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/post/${post.id}`, {
        headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
      })
      .then((res) => {
        dispatch({ type: DELETE_POST, data: res });
        setIsExist(true);
        setAnchorEl(null);
        dispatch({
          type: START_ALERT,
          data: { message: "投稿を削除しました", severity: "success" },
        });
      })
      .catch((err) => {
        console.log("err:", err);
        dispatch({
          type: START_ALERT,
          data: { message: "削除にに失敗しました。", severity: "error" },
        });
      });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //show post
  const [open, setOpen] = React.useState(false);

  const handleOpen = async (event) => {
    event.preventDefault();
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/comment/${post.id}`,
      {
        headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
      }
    );
    setComments(res.data);
    setAnchorEl(null);
    setOpen(true);
  };

  const dt = new Date(post.created_at);
  const y = dt.getFullYear();
  const m = ("00" + (dt.getMonth() + 1)).slice(-2);
  const d = ("00" + dt.getDate()).slice(-2);
  const h = dt.getHours();
  const min = dt.getMinutes();
  const time = y + "/" + m + "/" + d + "・" + h + ":" + min;

  if (isExist === false) {
    return (
      <>
        <Card className={classes.root}>
          <CardHeader
            avatar={<UserImage user={post.user} />}
            action={
              <IconButton aria-label="settings" onClick={handleClick}>
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
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {state.currentUser.id === post.user.id && (
              <MenuItem
                className={classes.menuFont + " " + classes.fontRed}
                onClick={deletePost}
              >
                投稿を削除
              </MenuItem>
            )}
            <MenuItem className={classes.menuFont} onClick={handleOpen}>
              投稿へ移動
            </MenuItem>
            <MenuItem className={classes.menuFont} onClick={handleClose}>
              キャンセル
            </MenuItem>
          </Menu>

          {/* <ReactPlayer
            url="https://hike-up-bucket.s3-ap-northeast-1.amazonaws.com/post-video/test_movie.mov"
            controls
            width="600px"
          /> */}
          {post.image ? (
            <CardMedia className={classes.media} image={post.image} />
          ) : (
            <CardMedia className={classes.media} image={Background} />
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
  } else {
    return <></>;
  }
};

export default Post;
