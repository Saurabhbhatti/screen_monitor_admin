import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { handleApiError } from '../../utils';
import { UserApiResponse, UserRequestAction } from '../../utils/type';
import {
  ADD_USER_BEGIN,
  ADD_USER_ERROR,
  ADD_USER_SUCCESS,
  DELETE_USER_BEGIN,
  DELETE_USER_ERROR,
  DELETE_USER_SUCCESS,
  GET_ALL_USER_BEGIN,
  GET_ALL_USER_ERROR,
  GET_ALL_USER_SUCCESS,
  GET_USER_ROLE_BEGIN,
  GET_USER_ROLE_ERROR,
  GET_USER_ROLE_SUCCESS,
  GET_USERS_BEGIN,
  GET_USERS_ERROR,
  GET_USERS_SUCCESS,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
} from '../constant';
import {
  addUserApi,
  deleteUserApi,
  getAllUserApi,
  getUserApi,
  getUserRoleApi,
  updateUserApi,
} from '.';

export function* fetchUserData(action: UserRequestAction) {
  try {
    const response: UserApiResponse = yield call(getUserApi, action.payload);
    const { status, message, data, total } = response.data;
    if (status && status === true) {
      yield put({
        type: GET_USERS_SUCCESS,
        payload: { users: data, total },
      });
    }
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: GET_USERS_ERROR,
      payload: errorData,
    });
  }
}

export function* getUserRequest() {
  yield takeLatest(GET_USERS_BEGIN, fetchUserData);
}

export function* deleteUserData(action: UserRequestAction) {
  try {
    const data: UserApiResponse = yield call(deleteUserApi, action.payload);
    yield put({
      type: DELETE_USER_SUCCESS,
      payload: action.payload.id,
    });

    toast.success(data?.data?.message);
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: DELETE_USER_ERROR,
      payload: errorData,
    });
  }
}

export function* deleteUserRequest() {
  yield takeLatest(DELETE_USER_BEGIN, deleteUserData);
}

export function* addUserData(action: UserRequestAction) {
  try {
    const data: UserApiResponse = yield call(addUserApi, action.payload);
    yield put({
      type: ADD_USER_SUCCESS,
      payload: data,
    });
    toast.success(data?.data?.message);
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: ADD_USER_ERROR,
      payload: errorData,
    });
  }
}

export function* addUserRequest() {
  yield takeLatest(ADD_USER_BEGIN, addUserData);
}

export function* updateUserData(action: UserRequestAction) {
  try {
    const data: UserApiResponse = yield call(updateUserApi, action.payload);
    yield put({
      type: UPDATE_USER_SUCCESS,
      payload: data,
    });
    toast.success(data?.data?.message);
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: UPDATE_USER_ERROR,
      payload: errorData,
    });
  }
}

export function* updateUserRequest() {
  yield takeLatest(UPDATE_USER_BEGIN, updateUserData);
}

function* fetchAllUserData() {
  try {
    const response: UserApiResponse = yield call(getAllUserApi);
    const { status } = response?.data;
    if (status && status === true) {
      yield put({
        type: GET_ALL_USER_SUCCESS,
        payload: response?.data,
      });
    }
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: GET_ALL_USER_ERROR,
      payload: errorData,
    });
  }
}

export function* getAllUserRequest() {
  yield takeLatest(GET_ALL_USER_BEGIN, fetchAllUserData);
}

function* fetchUserRoleData() {
  try {
    const response: UserApiResponse = yield call(getUserRoleApi);
    const { status } = response?.data;
    if (status && status === true) {
      yield put({
        type: GET_USER_ROLE_SUCCESS,
        payload: response?.data,
      });
    }
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: GET_USER_ROLE_ERROR,
      payload: errorData,
    });
  }
}

export function* getUserRoleRequest() {
  yield takeLatest(GET_USER_ROLE_BEGIN, fetchUserRoleData);
}
