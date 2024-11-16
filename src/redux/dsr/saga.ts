import { put, call, takeEvery } from 'redux-saga/effects';
import { ApiClient } from '../../service/api';
import {
  FETCH_DSR_DATA_FAILURE,
  FETCH_DSR_DATA_REQUEST,
  FETCH_DSR_DATA_SUCCESS,
} from '../constant';
import { handleApiError } from '../../utils';
import { DsrApiResponse, DsrRequestAction } from '../../utils/type';
import { dsrApi } from '.';

function* fetchDsrDataSaga(action: DsrRequestAction) {
  try {
    const { startTime, endTime, memberId } = action.payload;

    const response: DsrApiResponse = yield call(dsrApi, {
      startTime,
      endTime,
      memberId,
    });

    yield put({
      type: FETCH_DSR_DATA_SUCCESS,
      payload: response.data.data,
    });
    const DsrData: any = response.data.data;
    localStorage.setItem('DsrData', DsrData);
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: FETCH_DSR_DATA_FAILURE,
      payload: errorData,
    });
  }
}

function* dsrSaga() {
  yield takeEvery(FETCH_DSR_DATA_REQUEST, fetchDsrDataSaga);
}

export default dsrSaga;
