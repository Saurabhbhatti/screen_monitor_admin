import { AnyAction } from 'redux';
import {
  FETCH_EXISTING_LEAVE_REQUEST,
  FETCH_EXISTING_LEAVE_SUCCESS,
  FETCH_EXISTING_LEAVE_ERROR,
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

const existingLeavReducer = (
  state = initialState,
  action: AnyAction
): LeaveRecordsState => {
  switch (action.type) {
    case FETCH_EXISTING_LEAVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_EXISTING_LEAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_EXISTING_LEAVE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default existingLeavReducer;
