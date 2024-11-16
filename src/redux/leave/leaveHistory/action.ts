import { LeaveHistoryPayload } from '../../../utils/type';
import {
  GET_LEAVE_HISTORY_REQUEST,
  GET_LEAVE_HISTORY_SUCCESS,
  GET_LEAVE_HISTORY_ERROR,
} from '../../constant';

export const leaveHistoryRequest = (payload: LeaveHistoryPayload) => ({
  type: GET_LEAVE_HISTORY_REQUEST,
  payload: payload,
});

export const leaveHistorySuccess = (response: string) => ({
  type: GET_LEAVE_HISTORY_SUCCESS,
  payload: response,
});

export const leaveHistoryFailure = (error: string) => ({
  type: GET_LEAVE_HISTORY_ERROR,
  payload: error,
});
