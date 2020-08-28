import { CURRENT_USER } from "../actions";

const users = (state = [], action) => {
  switch (action.type) {
    case CURRENT_USER:
      return action.data;
    default:
      return state;
  }
};

export default users;
