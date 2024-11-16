import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_LEAVE_RECORDS_FAILURE, FETCH_LEAVE_RECORDS_REQUEST, FETCH_LEAVE_RECORDS_SUCCESS } from '../../constant';
import { fetchLeaveRecordsApi } from './index';
import { LeaveRecordsPayload, TimeRequestApiResponse } from '../../../utils/type';

function* fetchLeaveRecords(action: { type: string; payload: LeaveRecordsPayload }) {
    try {
        const response: TimeRequestApiResponse = yield call(fetchLeaveRecordsApi, action.payload);
        yield put({
            type: FETCH_LEAVE_RECORDS_SUCCESS,
            payload: response.data,
        });
    } catch (error: any) {
        yield put({
            type: FETCH_LEAVE_RECORDS_FAILURE,
            payload: error.message,
        });
    }
}

function* leaveGetSaga() {
    yield takeLatest(FETCH_LEAVE_RECORDS_REQUEST, fetchLeaveRecords);
}

export default leaveGetSaga;
