// saga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchHolidaysFailure,
  fetchHolidaysSuccess,
  addHolidayFailure,
  addHolidaySuccess,
  editHolidayFailure,
  editHolidaySuccess,
  deleteHolidayFailure,
  deleteHolidaySuccess,
  fetchHolidaysRequest,
} from './action';
import {
  FETCH_HOLIDAYS_REQUEST,
  ADD_HOLIDAY_REQUEST,
  EDIT_HOLIDAY_REQUEST,
  DELETE_HOLIDAY_REQUEST,
} from '../constant';
import {
  fetchGetHolidaysApi,
  addHolidayApi,
  editHolidayApi,
  deleteHolidayApi,
} from './index';
import { toast } from 'react-toastify';

// Fetch holidays saga
function* fetchHolidays(action: any): any {
  try {
    const response = yield call(fetchGetHolidaysApi, action.payload);
    yield put(fetchHolidaysSuccess(response.data));
  } catch (error: any) {
    yield put(fetchHolidaysFailure(error.message));
  }
}

// Add holiday saga
function* addHoliday(action: any): any {
  try {
    const response = yield call(addHolidayApi, action.payload);
    yield put(addHolidaySuccess(response.data));  // Update state directly without fetching again
    toast.success(response?.data?.message);
  } catch (error: any) {
    yield put(addHolidayFailure(error.message));
  }
}

// Edit holiday saga
function* editHoliday(action: any): any {
  console.log('Editing holiday with data:', action.payload);
  try {
    const response = yield call(editHolidayApi, action.payload);
    yield put(editHolidaySuccess(response.data));  // Update state directly without fetching again
    toast.success(response?.data?.message);
  } catch (error: any) {
    yield put(editHolidayFailure(error.message));
  }
}

// Delete holiday saga
function* deleteHoliday(action: any): any {
  try {
    yield call(deleteHolidayApi, action.payload);
    yield put(deleteHolidaySuccess(action.payload));  // Update state directly without fetching again
    toast.success('Holidays deleted successfully.');
  } catch (error: any) {
    yield put(deleteHolidayFailure(error.message));
  }
}

// Watcher saga
export function* watchHolidays() {
  yield takeLatest(FETCH_HOLIDAYS_REQUEST, fetchHolidays);
  yield takeLatest(ADD_HOLIDAY_REQUEST, addHoliday);
  yield takeLatest(EDIT_HOLIDAY_REQUEST, editHoliday);
  yield takeLatest(DELETE_HOLIDAY_REQUEST, deleteHoliday);
}
