
import { CompanyAction, TimeActivity } from '../../utils/type';
import {
  GET_TIME_ACTIVITY_BEGIN,
  GET_TIME_ACTIVITY_ERROR,
  GET_TIME_ACTIVITY_SUCCESS,
  GET_TIMELINE_BEGIN,
  GET_TIMELINE_ERROR,
  GET_TIMELINE_SUCCESS,
} from '../constant';

const intialState: TimeActivity = {
  timeActivityData: [],
  timeLineData:[],
  timeLineLoading:false,
  loading: false,
  error: null,
};

const timeActivityReducer = (
  state: TimeActivity = intialState,
  action: CompanyAction,
): TimeActivity => {
  switch (action.type) {
    case GET_TIME_ACTIVITY_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_TIME_ACTIVITY_SUCCESS:
      return {
        ...state,
        loading: false,
        timeActivityData: action.payload,
        error: null,
      };
    case GET_TIME_ACTIVITY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        timeActivityData: [],
      };
      case GET_TIMELINE_BEGIN:
        return {
          ...state,
          timeLineLoading: true,
          error: null,
        };
      case GET_TIMELINE_SUCCESS:
        return {
          ...state,
          timeLineLoading: false,
          timeLineData: action.payload,
          error: null,
        };
      case GET_TIMELINE_ERROR:
        return {
          ...state,
          timeLineLoading: false,
          error: action.payload,
          timeLineData: [],
        };
    default:
      return state;
  }
};

export default timeActivityReducer;
