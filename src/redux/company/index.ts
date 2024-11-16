import { ApiClient } from '../../service/api';
import { ADD_COMPANY_END_POINT, COMPANY_LIST_END_POINT, DELETE_COMPANY_END_POINT, UPDATE_COMPANY_END_POINT } from '../../service/apiRoutes';

export const getCompanyApi = async (payload: any) => {
  let url = COMPANY_LIST_END_POINT;
  const queryParams: any = {};
  const { page, rowsPerPage, searchTeam } = payload
  if (page && rowsPerPage) {
    queryParams.offset = page;
    queryParams.limit = rowsPerPage;
  }

  if (searchTeam) {
    queryParams.search = searchTeam;
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

export const addCompanyApi = async (data: any) => {
  const config = {
    method: 'POST',
    url: ADD_COMPANY_END_POINT,
    data,
  };
  const res = await ApiClient(config);
  return res;
};

export const updateCompanyApi = async (data: any) => {
  const config = {
    method: 'PATCH',
    url: UPDATE_COMPANY_END_POINT,
    data,
  };
  const res = await ApiClient(config);
  return res;
};

export const deleteCompanyApi = async (data: any) => {
  const config = {
    method: 'DELETE',
    url: DELETE_COMPANY_END_POINT,
    data,
  };
  const res = await ApiClient(config);
  return res;
};
