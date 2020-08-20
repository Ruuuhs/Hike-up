import { combineReducers } from "redux";

import users from "./users";
import posts from "./posts";
import login from "./login";

export default combineReducers({ users, posts, login });
