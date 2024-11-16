import { ApiClient } from '../../service/api';
import {
  ADD_USER_END_POINT,
  DELETE_USER_END_POINT,
  GET_ALL_USER_END_POINT,
  GET_USER_LIST_END_POINT,
  GET_USER_ROLES_END_POINT,
  POST_LEAVE_END_POINT,
  UPDATE_USER_END_POINT,
} from '../../service/apiRoutes';
import { User, UserPayload } from '../../utils/type';

export const getUserApi = async (payload: UserPayload) => {
  let url = GET_USER_LIST_END_POINT;
  let queryParams: any = {};
  const { page, rowsPerPage, searchTerm, status } = payload;
  if (status !== 'active' && status !== 'inactive' && page) {
    queryParams.offset = page;
  }

  if (rowsPerPage) {
    queryParams.limit = rowsPerPage;
  }

  if (searchTerm) {
    queryParams.searchText = searchTerm;
  }

  if (status) {
    queryParams.status = status;
  }
  const queryString = new URLSearchParams(queryParams).toString();
  if (queryString) {
    url += `?${queryString}`;
  }
  const config = {
    method: 'GET',
    url: url,
  };
  const res = await ApiClient(config);
  return res;
};

export const deleteUserApi = async (data: null) => {
  const config = {
    method: 'DELETE',
    url: DELETE_USER_END_POINT,
    data,
  };
  const res = await ApiClient(config);
  return res;
};

export const addUserApi = async (data: User) => {
  const config = {
    method: 'POST',
    url: ADD_USER_END_POINT,
    data,
  };
  const res = await ApiClient(config);
  return res;
};

export const updateUserApi = async (data: User) => {
  const config = {
    method: 'POST',
    url: UPDATE_USER_END_POINT,
    data,
  };
  const res = await ApiClient(config);
  return res;
};

export const getAllUserApi = async () => {
  let url = GET_ALL_USER_END_POINT;

  const config = {
    method: 'GET',
    url: url,
  };
  const res = await ApiClient(config);
  return res;
};
export const leaveApi = async (data: any) => {
  let url = POST_LEAVE_END_POINT;

  const config = {
    method: 'POST',
    url: url,
    data,
  };
  const res = await ApiClient(config);
  return res;
};
export const getUserRoleApi = async () => {
  let url = GET_USER_ROLES_END_POINT;

  const config = {
    method: 'GET',
    url: url,
  };
  const res = await ApiClient(config);
  return res;
};
