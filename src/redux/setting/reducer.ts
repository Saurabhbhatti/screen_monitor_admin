import { SettingPayload } from '../../utils/type';
import {
  ADD_UPDATE_SETTING_REQUEST,
  ADD_UPDATE_SETTING_SUCCESS,
  ADD_UPDATE_SETTING_ERROR,
  GET_SETTING_ERROR,
  GET_SETTING_SUCCESS,
  GET_SETTING_REQUEST,
} from '../constant';

const initialState = {
  data: {
    leave: {
      leaveColor: {},
      leaveType: '',
      leaveValue: '',
    },
    attendance: {
      totalWorkingHours: '',
      flexibleTotalHours: '',
      elegibleCompoff: '',
      halfLeave: '',
    },
    productivity: {
      unproductiveColor: '',
      neutralColor: '',
      productiveColor: '',
    },
    jira: {
      jiraBaseUrl: '',
      jiraEmail: '',
      jiraApiToken: '',
    },
  },
  loading: false,
  error: null,
};

const settingsReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    // Common handling for both Get and Add/Update API requests
    case GET_SETTING_REQUEST:
    case ADD_UPDATE_SETTING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Handle successful GET_SETTING
    case GET_SETTING_SUCCESS:
      return {
        ...state,
        loading: false,
        // If data is null, use initialState.data to maintain structure
        data: action.payload?.data || initialState.data,
      };

    // Handle successful ADD_UPDATE_SETTING
    case ADD_UPDATE_SETTING_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          ...action.payload?.data, // Assuming the payload contains the updated data
        },
      };

    // Common error handler for both Get and Add/Update
    case GET_SETTING_ERROR:
    case ADD_UPDATE_SETTING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default settingsReducer;
