import { LeaveRecordsPayload } from '../../../utils/type';
import { FETCH_LEAVE_RECORDS_FAILURE, FETCH_LEAVE_RECORDS_REQUEST, FETCH_LEAVE_RECORDS_SUCCESS } from '../../constant';

export const fetchLeaveRecordsRequest = (payload: LeaveRecordsPayload) => ({
    type: FETCH_LEAVE_RECORDS_REQUEST,
    payload,
});
export const fetchLeaveRecordsSuccess = (data: string) => ({
    type: FETCH_LEAVE_RECORDS_SUCCESS,
    payload: data,
});
export const fetchLeaveRecordsFailure = (error: any) => ({
    type: FETCH_LEAVE_RECORDS_FAILURE,
    payload: error,
});