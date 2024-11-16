import { ApiClient } from '../../../service/api';
import { GET_LEAVE_REQUEST_END_POINT } from '../../../service/apiRoutes';
import { TimeRequestData } from '../../../utils/type';

export const fetchLeaveRecordsApi = async (data: TimeRequestData): Promise<any> => {
    const queryParams = new URLSearchParams();

    if (data.status) {
        queryParams.append('status', data.status);
    }
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
        url: `${GET_LEAVE_REQUEST_END_POINT}?${queryParams.toString()}`,
    };

    const res = await ApiClient(config);
    return res;
};
