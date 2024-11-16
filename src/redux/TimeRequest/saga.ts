import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { handleApiError } from '../../utils';
import {
  APPLY_TIME_REQUEST_BEGIN,
  APPLY_TIME_REQUEST_SUCESS,
  APPLY_TIME_REQUEST_FAILURE,
  GET_TIME_REQUEST_BEGIN,
  GET_TIME_REQUEST_SUCESS,
  GET_TIME_REQUEST_FAILURE,
  CHANGE_TIME_REQUEST_STATUS_SUCCESS,
  CHANGE_TIME_REQUEST_STATUS_FAILURE,
  CHANGE_TIME_REQUEST_STATUS_BEGIN,
} from '../constant';
import { addTimeRequestApi, changeTimeRequestApi, getTimeRequestApi } from '.';
import {
  AddTimeRequestAction,
  GetTimeRequestAction,
  TimeRequestApiResponse,
} from '../../utils/type';

function* fetchTimeRequestData(action: GetTimeRequestAction) {
  try {
    const response: TimeRequestApiResponse = yield call(
      getTimeRequestApi,
      action.payload
    );
    if (response?.data?.status) {
      yield put({ type: GET_TIME_REQUEST_SUCESS, payload: response.data });
    } else {
      throw new Error('Invalid response status');
    }
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({ type: GET_TIME_REQUEST_FAILURE, error: errorData });
    toast.error('Failed to fetch time requests');
  }
}

function* addTimeRequestData(action: AddTimeRequestAction) {
  try {
    const response: TimeRequestApiResponse = yield call(
      addTimeRequestApi,
      action.payload
    );
    if (response?.data) {
      yield put({ type: APPLY_TIME_REQUEST_SUCESS, payload: response.data });
      toast.success(
        response.data.message || 'Time request applied successfully'
      );
    } else {
      throw new Error('Invalid data received');
    }
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({ type: APPLY_TIME_REQUEST_FAILURE, error: errorData });
    toast.error('Failed to apply time request');
  }
}

function* changeTimeRequestStatusData(action: any) {
  try {
    const response: TimeRequestApiResponse = yield call(
      changeTimeRequestApi,
      action.payload
    );
    if (response?.data) {
      yield put({
        type: CHANGE_TIME_REQUEST_STATUS_SUCCESS,
        payload: response.data,
      });
      toast.success(
        response.data.message || 'Time request updated successfully'
      );
    } else {
      throw new Error('Invalid data received');
    }
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({ type: CHANGE_TIME_REQUEST_STATUS_FAILURE, error: errorData });
    toast.error('Failed to update time request');
  }
}

export function* watchTimeRequestSagas() {
  yield takeLatest(GET_TIME_REQUEST_BEGIN, fetchTimeRequestData);
  yield takeLatest(APPLY_TIME_REQUEST_BEGIN, addTimeRequestData);
  yield takeLatest(
    CHANGE_TIME_REQUEST_STATUS_BEGIN,
    changeTimeRequestStatusData
  );
}
