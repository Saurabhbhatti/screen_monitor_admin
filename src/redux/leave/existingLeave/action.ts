import {
  FETCH_EXISTING_LEAVE_REQUEST,
  FETCH_EXISTING_LEAVE_SUCCESS,
  FETCH_EXISTING_LEAVE_ERROR,
} from '../../constant';

export const fetchExistingLeaveRequest = () => ({
  type: FETCH_EXISTING_LEAVE_REQUEST,
});
export const fetchExistingLeaveSuccess = (data: string) => ({
  type: FETCH_EXISTING_LEAVE_SUCCESS,
  payload: data,
});
export const fetchExistingLeaveFailure = (error: any) => ({
  type: FETCH_EXISTING_LEAVE_ERROR,
  payload: error,
});
