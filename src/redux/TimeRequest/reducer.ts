import { TimeRequest } from '../../utils/type';
import {
  APPLY_TIME_REQUEST_BEGIN,
  APPLY_TIME_REQUEST_FAILURE,
  APPLY_TIME_REQUEST_SUCESS,
  CHANGE_TIME_REQUEST_STATUS_BEGIN,
  CHANGE_TIME_REQUEST_STATUS_FAILURE,
  CHANGE_TIME_REQUEST_STATUS_SUCCESS,
  GET_TIME_REQUEST_BEGIN,
  GET_TIME_REQUEST_FAILURE,
  GET_TIME_REQUEST_SUCESS,
} from '../constant';

export const initialState = {
  timeRequests: [] as TimeRequest[],
  loading: false,
  error: null,
  applySuccess: false,
};

const timeRequestReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case APPLY_TIME_REQUEST_BEGIN:
    case GET_TIME_REQUEST_BEGIN:
    case CHANGE_TIME_REQUEST_STATUS_BEGIN:
      return {
        ...state,
        loading: true,
        applySuccess: false,
      };
    case GET_TIME_REQUEST_SUCESS:
      return {
        ...state,
        timeRequests: action.payload,
        loading: false,
        applySuccess: false,
      };
    case CHANGE_TIME_REQUEST_STATUS_SUCCESS:
      return {
        ...state,
        timeRequests: Array.isArray(state.timeRequests)
          ? state.timeRequests.map((request: TimeRequest) =>
              request.id === action.payload.requestId
                ? { ...request, status: action.payload.status }
                : request
            )
          : [],
        loading: false,
        applySuccess: true,
      };
    case APPLY_TIME_REQUEST_SUCESS:
      return {
        ...state,
        loading: false,
        applySuccess: true,
      };
    case APPLY_TIME_REQUEST_FAILURE:
    case GET_TIME_REQUEST_FAILURE:
    case CHANGE_TIME_REQUEST_STATUS_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
        applySuccess: false,
      };
    default:
      return state;
  }
};

export default timeRequestReducer;
