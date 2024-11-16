import {
  SUBMIT_LEAVE_FORM_FAILURE,
  SUBMIT_LEAVE_FORM_REQUEST,
  SUBMIT_LEAVE_FORM_SUCCESS,
} from '../constant';

export const submitLeaveFormRequest = (leaveData: {
  leaveType: string;
  applyDate: any[];
  leaveReason: string;
  leaveRemarks: string;
}) => ({
  type: SUBMIT_LEAVE_FORM_REQUEST,
  payload: leaveData,
});

export const submitLeaveFormSuccess = (response: any) => ({
  type: SUBMIT_LEAVE_FORM_SUCCESS,
  payload: response,
});

export const submitLeaveFormFailure = (error: any) => ({
  type: SUBMIT_LEAVE_FORM_FAILURE,
  payload: error,
});
