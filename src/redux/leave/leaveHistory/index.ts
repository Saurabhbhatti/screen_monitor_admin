import { AxiosResponse } from 'axios';
import { ApiClient } from '../../../service/api';
import { LEAVE_HISTORY_END_POINT } from '../../../service/apiRoutes';
import { LeaveHistoryPayload } from '../../../utils/type';

export const fetchLeaveHistoryApi = async (data: LeaveHistoryPayload): Promise<AxiosResponse> => {

    const queryParams = new URLSearchParams();
    
    if (data.userFilterId) {
        queryParams.append(
            'userFilterId',
            Array.isArray(data.userFilterId) ? data.userFilterId.join(',') : data.userFilterId
        );
    }
    if (data.startDate) {
        queryParams.append('startDate', data.startDate);
    }
    if (data.endDate) {
        queryParams.append('endDate', data.endDate);
    }
    if (data.isSelf) {
        queryParams.append('isSelf', data.isSelf.toString());
    }
    if (data.limit) {
        queryParams.append('limit', data.limit.toString());
    }
    if (data.offset) {
        queryParams.append('offset', data.offset.toString());
    }

    const config = {
        method: 'GET',
        url: `${LEAVE_HISTORY_END_POINT}?${queryParams.toString()}`,
    };

    const res = await ApiClient(config);
    return res;
};