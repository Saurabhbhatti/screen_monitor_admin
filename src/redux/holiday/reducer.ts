import { Holiday } from '../../utils/type';
import {
  FETCH_HOLIDAYS_FAILURE,
  FETCH_HOLIDAYS_REQUEST,
  FETCH_HOLIDAYS_SUCCESS,
  ADD_HOLIDAY_SUCCESS,
  EDIT_HOLIDAY_SUCCESS,
  DELETE_HOLIDAY_SUCCESS,
  ADD_HOLIDAY_REQUEST,
  EDIT_HOLIDAY_REQUEST,
  DELETE_HOLIDAY_REQUEST,
  ADD_HOLIDAY_FAILURE,
  EDIT_HOLIDAY_FAILURE,
  DELETE_HOLIDAY_FAILURE,
} from '../constant';

const initialState = {
  holidays: { data: [] as Holiday[] },
  loading: false,
  error: null,
};

const holidayReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_HOLIDAYS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_HOLIDAYS_SUCCESS:
      return {
        ...state,
        holidays: action.payload,
        loading: false,
      };
    case FETCH_HOLIDAYS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_HOLIDAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_HOLIDAY_SUCCESS:
      const newHoliday = action.payload.data;
      return {
        ...state,
        loading: false,
        holidays: {
          data: [newHoliday, ...state.holidays.data],
        },
      };
    case ADD_HOLIDAY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EDIT_HOLIDAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EDIT_HOLIDAY_SUCCESS:
      const updatedHoliday = action.payload.data;
      const holidayIndex = state.holidays.data.findIndex(
        (holiday: { _id: string }) => holiday._id === updatedHoliday._id
      );

      if (holidayIndex !== -1) {
        let updatedHolidays = [...state.holidays.data];
        updatedHolidays[holidayIndex] = {
          ...updatedHolidays[holidayIndex],
          ...updatedHoliday,
        };

        return {
          ...state,
          loading: false,
          holidays: {
            data: updatedHolidays,
          },
        };
      }

      return state;

    case EDIT_HOLIDAY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_HOLIDAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_HOLIDAY_SUCCESS:
      const deletedHolidayIds = action.payload;

      const remainingHolidays = state.holidays.data.filter(
        (holiday) => !deletedHolidayIds.includes(holiday._id)
      );

      return {
        ...state,
        loading: false,
        holidays: {
          data: remainingHolidays,
        },
      };
    case DELETE_HOLIDAY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default holidayReducer;
