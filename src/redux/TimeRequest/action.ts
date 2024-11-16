import {
  APPLY_TIME_REQUEST_BEGIN,
  CHANGE_TIME_REQUEST_STATUS_BEGIN,
  GET_TIME_REQUEST_BEGIN,
} from '../constant';
import {
  AddTimeRequestAction,
  GetTimeRequestAction,
  ChangeStatusTimeRequestAction,
} from '../../utils/type';

export const applyTimeRequestBegin = (payload: {
  userId: string | undefined;
  projectId: string;
  applyDate: Date;
  startTime: number;
  endTime: number;
  description: string;
}): AddTimeRequestAction => ({
  type: APPLY_TIME_REQUEST_BEGIN,
  payload,
});

export const getTimeRequestBegin = (payload: {
  page?: number;
  rowsPerPage?: number;
  userFilterId: string[] | undefined;
  status: string | undefined;
  startDate: any;
  endDate: any;
  isSelf: boolean;
}): GetTimeRequestAction => ({
  type: GET_TIME_REQUEST_BEGIN,
  payload,
});

export const changeTimeRequestStatusBegin = (payload: {
  requestId: string;
  status: string;
  reason?: string;
}): ChangeStatusTimeRequestAction => ({
  type: CHANGE_TIME_REQUEST_STATUS_BEGIN,
  payload,
});
