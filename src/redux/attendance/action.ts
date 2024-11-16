import { AttendancePayload, TimeLinePaylod } from '../../utils/type';
import { GET_ATTENDANCE_BEGIN, GET_TIMELINE_BEGIN } from '../constant';

export const getAttendanceRequest = (payload: AttendancePayload) => ({
  type: GET_ATTENDANCE_BEGIN,
  payload,
});

export const getTimeLineRequest = (payload: TimeLinePaylod) => ({
  type: GET_TIMELINE_BEGIN,
  payload,
});
