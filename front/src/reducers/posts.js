import { READ_POSTS } from "../actions";

const posts = (state = [], action) => {
  switch (action.type) {
    case READ_POSTS:
      return action.data;
    default:
      return state;
  }
};

export default posts;
