import { AnyAction } from 'redux';
import {
  FETCH_LEAVE_RECORDS_FAILURE,
  FETCH_LEAVE_RECORDS_REQUEST,
  FETCH_LEAVE_RECORDS_SUCCESS,
} from '../../constant';
import { LeaveRecordsState } from '../../../utils/type';

const initialState: LeaveRecordsState = {
  loading: false,
  data: {
    total: 0,
    data: [],
  },
  error: null,
};

const leaveRecordsReducer = (
  state = initialState,
  action: AnyAction
): LeaveRecordsState => {
  switch (action.type) {
    case FETCH_LEAVE_RECORDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_LEAVE_RECORDS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_LEAVE_RECORDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default leaveRecordsReducer;
