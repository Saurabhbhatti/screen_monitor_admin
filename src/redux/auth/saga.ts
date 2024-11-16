import { call, put, takeLatest } from 'redux-saga/effects';
import { changePassword, forgotPasswordApi, loginApi } from '.';
import { ChangePassowrdApiResponse, ChangePasswordRequestAction, ForgotApiResponse, ForgotRequestAction, LoginApiResponse, LoginRequestAction } from '../../utils/type';
import { toast } from 'react-toastify';
import { handleApiError, setLocalStorageData } from '../../utils';
import {
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_BEGIN,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_REQUEST_BEGIN,
  LOGIN_REQUEST_ERROR,
  LOGIN_REQUEST_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_BEGIN
} from '../constant';

export function* fetchLoginData(action: LoginRequestAction) {
  try {
    const data: LoginApiResponse = yield call(loginApi, action.payload);
    yield put({
      type: LOGIN_REQUEST_SUCCESS,
      payload: data,
    });
    const token = data?.data?.data?.token;
    const userRole = data?.data?.data?.role;
    setLocalStorageData('userToken', token)
    setLocalStorageData('userRole', userRole)
    toast.success('Login Successfully');
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: LOGIN_REQUEST_ERROR,
      payload: errorData,
    });
  }
}

export function* LoginRequest() {
  yield takeLatest(LOGIN_REQUEST_BEGIN, fetchLoginData);
}

export function* forgotPassword(action: ForgotRequestAction) {
  try {
    const data: ForgotApiResponse = yield call(
      forgotPasswordApi,
      action.payload,
    );
    yield put({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });
    toast.success(data?.data?.message);
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: FORGOT_PASSWORD_ERROR,
      payload: errorData,
    });
  }
}

export function* forgotPasswordRequest() {
  yield takeLatest(FORGOT_PASSWORD_BEGIN, forgotPassword);
}

export function* changePasswordData(action: ChangePasswordRequestAction) {
  try {
    const data: ChangePassowrdApiResponse = yield call(changePassword, action.payload);
    yield put({
      type: CHANGE_PASSWORD_SUCCESS,
      payload: data,
    });
    toast.success(data?.data?.message);
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: CHANGE_PASSWORD_ERROR,
      payload: errorData,
    });
  }
}

export function* changePasswordRequest() {
  yield takeLatest(CHANGE_PASSWORD_BEGIN, changePasswordData);
}