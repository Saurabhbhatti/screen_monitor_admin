import { UserState, UserAction } from '../../utils/type';
import {
  ADD_USER_BEGIN,
  ADD_USER_ERROR,
  ADD_USER_SUCCESS,
  DELETE_USER_BEGIN,
  DELETE_USER_ERROR,
  DELETE_USER_SUCCESS,
  GET_ALL_USER_BEGIN,
  GET_ALL_USER_ERROR,
  GET_ALL_USER_SUCCESS,
  GET_USER_ROLE_BEGIN,
  GET_USER_ROLE_ERROR,
  GET_USER_ROLE_SUCCESS,
  GET_USERS_BEGIN,
  GET_USERS_ERROR,
  GET_USERS_SUCCESS,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
} from '../constant';

const initialState: UserState = {
  userData: [],
  allUserData: [],
  userRoleData: [],
  error: null,
  loading: false,
  isSuccess: false,
  isUserModifyLoading: false,
};

const userReducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case GET_USERS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.payload,
        error: null,
      };
    case GET_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        userData: [],
      };
    case GET_ALL_USER_BEGIN:
      return {
        ...state,
        error: null,
      };
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        allUserData: action.payload,
        error: null,
      };
    case GET_ALL_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        allUserData: [],
      };
    case GET_USER_ROLE_BEGIN:
      return {
        ...state,
        error: null,
      };
    case GET_USER_ROLE_SUCCESS:
      return {
        ...state,
        userRoleData: action.payload,
        error: null,
      };
    case GET_USER_ROLE_ERROR:
      return {
        ...state,
        error: action.payload,
        userRoleData: [],
      };
    case DELETE_USER_BEGIN:
      return {
        ...state,
        isUserModifyLoading: true,
        error: null,
        isSuccess: false,
      };
    case DELETE_USER_SUCCESS:
      const id = action.payload;
      const filterUsers = state.userData.users.filter(
        (user: any) => user._id !== id
      );
      return {
        ...state,
        isUserModifyLoading: false,
        userData: {
          ...state.userData,
          users: filterUsers,
        },
        isSuccess: true,
      };

    case DELETE_USER_ERROR:
      return {
        ...state,
        isUserModifyLoading: false,
        error: action.payload,
      };
    case UPDATE_USER_BEGIN:
      return {
        ...state,
        isUserModifyLoading: true,
        isSuccess: false,
      };
    case UPDATE_USER_SUCCESS:
      const editUser = action.payload?.data?.data?.user;
      return {
        ...state,
        isUserModifyLoading: false,
        userData: {
          ...state.userData,
          users: state.userData?.users?.map((user: any) =>
            user._id === editUser._id ? editUser : user
          ),
        },
        isSuccess: true,
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        isUserModifyLoading: false,
      };
    case ADD_USER_BEGIN:
      return {
        ...state,
        isUserModifyLoading: true,
        isSuccess: false,
      };
    case ADD_USER_SUCCESS:
      const newUser = action.payload.data?.data?.user;
      return {
        ...state,
        isUserModifyLoading: false,
        userData: {
          ...state.userData,
          users: [newUser, ...state?.userData?.users],
        },
        isSuccess: true,
      };
    case ADD_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        isUserModifyLoading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
