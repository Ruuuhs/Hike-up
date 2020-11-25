import { READ_POSTS, ADD_POSTS, DELETE_POST } from "../actions";

const posts = (state = [], action) => {
  switch (action.type) {
    case READ_POSTS:
      return action.data;
    case ADD_POSTS:
      return state.concat(action.data);
    case DELETE_POST:
      const rmIndex = state.findIndex(
        (element) => element.id === action.data.data.id
      );
      state.splice(rmIndex, 1);
      return state;
    default:
      return state;
  }
};

export default posts;
