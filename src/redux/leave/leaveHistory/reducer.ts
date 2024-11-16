import { AnyAction } from 'redux';
import {
  GET_LEAVE_HISTORY_REQUEST,
  GET_LEAVE_HISTORY_SUCCESS,
  GET_LEAVE_HISTORY_ERROR,
} from '../../constant';
import { LeaveHistoryState } from '../../../utils/type';

const initialState: LeaveHistoryState = {
  loading: false,
  leaveReduxState: {
    total: 0,
    data: [],
  },
  error: null,
};

const leaveHistoryReducer = (
  state = initialState,
  action: AnyAction
): LeaveHistoryState => {
  switch (action.type) {
    case GET_LEAVE_HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_LEAVE_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        leaveReduxState: action.payload,
      };
    case GET_LEAVE_HISTORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default leaveHistoryReducer;
