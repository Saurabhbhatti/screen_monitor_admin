import { LeaveRecordsPayload } from '../../utils/type';
import {
  APPROVE_COMPOFF_REQUEST,
  FETCH_COMPOFF_FAILURE,
  FETCH_COMPOFF_REQUEST,
  FETCH_COMPOFF_SUCCESS,
} from '../constant';

export const fetchCompOffRequest = (payload: LeaveRecordsPayload) => ({
  type: FETCH_COMPOFF_REQUEST,
  payload,
});

export const fetchCompOffSuccess = (data: string) => ({
  type: FETCH_COMPOFF_SUCCESS,
  payload: data,
});

export const fetchCompOffFailure = (error: any) => ({
  type: FETCH_COMPOFF_FAILURE,
  payload: error,
});

export const approvecompOffRequest = (payload: {
  compoffId: string;
  value: number;
  status: string;
  eligibleCompoff?: number;
  comment: string;
}) => ({
  type: APPROVE_COMPOFF_REQUEST,
  payload,
});
