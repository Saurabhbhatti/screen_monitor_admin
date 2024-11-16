import { GetApiClient } from '../../service/api';
import { GET_DSR_END_POINT } from '../../service/apiRoutes';
import { DsrPayload, DsrQueryParams } from '../../utils/type';

export const dsrApi = async (payload: DsrPayload) => {
  const { startTime, endTime, memberId = [] } = payload;

  const requestBody = {
    startTime: startTime ?? '',
    endTime: endTime ?? '',
    memberId,
  };

  const config = {
    method: 'POST',
    url: GET_DSR_END_POINT,
    data: requestBody,
  };

  try {
    const res = await GetApiClient(config);
    return res;
  } catch (error) {
    console.error('Error fetching DSR data:', error);
    throw error;
  }
};
