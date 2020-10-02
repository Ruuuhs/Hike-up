import { START_LOADING, FINISH_LOADING } from "../actions";

const users = (state = [], action) => {
  switch (action.type) {
    case START_LOADING:
      return true;
    case FINISH_LOADING:
      return false;
    default:
      return state;
  }
};

export default users;
