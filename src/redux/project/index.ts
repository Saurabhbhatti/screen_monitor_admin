import { ApiClient } from '../../service/api';
import { GET_ALL_PROJECT_END_POINT, PROJECT_LIST_END_POINT, UPDATE_PROJECT_END_POINT ,ADD_PROJECT_END_POINT, DELETE_PROJECT_END_POINT} from '../../service/apiRoutes';

export const addProjectApi = async (data: any) => {
  const config = {
    method: 'POST',
    url: ADD_PROJECT_END_POINT,
    data,
  };
  const res = await ApiClient(config);
  return res;
};

export const getProjectApi = async (payload: any) => {
  let url = PROJECT_LIST_END_POINT;
  const queryParams: any = {};
  const { page, rowsPerPage } = payload;

  if (page && rowsPerPage) {
    queryParams.offset = page;
    queryParams.limit = rowsPerPage;
  }

  const queryString = new URLSearchParams(queryParams).toString();
  if (queryString) {
    url += `?${queryString}`;
  }
  const config = {
    method: 'POST',
    url: url,
    data: payload
  };
  const res = await ApiClient(config);
  return res;
};

export const getAllProjectApi = async () => {
  let url = GET_ALL_PROJECT_END_POINT;

  const config = {
    method: 'GET',
    url: url
  };
  const res = await ApiClient(config);
  return res;
};

export const deleteProjectApi = async (data: any) => {
  const config = {
    method: 'DELETE',
    url: DELETE_PROJECT_END_POINT,
    data,
  };
  const res = await ApiClient(config);
  return res;
};

export const updateProjectApi = async (data: any) => {
  const config = {
    method: 'POST',
    url: UPDATE_PROJECT_END_POINT,
    data,
  };
  const res = await ApiClient(config);
  return res;
};

