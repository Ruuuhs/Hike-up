import { START_ALERT, FINISH_ALERT } from "../actions";

const notification = (state = [], action) => {
  switch (action.type) {
    case START_ALERT:
      state.isAlert = true;
      state.message = action.data.message;
      state.severity = action.data.severity;
      return {
        ...state,
      };
    case FINISH_ALERT:
      state.isAlert = false;
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default notification;
