import {
  START_FETCH,
  FETCH_SUCCESS,
  ERROR_LOGIN,
  ERROR_SIGNUP,
  INPUT_EDIT,
  TOGGLE_MODE,
} from "../actions";

const login = (state = [], action) => {
  switch (action.type) {
    case START_FETCH: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case ERROR_LOGIN: {
      state.error = "メールアドレスかパスワードが間違っています";
      state.isLoading = false;
      return {
        ...state,
      };
    }
    case ERROR_SIGNUP: {
      state.error = "ユーザーを作成できませんでした";
      state.isLoading = false;
      return {
        ...state,
      };
    }
    case INPUT_EDIT: {
      return {
        ...state,
        [state.credentialSign]: action.payload,
        error: "",
      };
    }
    case TOGGLE_MODE: {
      return {
        ...state,
        isLoginView: !state.isLoginView,
      };
    }
    default:
      return state;
  }
};

export default login;
