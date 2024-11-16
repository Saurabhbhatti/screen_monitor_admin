import { ProfileActions, ProfileData } from '../../utils/types/profile';
import {
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from '../constant';

export const fetchProfileRequest = (): ProfileActions => ({
  type: FETCH_PROFILE_REQUEST,
});

export const fetchProfileSuccess = (data: ProfileData): ProfileActions => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: data,
});

export const fetchProfileFailure = (error: string): ProfileActions => ({
  type: FETCH_PROFILE_FAILURE,
  payload: error,
});

export const updateProfileDataRequest = (data: FormData): ProfileActions => ({
  type: UPDATE_PROFILE_REQUEST,
  payload: data,
});

export const updateProfileDataSuccess = (
  data: ProfileData
): ProfileActions => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: data,
});

export const updateProfileDataFailure = (error: string): ProfileActions => ({
  type: UPDATE_PROFILE_FAILURE,
  payload: error,
});
