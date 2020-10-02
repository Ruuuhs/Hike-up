import { combineReducers } from "redux";

import users from "./users";
import posts from "./posts";
import login from "./login";
import currentUser from "./currentUser";
import loading from "./loading";

export default combineReducers({ users, posts, login, currentUser, loading });
