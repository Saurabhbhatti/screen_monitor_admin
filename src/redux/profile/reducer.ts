import { ProfileActions, ProfileData } from '../../utils/types/profile';
import {
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from '../constant';

interface ProfileState {
  loading: boolean;
  profileData: ProfileData | {};
  error: string;
}

const initialState: ProfileState = {
  loading: false,
  profileData: {},
  error: '',
};

const profileReducer = (
  state = initialState,
  action: ProfileActions
): ProfileState => {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profileData: action.payload,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profileData: {
          ...(state.profileData || {}),
          ...action.payload,
        },
      };
    case FETCH_PROFILE_FAILURE:
    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
