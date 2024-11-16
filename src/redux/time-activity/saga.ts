
import { call, put, takeLatest } from 'redux-saga/effects';
import { getTimeActivityApi, getTimeLineApi } from '.';
import { handleApiError } from '../../utils';
import {
  GET_TIME_ACTIVITY_BEGIN,
  GET_TIME_ACTIVITY_ERROR,
  GET_TIME_ACTIVITY_SUCCESS,
  GET_TIMELINE_BEGIN,
  GET_TIMELINE_ERROR,
  GET_TIMELINE_SUCCESS,
} from '../constant';
import { TimeActivityApiResponse, TimeActivityRequestAction, TimeLineApiResponse, TimeLineRequestAction } from '../../utils/type';

export function* fetchTimeActivityData(action: TimeActivityRequestAction) {
  try {
    const response: TimeActivityApiResponse = yield call(
      getTimeActivityApi,
      action.payload,
    );
    const status = response?.data;
    if (status) {
      yield put({
        type: GET_TIME_ACTIVITY_SUCCESS,
        payload:response?.data
      });
    }
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: GET_TIME_ACTIVITY_ERROR,
      payload: errorData,
    });
  }
}

export function* getTimeActivityRequest() {
  yield takeLatest(GET_TIME_ACTIVITY_BEGIN, fetchTimeActivityData);
}


export function* fetchTimeLineData(action: TimeLineRequestAction) {
  try {
    const response: TimeLineApiResponse = yield call(
      getTimeLineApi,
      action.payload,
    );
    const status = response?.data;
    if (status) {
      yield put({
        type: GET_TIMELINE_SUCCESS,
        payload:  response?.data
      });
    }
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: GET_TIMELINE_ERROR,
      payload: errorData,
    });
  }
}

export function* getTimeLineRequest() {
  yield takeLatest(GET_TIMELINE_BEGIN, fetchTimeLineData);
}
