import { put, call, takeEvery } from 'redux-saga/effects';
import { screenShortApi } from '.';
import { FETCH_SCREENSHOT_DATA_FAILURE, FETCH_SCREENSHOT_DATA_REQUEST, FETCH_SCREENSHOT_DATA_SUCCESS } from '../constant';
import { handleApiError } from '../../utils';
import { ScreenshotApiResponse, ScreenshotRequestAction } from '../../utils/type';

function* fetchScreenshotDataSaga(action: ScreenshotRequestAction) {
  try {
    const response: ScreenshotApiResponse = yield call(screenShortApi, action.payload);
    const { status} = response.data;
    if (status && status === true) {
      yield put({
        type: FETCH_SCREENSHOT_DATA_SUCCESS,
        payload: response.data
      });
    }
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: FETCH_SCREENSHOT_DATA_FAILURE,
      payload: errorData
    });
  }
}
function* screenshotSaga() {
  yield takeEvery(FETCH_SCREENSHOT_DATA_REQUEST, fetchScreenshotDataSaga);
}
export default screenshotSaga;