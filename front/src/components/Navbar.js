import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import HomeIcon from "@material-ui/icons/Home";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import NotificationsIcon from "@material-ui/icons/Notifications";
import TelegramIcon from "@material-ui/icons/Telegram";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { Link } from "react-router-dom";
import { TOKEN_KEY } from "../actions";

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  headerLogo: {
    display: "flex",
    height: 48,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  const logout = async () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/login";
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link to="/">
            <Typography variant="h6" noWrap>
              <img
                src="/images/Hike_up_logo_text.png"
                alt="logo_hike_up"
                className={classes.headerLogo}
              />
            </Typography>
          </Link>
          <button className="logout" onClick={logout}>
            <ExitToAppIcon />
          </button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button key="ホーム">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="ホーム" />
            </ListItem>
            <ListItem button key="全投稿">
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="全投稿" />
            </ListItem>
            <ListItem button key="トレンド">
              <ListItemIcon>
                <TrendingUpIcon />
              </ListItemIcon>
              <ListItemText primary="トレンド" />
            </ListItem>
            <ListItem button key="ブックマーク">
              <ListItemIcon>
                <TurnedInIcon />
              </ListItemIcon>
              <ListItemText primary="ブックマーク" />
            </ListItem>
            <ListItem button key="通知">
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="通知" />
            </ListItem>
            <ListItem button key="ダイレクトメッセージ">
              <ListItemIcon>
                <TelegramIcon />
              </ListItemIcon>
              <ListItemText primary="ダイレクトメッセージ" />
            </ListItem>
            <ListItem button key="投稿">
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="投稿" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}
