import {
  AddEditUserPayload,
  DeleteUserType,
  UserPayload,
} from '../../utils/type';
import {
  ADD_USER_BEGIN,
  DELETE_USER_BEGIN,
  GET_ALL_USER_BEGIN,
  GET_USER_ROLE_BEGIN,
  GET_USERS_BEGIN,
  UPDATE_USER_BEGIN,
} from '../constant';

export const userRequest = (payload: UserPayload) => ({
  type: GET_USERS_BEGIN,
  payload,
});

export const getAllUserRoleRequest = () => ({
  type: GET_USER_ROLE_BEGIN,
});

export const deleteUserRequest = (userId: DeleteUserType) => ({
  type: DELETE_USER_BEGIN,
  payload: userId,
});

export const addUserRequest = (payload: AddEditUserPayload) => ({
  type: ADD_USER_BEGIN,
  payload,
});

export const updateUserRequest = (payload: AddEditUserPayload) => ({
  type: UPDATE_USER_BEGIN,
  payload,
});

export const getAllUserRequest = () => ({
  type: GET_ALL_USER_BEGIN,
});
