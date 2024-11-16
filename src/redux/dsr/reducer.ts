import { DsrAction, DsrState } from '../../utils/type';
import {
  FETCH_DSR_DATA_FAILURE,
  FETCH_DSR_DATA_REQUEST,
  FETCH_DSR_DATA_SUCCESS,
} from '../constant';

const initialState: DsrState = {
  dsrs: [],
  loading: false,
  error: null,
};

const dsrReducer = (
  state: DsrState = initialState,
  action: DsrAction
): DsrState => {
  switch (action.type) {
    case FETCH_DSR_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DSR_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        dsrs: action.payload,
      };
    case FETCH_DSR_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        dsrs: [],
      };
    default:
      return state;
  }
};

export default dsrReducer;
