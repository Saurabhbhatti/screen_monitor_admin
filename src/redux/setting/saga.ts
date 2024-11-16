import { put, call, takeEvery,takeLatest } from 'redux-saga/effects';
import { ADD_UPDATE_SETTING_REQUEST, GET_SETTING_REQUEST } from '../constant';
import { addUpdateSettingApi, getSettingApi } from '.';
import { SettingPayload, SettingRequestApiResponse } from '../../utils/type';
import {
  addUpdateSettingFailure,
  addUpdateSettingSuccess,
  getSettingFailure,
  getSettingSuccess,
} from './action';

function* addUpdateSettingSaga(action: {
  type: string;
  payload: SettingPayload;
}) {
  try {
    const response: SettingRequestApiResponse = yield call(
      addUpdateSettingApi,
      action.payload
    );
    yield put(addUpdateSettingSuccess(response.data));
  } catch (error: any) {
    yield put(addUpdateSettingFailure(error.message));
  }
}

function* getSettingSaga() {
  try {
    const response: SettingRequestApiResponse = yield call(getSettingApi);
    yield put(getSettingSuccess(response.data));
  } catch (error: any) {
    yield put(getSettingFailure(error.message));
  }
}

function* settingSaga() {
  yield takeLatest(GET_SETTING_REQUEST, getSettingSaga);
  yield takeLatest(ADD_UPDATE_SETTING_REQUEST, addUpdateSettingSaga);
}
export default settingSaga;
