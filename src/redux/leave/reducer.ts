import {
  SUBMIT_LEAVE_FORM_FAILURE,
  SUBMIT_LEAVE_FORM_REQUEST,
  SUBMIT_LEAVE_FORM_SUCCESS,
} from '../constant';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: [],
};

const leaveReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SUBMIT_LEAVE_FORM_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case SUBMIT_LEAVE_FORM_SUCCESS:
      return { ...state, loading: false, success: true, data: action.payload };
    case SUBMIT_LEAVE_FORM_FAILURE:
      return { ...state, loading: false, error: action.payload.data };
    default:
      return state;
  }
};

export default leaveReducer;
