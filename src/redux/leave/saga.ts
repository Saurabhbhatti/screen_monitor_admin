import { call, put, takeLatest } from 'redux-saga/effects';
import { submitLeaveFormFailure, submitLeaveFormSuccess } from './action';
import { SUBMIT_LEAVE_FORM_REQUEST } from '../constant';
import { leaveApi } from '../user';
import { LeaveDataPayload } from '../../utils/type';
import { toast } from 'react-toastify';

function* submitLeaveForm(action: {
  type: string;
  payload: LeaveDataPayload;
}): Generator {
  try {
    const response: any = yield call(leaveApi, action.payload);
    yield put(submitLeaveFormSuccess(response.data));
    if (response.data.status) {
      toast.success(response.data.message);
    }
  } catch (error: any) {
    yield put(submitLeaveFormFailure(error.message));
  }
}

export default function* leaveSaga() {
  yield takeLatest(SUBMIT_LEAVE_FORM_REQUEST, submitLeaveForm);
}
