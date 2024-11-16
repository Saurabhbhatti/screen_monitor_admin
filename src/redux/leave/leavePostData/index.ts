import { ApiClient } from '../../../service/api';
import {
  APPROVE_LEAVE_ENDPOINT,
  CANCEL_LEAVE_ENDPOINT,
  REJECT_LEAVE_ENDPOINT,
} from '../../../service/apiRoutes';
import {
  ApiResponse,
  ApproveLeaveResponse,
  CancelLeaveResponse,
  LeaveActionData,
  RejectLeaveResponse,
} from '../../../utils/type';

export const approveLeaveApi = async (
  data: LeaveActionData
): Promise<ApiResponse<ApproveLeaveResponse>> => {
  const config = {
    method: 'POST',
    url: `${APPROVE_LEAVE_ENDPOINT}`,
    data,
  };
  const response = await ApiClient(config);
  return response as ApiResponse<ApproveLeaveResponse>;
};

export const rejectLeaveApi = async (
  data: LeaveActionData
): Promise<ApiResponse<RejectLeaveResponse>> => {
  const config = {
    method: 'POST',
    url: `${REJECT_LEAVE_ENDPOINT}`,
    data,
  };
  const response = await ApiClient(config);
  return response as ApiResponse<RejectLeaveResponse>;
};

export const cancelLeaveApi = async (
  data: Omit<LeaveActionData, 'status' | 'comment'>
): Promise<ApiResponse<CancelLeaveResponse>> => {
  const config = {
    method: 'POST',
    url: `${CANCEL_LEAVE_ENDPOINT}`,
    data,
  };
  const response = await ApiClient(config);
  return response as ApiResponse<CancelLeaveResponse>;
};
