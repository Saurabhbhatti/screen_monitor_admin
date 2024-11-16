import { call, put, takeLatest } from 'redux-saga/effects';
import { handleApiError } from '../../utils';
import {
  GET_ATTENDANCE_BEGIN,
  GET_ATTENDANCE_SUCCESS,
  GET_ATTENDANCE_ERROR,
  GET_TIMELINE_BEGIN,
  GET_TIMELINE_SUCCESS,
  GET_TIMELINE_ERROR,
} from '../constant';
import {
  AttendanceApiResponse,
  TimeLineApiResponse,
  AttendanceRequestAction,
  TimeLineRequestAction,
} from '../../utils/type';
import { getAttendanceApi, getTimeLineApi } from '.';

export function* fetchAttendanceData(action: AttendanceRequestAction) {
  try {
    const response: AttendanceApiResponse = yield call(
      getAttendanceApi,
      action.payload
    );
    yield put({ type: GET_ATTENDANCE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: GET_ATTENDANCE_ERROR, payload: handleApiError(error) });
  }
}

export function* fetchTimeLineData(action: TimeLineRequestAction) {
  try {
    const response: TimeLineApiResponse = yield call(
      getTimeLineApi,
      action.payload
    );
    yield put({ type: GET_TIMELINE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: GET_TIMELINE_ERROR, payload: handleApiError(error) });
  }
}

export function* getAttendanceWatcher() {
  yield takeLatest(GET_ATTENDANCE_BEGIN, fetchAttendanceData);
}

export function* getTimeLineWatcher() {
  yield takeLatest(GET_TIMELINE_BEGIN, fetchTimeLineData);
}
