import { call, put, takeLatest } from 'redux-saga/effects';
import {
  addCompanyApi,
  deleteCompanyApi,
  getCompanyApi,
  updateCompanyApi,
} from '.';
import { handleApiError } from '../../utils';
import {
  ADD_COMPANY_BEGIN,
  ADD_COMPANY_ERROR,
  ADD_COMPANY_SUCCESS,
  DELETE_COMPANY_BEGIN,
  DELETE_COMPANY_ERROR,
  DELETE_COMPANY_SUCCESS,
  GET_COMPANY_BEGIN,
  GET_COMPANY_ERROR,
  GET_COMPANY_SUCCESS,
  UPDATE_COMPANY_BEGIN,
  UPDATE_COMPANY_ERROR,
  UPDATE_COMPANY_SUCCESS,
} from '../constant';
import { toast } from 'react-toastify';
import {
  CompanyApiResponse,
  CompanyRequestAction,
  AddCompanyRequestAction,
  UpdateCompanyRequestAction,
} from '../../utils/type';

export function* fetchCompanyData(action: CompanyRequestAction) {
  try {
    const response: CompanyApiResponse = yield call(
      getCompanyApi,
      action.payload
    );
    const { status, data, total } = response?.data;
    if (status && status === true) {
      yield put({
        type: GET_COMPANY_SUCCESS,
        payload: { company: data, total },
      });
    }
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: GET_COMPANY_ERROR,
      payload: errorData,
    });
  }
}

export function* getCompanyRequest() {
  yield takeLatest(GET_COMPANY_BEGIN, fetchCompanyData);
}

function* addCompanyData(action: AddCompanyRequestAction) {
  try {
    const data: CompanyApiResponse = yield call(addCompanyApi, action.payload);

    if (data) {
      yield put({
        type: ADD_COMPANY_SUCCESS,
        payload: data,
      });
      toast.success(data?.data?.message);
    }
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: ADD_COMPANY_ERROR,
      payload: errorData,
    });
  }
}

function* updateCompanyData(action: UpdateCompanyRequestAction) {
  try {
    const data: CompanyApiResponse = yield call(
      updateCompanyApi,
      action.payload
    );
    if (data) {
      yield put({
        type: UPDATE_COMPANY_SUCCESS,
        payload: data,
      });
      toast.success(data?.data?.message);
    }
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: UPDATE_COMPANY_ERROR,
      payload: errorData,
    });
  }
}

export function* deleteCompanyData(action: CompanyRequestAction) {
  try {
    const data: CompanyApiResponse = yield call(
      deleteCompanyApi,
      action.payload
    );
    yield put({
      type: DELETE_COMPANY_SUCCESS,
      payload: action.payload.companyId,
    });
    toast.success(data?.data?.message);
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: DELETE_COMPANY_ERROR,
      payload: errorData,
    });
  }
}

export function* deleteCompanyRequest() {
  yield takeLatest(DELETE_COMPANY_BEGIN, deleteCompanyData);
}

export function* addCompanyRequest() {
  yield takeLatest(ADD_COMPANY_BEGIN, addCompanyData);
}

export function* updateCompanyRequest() {
  yield takeLatest(UPDATE_COMPANY_BEGIN, updateCompanyData);
}
