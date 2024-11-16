import { ApiClient } from '../../service/api';
import {
  APPROVE_COMPOFF_ENDPOINT,
  GET_COMPOFF_REQUEST_ENDPOINT,
} from '../../service/apiRoutes';
import {
  ApiResponse,
  ApproveLeaveResponse,
  compOffActionData,
  TimeRequestData,
} from '../../utils/type';

export const getCompOffApi = async (data: TimeRequestData): Promise<any> => {
  const queryParams = new URLSearchParams();

  if (data.status) {
    queryParams.append('status', data.status);
  }
  if (data.userFilterId) {
    queryParams.append(
      'userFilterId',
      Array.isArray(data.userFilterId)
        ? data.userFilterId.join(',')
        : data.userFilterId
    );
  }
  if (data.startDate) {
    queryParams.append('startDate', data.startDate);
  }
  if (data.endDate) {
    queryParams.append('endDate', data.endDate);
  }
  if (data.isSelf !== undefined) {
    queryParams.append('isSelf', data.isSelf.toString());
  }
  if (data.limit !== undefined) {
    queryParams.append('limit', data.limit.toString());
  }
  if (data.offset !== undefined) {
    queryParams.append('offset', data.offset.toString());
  }

  const config = {
    method: 'GET' as const,
    url: `${GET_COMPOFF_REQUEST_ENDPOINT}?${queryParams.toString()}`,
  };

  const res = await ApiClient(config);
  return res;
};

export const approveLeaveApi = async (
  data: compOffActionData
): Promise<ApiResponse<ApproveLeaveResponse>> => {
  const config = {
    method: 'POST',
    url: `${APPROVE_COMPOFF_ENDPOINT}`,
    data,
  };
  const response = await ApiClient(config);
  return response as ApiResponse<ApproveLeaveResponse>;
};
