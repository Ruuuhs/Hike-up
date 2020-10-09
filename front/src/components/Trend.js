import React, { useEffect, useContext } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

import AppContext from "../contexts/AppContext";

import Posts from "./Posts";
import { READ_POSTS, ROOT_URL, TOKEN_KEY } from "../actions";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginRight: 10,
    color: "#cfd8dc",
  },
  tab: {
    backgroundColor: "transparent",
  },
}));

const All = () => {
  const { dispatch } = useContext(AppContext);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const f = async () => {
      const res = await axios.get(`${ROOT_URL}/trend/daily`, {
        headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
      });
      dispatch({ type: READ_POSTS, data: res.data });
    };
    f();

    return () => dispatch({ type: READ_POSTS, data: "loding" });
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const daily = async (event) => {
    event.preventDefault();
    dispatch({ type: READ_POSTS, data: "loding" });
    const res = await axios.get(`${ROOT_URL}/trend/daily`, {
      headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
    });
    dispatch({ type: READ_POSTS, data: res.data });
  };

  const weekly = async (event) => {
    event.preventDefault();
    dispatch({ type: READ_POSTS, data: "loding" });
    const res = await axios.get(`${ROOT_URL}/trend/weekly`, {
      headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
    });
    dispatch({ type: READ_POSTS, data: res.data });
  };

  const monthly = async (event) => {
    event.preventDefault();
    dispatch({ type: READ_POSTS, data: "loding" });
    const res = await axios.get(`${ROOT_URL}/trend/monthly`, {
      headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
    });
    dispatch({ type: READ_POSTS, data: res.data });
  };

  const all = async (event) => {
    event.preventDefault();
    dispatch({ type: READ_POSTS, data: "loding" });
    const res = await axios.get(`${ROOT_URL}/trend/all`, {
      headers: JSON.parse(localStorage.getItem(TOKEN_KEY)),
    });
    dispatch({ type: READ_POSTS, data: res.data });
  };

  return (
    <>
      <div className="mainContent trendTop">
        <div className="trendTopper">
          <TrendingUpIcon className={classes.large} />
          <h2 className="pageName">トレンド</h2>
        </div>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="1日" onClick={daily} />
          <Tab label="週間" onClick={weekly} />
          <Tab label="月間" onClick={monthly} />
          <Tab label="全期間" onClick={all} />
        </Tabs>
      </div>

      <Posts />
    </>
  );
};

export default All;
