import { combineReducers } from "redux";

import users from "./users";
import posts from "./posts";
import login from "./login";
import currentUser from "./currentUser";
import loading from "./loading";
import notification from "./notification";

export default combineReducers({
  users,
  posts,
  login,
  currentUser,
  notification,
  loading,
});
