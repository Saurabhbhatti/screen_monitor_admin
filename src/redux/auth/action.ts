import { CHANGE_PASSWORD_BEGIN, FORGOT_PASSWORD_BEGIN, LOGIN_REQUEST_BEGIN, RESET_STATE } from "../constant";

export const resetState = () => ({
  type: RESET_STATE,
});

export const loginRequest = (payload: any) => ({
  type: LOGIN_REQUEST_BEGIN,
  payload,
});

export const forgotPasswordRequest = (payload: any) => ({
  type: FORGOT_PASSWORD_BEGIN,
  payload,
});

export const changePasswordRequest = (payload: any) => ({
  type: CHANGE_PASSWORD_BEGIN,
  payload,
});
