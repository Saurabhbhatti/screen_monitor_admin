import { ADD_COMPANY_BEGIN, DELETE_COMPANY_BEGIN, GET_COMPANY_BEGIN, UPDATE_COMPANY_BEGIN } from '../constant';

export const getCompanyRequest = (payload: any) => ({
  type: GET_COMPANY_BEGIN,
  payload,
});

export const addCompanyRequest = (payload: any) => ({
  type: ADD_COMPANY_BEGIN,
  payload,
});

export const updateCompanyRequest = (payload: any) => ({
  type: UPDATE_COMPANY_BEGIN,
  payload,
});

export const deleteCompanyRequest = (companyId: any) => ({
  type: DELETE_COMPANY_BEGIN,
  payload: companyId
})



