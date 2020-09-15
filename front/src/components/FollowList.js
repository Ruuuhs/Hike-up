import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import ListUser from "./ListUser";

import axios from "axios";
import { ROOT_URL, TOKEN_KEY } from "../actions";

const FollowList = (props) => {
  const [value, setValue] = React.useState(props.followList);
  const [follow, setFollow] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="mainContent followList">
      <div>
        <IconButton
          onClick={() => props.setFollowList("")}
          aria-label="back user page"
        >
          <ArrowBackIcon />
        </IconButton>
        <font size="4">{props.user.name}</font>
      </div>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="follow list tabs"
        >
          <Tab value={"followers"} label="フォロワー" />
          <Tab value={"following"} label="フォロー中" />
        </Tabs>
      </Paper>
      <List>
        {value === "followers"
          ? props.followers.map((user) => (
              <ListUser key={user.id} user={user} />
            ))
          : props.following.map((user) => (
              <ListUser key={user.id} user={user} />
            ))}
      </List>
    </div>
  );
};

export default FollowList;
