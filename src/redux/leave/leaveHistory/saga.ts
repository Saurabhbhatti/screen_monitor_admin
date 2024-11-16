import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_LEAVE_HISTORY_REQUEST,
  GET_LEAVE_HISTORY_SUCCESS,
  GET_LEAVE_HISTORY_ERROR,
} from '../../constant';
import { fetchLeaveHistoryApi } from './index';
import {
  LeaveHistoryPayload,
  LeaveRequestApiResponse,
} from '../../../utils/type';

function* fetchLeaveHistory(action: { type: string; payload: LeaveHistoryPayload }) {
  try {
    const response: LeaveRequestApiResponse  = yield call(fetchLeaveHistoryApi, action.payload);
    yield put({
      type: GET_LEAVE_HISTORY_SUCCESS,
      payload: response.data,
    });
  } catch (error: any) {
    yield put({
      type: GET_LEAVE_HISTORY_ERROR,
      payload: error.message,
    });
  }
}

function* leaveHistorySaga() {
  yield takeLatest(GET_LEAVE_HISTORY_REQUEST, fetchLeaveHistory);
}

export default leaveHistorySaga;
