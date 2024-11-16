import { SettingPayload, SettingResponse } from '../../utils/type';
import {
  ADD_UPDATE_SETTING_REQUEST,
  ADD_UPDATE_SETTING_SUCCESS,
  ADD_UPDATE_SETTING_ERROR,
  GET_SETTING_REQUEST,
  GET_SETTING_SUCCESS,
  GET_SETTING_ERROR,
} from '../constant';

export const fetchaAddUpdateSettingRequest = (payload: SettingPayload) => ({
  type: ADD_UPDATE_SETTING_REQUEST,
  payload: payload,
});

export const addUpdateSettingSuccess = (response: SettingResponse) => ({
  type: ADD_UPDATE_SETTING_SUCCESS,
  payload: response,
});

export const addUpdateSettingFailure = (error: string) => ({
  type: ADD_UPDATE_SETTING_ERROR,
  payload: error,
});

export const getSettingRequest = () => ({
  type: GET_SETTING_REQUEST,
});

export const getSettingSuccess = (response: SettingResponse) => ({
  type: GET_SETTING_SUCCESS,
  payload: response,
});

export const getSettingFailure = (error: string) => ({
  type: GET_SETTING_ERROR,
  payload: error,
});
