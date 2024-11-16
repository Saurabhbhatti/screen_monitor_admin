import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchProfileApi, updateProfileApi } from '.';
import { handleApiError } from '../../utils';
import {
  ProfileData,
  UpdateProfileRequestAction,
} from '../../utils/types/profile';
import {
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from '../constant';
import { toast } from 'react-toastify';

export function* fetchProfileSaga() {
  try {
    const response: { data: ProfileData } = yield call(fetchProfileApi);
    yield put({ type: FETCH_PROFILE_SUCCESS, payload: response.data });
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({ type: FETCH_PROFILE_FAILURE, payload: errorData });
  }
}

export function* updateProfileSaga(action: UpdateProfileRequestAction) {
  try {
    const response: { data: ProfileData } = yield call(
      updateProfileApi,
      action.payload
    );
    yield put({ type: UPDATE_PROFILE_SUCCESS, payload: response.data });
    toast.success(response?.data?.message);
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: UPDATE_PROFILE_FAILURE,
      payload: errorData,
    });
  }
}

export function* watchFetchProfile() {
  yield takeLatest(FETCH_PROFILE_REQUEST, fetchProfileSaga);
  yield takeLatest(UPDATE_PROFILE_REQUEST, updateProfileSaga);
}
