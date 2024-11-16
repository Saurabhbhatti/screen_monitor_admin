import { LeaveActionTypes, LeaveApprovalState } from '../../../utils/type';
import {
  APPROVE_LEAVE_FAILURE,
  APPROVE_LEAVE_REQUEST,
  APPROVE_LEAVE_SUCCESS,
  CANCEL_LEAVE_FAILURE,
  CANCEL_LEAVE_REQUEST,
  CANCEL_LEAVE_SUCCESS,
  REJECT_LEAVE_FAILURE,
  REJECT_LEAVE_REQUEST,
  REJECT_LEAVE_SUCCESS,
} from '../../constant';

const initialState: LeaveApprovalState = {
  approveLoading: false,
  rejectLoading: false,
  cancelLoading: false,
  success: false,
  approvalData: null,
  rejectionData: null,
  cancellationData: null,
  error: null,
};

const leaveApprovalReducer = (
  state = initialState,
  action: LeaveActionTypes
): LeaveApprovalState => {
  switch (action.type) {
    case APPROVE_LEAVE_REQUEST:
      return { ...state, approveLoading: true, success: true, error: null };
    case APPROVE_LEAVE_SUCCESS:
      return {
        ...state,
        approveLoading: false,
        success: false,
        approvalData: action.payload,
        error: null,
      };
    case APPROVE_LEAVE_FAILURE:
      return { ...state, approveLoading: false, success: false, error: action.payload };

    case REJECT_LEAVE_REQUEST:
      return { ...state, rejectLoading: true, success: true, error: null };
    case REJECT_LEAVE_SUCCESS:
      return {
        ...state,
        rejectLoading: false,
        rejectionData: action.payload,
        error: null,
      };
    case REJECT_LEAVE_FAILURE:
      return { ...state, rejectLoading: false, success: false, error: action.payload };

    case CANCEL_LEAVE_REQUEST:
      return { ...state, cancelLoading: true, success: true, error: null };
    case CANCEL_LEAVE_SUCCESS:
      return {
        ...state,
        cancelLoading: false,
        success: false,
        cancellationData: action.payload,
        error: null,
      };
    case CANCEL_LEAVE_FAILURE:
      return { ...state, cancelLoading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

export default leaveApprovalReducer;
