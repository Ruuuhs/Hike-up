import { CREATE_USER, READ_USER, READ_USERS } from "../actions";

const users = (state = [], action) => {
  switch (action.type) {
    case CREATE_USER:
    case READ_USER:
    case READ_USERS:
      return action.data;
    default:
      return state;
  }
};

export default users;
