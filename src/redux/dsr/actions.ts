import { DsrData, FetchDsrDataPayload } from '../../utils/type';
import {
  FETCH_DSR_DATA_FAILURE,
  FETCH_DSR_DATA_REQUEST,
  FETCH_DSR_DATA_SUCCESS,
} from '../constant';

export const fetchDsrDataRequest = (data: FetchDsrDataPayload) => ({
  type: FETCH_DSR_DATA_REQUEST,
  payload: data,
});

export const fetchDsrDataSuccess = (data: DsrData[]) => ({
  type: FETCH_DSR_DATA_SUCCESS,
  payload: data,
});

export const fetchDsrDataFailure = (error: string) => ({
  type: FETCH_DSR_DATA_FAILURE,
  payload: error,
});
