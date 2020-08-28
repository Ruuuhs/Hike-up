import { combineReducers } from "redux";

import users from "./users";
import posts from "./posts";
import login from "./login";
import currentUser from "./currentUser";

export default combineReducers({ users, posts, login, currentUser });
