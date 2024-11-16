import {
  ApproveLeaveRequestAction,
  ApproveLeaveRequestPayload,
  CancelLeaveRequestAction,
  CancelLeaveRequestPayload,
  RejectLeaveRequestAction,
  RejectLeaveRequestPayload,
} from '../../../utils/type';
import {
  APPROVE_LEAVE_REQUEST,
  CANCEL_LEAVE_REQUEST,
  REJECT_LEAVE_REQUEST,
} from '../../constant';

export const approveLeaveRequest = (
  payload: ApproveLeaveRequestPayload
): ApproveLeaveRequestAction => ({
  type: APPROVE_LEAVE_REQUEST,
  payload,
});

export const rejectLeaveRequest = (
  payload: RejectLeaveRequestPayload
): RejectLeaveRequestAction => ({
  type: REJECT_LEAVE_REQUEST,
  payload,
});

export const cancelLeaveRequest = (
  payload: CancelLeaveRequestPayload
): CancelLeaveRequestAction => ({
  type: CANCEL_LEAVE_REQUEST,
  payload,
});
