import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_EXISTING_LEAVE_REQUEST,
  FETCH_EXISTING_LEAVE_SUCCESS,
  FETCH_EXISTING_LEAVE_ERROR,
} from '../../constant';
import { getExistingLeaveApi } from './index';
import {
  TimeRequestApiResponse,
} from '../../../utils/type';

function* fetchExistingLeave() {
  try {
    const response: TimeRequestApiResponse = yield call(getExistingLeaveApi);
    yield put({
      type: FETCH_EXISTING_LEAVE_SUCCESS,
      payload: response.data,
    });
  } catch (error: any) {
    yield put({
      type: FETCH_EXISTING_LEAVE_ERROR,
      payload: error.message,
    });
  }
}

function* existingLeaveGetSaga() {
  yield takeLatest(FETCH_EXISTING_LEAVE_REQUEST, fetchExistingLeave);
}

export default existingLeaveGetSaga;
