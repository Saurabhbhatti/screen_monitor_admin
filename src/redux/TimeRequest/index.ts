import { json } from 'stream/consumers';
import { ApiClient } from '../../service/api';
import {
  APPLY_TIME_REQUEST_END_POINT,
  CHANGE_TIME_REQUEST_STATUS_END_POINT,
  GET_TIME_REQUEST_END_POINT,
} from '../../service/apiRoutes';
import { TimeRegulatePayload } from '../../utils/type';

export const addTimeRequestApi = async (data: any) => {
  const config = {
    method: 'POST',
    url: APPLY_TIME_REQUEST_END_POINT,
    data,
  };
  return await ApiClient(config);
};

export const getTimeRequestApi = async (data: TimeRegulatePayload) => {
  const queryParams = new URLSearchParams();

  const {
    page,
    rowsPerPage,
    status,
    userFilterId,
    startDate,
    endDate,
    isSelf,
  } = data;

  if (page !== undefined && rowsPerPage !== undefined) {
    queryParams.append('offset', page.toString());
    queryParams.append('limit', rowsPerPage.toString());
  }

  if (status) queryParams.append('status', status);
  if (userFilterId) queryParams.append('userFilterId', userFilterId.join(','));
  if (startDate) queryParams.append('startDate', startDate);
  if (endDate) queryParams.append('endDate', endDate);
  if (isSelf !== undefined) queryParams.append('isSelf', isSelf.toString());

  const config = {
    method: 'GET',
    url: `${GET_TIME_REQUEST_END_POINT}?${queryParams.toString()}`,
  };

  try {
    return await ApiClient(config);
  } catch (error) {
    throw error;
  }
};

export const changeTimeRequestApi = async (data: {
  requestId: string;
  status: string;
  reason?: string;
}) => {
  const config = {
    method: 'POST',
    url: CHANGE_TIME_REQUEST_STATUS_END_POINT,
    data: data,
  };
  return await ApiClient(config);
};