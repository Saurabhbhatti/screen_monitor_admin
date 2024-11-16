import { Holiday } from '../../utils/type';
import {
  ADD_HOLIDAY_FAILURE,
  ADD_HOLIDAY_REQUEST,
  ADD_HOLIDAY_SUCCESS,
  DELETE_HOLIDAY_FAILURE,
  DELETE_HOLIDAY_REQUEST,
  DELETE_HOLIDAY_SUCCESS,
  EDIT_HOLIDAY_FAILURE,
  EDIT_HOLIDAY_REQUEST,
  EDIT_HOLIDAY_SUCCESS,
  FETCH_HOLIDAYS_FAILURE,
  FETCH_HOLIDAYS_REQUEST,
  FETCH_HOLIDAYS_SUCCESS,
} from '../constant';

export const fetchHolidaysRequest = () => ({
  type: FETCH_HOLIDAYS_REQUEST,
});

export const fetchHolidaysSuccess = (holidays: any) => ({
  type: FETCH_HOLIDAYS_SUCCESS,
  payload: holidays,
});

export const fetchHolidaysFailure = (error: any) => ({
  type: FETCH_HOLIDAYS_FAILURE,
  payload: error,
});

export const addHolidayRequest = (holidayData: {
  name: string;
  date: string;
}) => ({
  type: ADD_HOLIDAY_REQUEST,
  payload: holidayData,
});

export const addHolidaySuccess = (holiday: any) => ({
  type: ADD_HOLIDAY_SUCCESS,
  payload: holiday,
});

export const addHolidayFailure = (error: any) => ({
  type: ADD_HOLIDAY_FAILURE,
  payload: error,
});

export const editHolidayRequest = (holiday: {
  name: string;
  date: string;
  holidayId: string;
}) => ({
  type: EDIT_HOLIDAY_REQUEST,
  payload: holiday,
});

export const editHolidaySuccess = (holiday: any) => ({
  type: EDIT_HOLIDAY_SUCCESS,
  payload: holiday,
});

export const editHolidayFailure = (error: any) => ({
  type: EDIT_HOLIDAY_FAILURE,
  payload: error,
});

export const deleteHolidayRequest = (holidayIds: string[]) => ({
  type: DELETE_HOLIDAY_REQUEST,
  payload: holidayIds,
});

export const deleteHolidaySuccess = (holidayIds: string[]) => ({
  type: DELETE_HOLIDAY_SUCCESS,
  payload: holidayIds,
});

export const deleteHolidayFailure = (error: any) => ({
  type: DELETE_HOLIDAY_FAILURE,
  payload: error,
});
