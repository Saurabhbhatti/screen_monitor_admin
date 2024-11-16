import {
  CHANGE_PASSWORD_BEGIN,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_BEGIN,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_REQUEST_BEGIN,
  LOGIN_REQUEST_ERROR,
  LOGIN_REQUEST_SUCCESS,
  RESET_STATE,
} from '../constant';

const initialState = {
  user: [],
  error: null,
  loading: false,
  isForgotPasswordSuccess: false,
  isSuccess: false,
  isChangePassword: false,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case RESET_STATE:
      return {
        ...state,
        loading: false,
        error: null,
        user: [],
        isSuccess: false,
        isChangePassword: false,
        isForgotPasswordSuccess: false,
      };
    case LOGIN_REQUEST_BEGIN:
      return {
        ...state,
        loading: true,
        isSuccess: false,
        error: null,
      };
    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        user: action?.payload?.data,
        error: null,
      };
    case LOGIN_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        error: action.payload,
      };
    case FORGOT_PASSWORD_BEGIN:
      return {
        ...state,
        loading: true,
        isForgotPasswordSuccess: false,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        user: action?.payload?.data,
        loading: false,
        isForgotPasswordSuccess: true,
        error: null,
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isForgotPasswordSuccess: false,
        user: [],
      };
    case CHANGE_PASSWORD_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        isChangePassword: false,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        isChangePassword: true,
      };
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isChangePassword: false,
        data: null,
      };
    default:
      return state;
  }
};

export default authReducer;
