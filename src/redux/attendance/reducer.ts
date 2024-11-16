import { CompanyAction } from '../../utils/type';
import {
  GET_ATTENDANCE_BEGIN,
  GET_ATTENDANCE_SUCCESS,
  GET_ATTENDANCE_ERROR,
  GET_TIMELINE_BEGIN,
  GET_TIMELINE_SUCCESS,
  GET_TIMELINE_ERROR,
} from '../constant';

const initialState = {
  loading: false,
  attendanceData: [],
  timeLineData: {},
  timeLineLoading: false,
  error: null,
};

export default function attendanceReducer(
  state = initialState,
  action: CompanyAction
) {
  switch (action.type) {
    case GET_ATTENDANCE_BEGIN:
      return { ...state, loading: true };
    case GET_ATTENDANCE_SUCCESS:
      return { ...state, attendanceData: action.payload, loading: false };
    case GET_ATTENDANCE_ERROR:
      return { ...state, error: action.payload, loading: false };
    case GET_TIMELINE_BEGIN:
      return { ...state, timeLineLoading: true };
    case GET_TIMELINE_SUCCESS:
      return { ...state, timeLineData: action.payload, timeLineLoading: false };
    case GET_TIMELINE_ERROR:
      return { ...state, error: action.payload, timeLineLoading: false };
    default:
      return state;
  }
}
