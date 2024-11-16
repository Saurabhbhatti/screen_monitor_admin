import { call, put, takeLatest } from 'redux-saga/effects';
import {
  APPROVE_LEAVE_FAILURE,
  APPROVE_LEAVE_REQUEST,
  APPROVE_LEAVE_SUCCESS,
  CANCEL_LEAVE_FAILURE,
  CANCEL_LEAVE_REQUEST,
  CANCEL_LEAVE_SUCCESS,
  REJECT_LEAVE_FAILURE,
  REJECT_LEAVE_REQUEST,
  REJECT_LEAVE_SUCCESS,
} from '../../constant';
import { approveLeaveApi, cancelLeaveApi, rejectLeaveApi } from './index';
import {
  ApiResponse,
  ApproveLeaveFailureAction,
  ApproveLeaveResponse,
  ApproveLeaveSuccessAction,
  CancelLeaveFailureAction,
  CancelLeaveResponse,
  CancelLeaveSuccessAction,
  LeaveActionData,
  LeavePotsAction,
  RejectLeaveFailureAction,
  RejectLeaveResponse,
  RejectLeaveSuccessAction,
} from '../../../utils/type';

function* approveLeaveSaga(
  action: LeavePotsAction<LeaveActionData>
): Generator<any, void, ApiResponse<ApproveLeaveResponse>> {
  try {
    const response = yield call(approveLeaveApi, action.payload);
    yield put<ApproveLeaveSuccessAction>({
      type: APPROVE_LEAVE_SUCCESS,
      payload: response.data,
    });
  } catch (error: any) {
    yield put<ApproveLeaveFailureAction>({
      type: APPROVE_LEAVE_FAILURE,
      payload: error.message,
    });
  }
}

function* rejectLeaveSaga(
  action: LeavePotsAction<LeaveActionData>
): Generator<any, void, ApiResponse<RejectLeaveResponse>> {
  try {
    const response = yield call(rejectLeaveApi, action.payload);
    yield put<RejectLeaveSuccessAction>({
      type: REJECT_LEAVE_SUCCESS,
      payload: response.data,
    });
  } catch (error: any) {
    yield put<RejectLeaveFailureAction>({
      type: REJECT_LEAVE_FAILURE,
      payload: error.message,
    });
  }
}

function* cancelLeaveSaga(
  action: LeavePotsAction<Omit<LeaveActionData, 'status' | 'comment'>>
): Generator<any, void, ApiResponse<CancelLeaveResponse>> {
  try {
    const response = yield call(cancelLeaveApi, action.payload);
    yield put<CancelLeaveSuccessAction>({
      type: CANCEL_LEAVE_SUCCESS,
      payload: response.data,
    });
  } catch (error: any) {
    yield put<CancelLeaveFailureAction>({
      type: CANCEL_LEAVE_FAILURE,
      payload: error.message,
    });
  }
}

export function* leaveApprovalSaga() {
  yield takeLatest(APPROVE_LEAVE_REQUEST, approveLeaveSaga);
  yield takeLatest(REJECT_LEAVE_REQUEST, rejectLeaveSaga);
  yield takeLatest(CANCEL_LEAVE_REQUEST, cancelLeaveSaga);
}
