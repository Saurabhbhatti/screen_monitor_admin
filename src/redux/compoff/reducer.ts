import { AnyAction } from 'redux-saga';
import {
  FETCH_COMPOFF_FAILURE,
  FETCH_COMPOFF_REQUEST,
  FETCH_COMPOFF_SUCCESS,
  APPROVE_COMPOFF_REQUEST,
  APPROVE_COMPOFF_SUCCESS,
  APPROVE_COMPOFF_FAILURE,
} from '../constant';
import { LeaveRecordsState } from '../../utils/type';

const initialState: LeaveRecordsState = {
  loading: false,
  approvalLoading: false,
  data: {
    total: 0,
    data: [],
  },
  error: null,
  approvalError: null,
};

const compOffReducer = (
  state = initialState,
  action: AnyAction
): LeaveRecordsState => {
  switch (action.type) {
    case FETCH_COMPOFF_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_COMPOFF_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_COMPOFF_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case APPROVE_COMPOFF_REQUEST:
      return {
        ...state,
        approvalLoading: true,
        approvalError: null,
      };
    case APPROVE_COMPOFF_SUCCESS:
      return {
        ...state,
        approvalLoading: false,
        data: {
          ...state.data,
          data: state.data.data.map((item: any) =>
            item.id === action.payload.id ? action.payload : item
          ),
        },
      };
    case APPROVE_COMPOFF_FAILURE:
      return {
        ...state,
        approvalLoading: false,
        approvalError: action.payload,
      };

    default:
      return state;
  }
};

export default compOffReducer;
