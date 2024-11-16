import { call, put, takeLatest } from 'redux-saga/effects';
import {
  APPROVE_COMPOFF_FAILURE,
  APPROVE_COMPOFF_REQUEST,
  APPROVE_COMPOFF_SUCCESS,
  FETCH_COMPOFF_FAILURE,
  FETCH_COMPOFF_REQUEST,
  FETCH_COMPOFF_SUCCESS,
} from '../constant';
import { approveLeaveApi, getCompOffApi } from '.';
import {
  compOffActionData,
  CompOffApiResponse,
  LeaveRecordsPayload,
  TimeRequestApiResponse,
} from '../../utils/type';

function* fetchCompOff(action: { type: string; payload: LeaveRecordsPayload }) {
  try {
    const response: TimeRequestApiResponse = yield call(
      getCompOffApi,
      action.payload
    );
    yield put({
      type: FETCH_COMPOFF_SUCCESS,
      payload: response.data,
    });
  } catch (error: any) {
    yield put({
      type: FETCH_COMPOFF_FAILURE,
      payload: error.message,
    });
  }
}

function* approveCompOff(action: { type: string; payload: compOffActionData }) {
  try {
    const response: CompOffApiResponse = yield call(
      approveLeaveApi,
      action.payload
    );
    yield put({
      type: APPROVE_COMPOFF_SUCCESS,
      payload: response.data,
    });
  } catch (error: any) {
    yield put({
      type: APPROVE_COMPOFF_FAILURE,
      payload: error.message,
    });
  }
}

export function* watchApproveCompOff() {
  yield takeLatest(APPROVE_COMPOFF_REQUEST, approveCompOff);
}

export function* watchFetchCompOff() {
  yield takeLatest(FETCH_COMPOFF_REQUEST, fetchCompOff);
}
