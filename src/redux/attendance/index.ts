import { ApiClient } from '../../service/api';
import {
  GET_TIMELINE_END_POINT,
  ATTENDANCE_END_POINT,
} from '../../service/apiRoutes';
import { AttendancePayload, TimeLinePaylod } from '../../utils/type';

export const getAttendanceApi = async (payload: AttendancePayload) => {
  const queryParams = new URLSearchParams({
    offset: payload.page?.toString() || '1',
    limit: payload.rowsPerPage?.toString() || '10',
  });
  const url = `${ATTENDANCE_END_POINT}?${queryParams}`;
  const config = {
    method: 'POST',
    url,
    data: payload,
  };
  return await ApiClient(config);
};

export const getTimeLineApi = async (payload: TimeLinePaylod) => {
  const config = {
    method: 'POST',
    url: GET_TIMELINE_END_POINT,
    data: payload,
  };
  return await ApiClient(config);
};
