import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  addProjectApi,
  deleteProjectApi,
  getAllProjectApi,
  getProjectApi,
  updateProjectApi
} from '.';
import { handleApiError } from '../../utils';
import {
  ADD_PROJECT_BEGIN,
  ADD_PROJECT_ERROR,
  ADD_PROJECT_SUCCESS,
  DELETE_PROJECT_BEGIN,
  DELETE_PROJECT_SUCCESS,
  GET_ALL_PROJECT_BEGIN,
  GET_ALL_PROJECT_ERROR,
  GET_ALL_PROJECT_SUCCESS,
  GET_PROJECT_BEGIN,
  GET_PROJECT_ERROR,
  GET_PROJECT_SUCCESS,
  UPDATE_PROJECT_BEGIN,
  UPDATE_PROJECT_ERROR,
  UPDATE_PROJECT_STATUS_BEGIN,
  UPDATE_PROJECT_STATUS_ERROR,
  UPDATE_PROJECT_STATUS_SUCCESS,
  UPDATE_PROJECT_SUCCESS,
} from '../constant';
import {
  AddProjectRequestAction,
  DeleteProjectRequestAction,
  ProjectApiResponse,
  ProjectRequestAction,
  UpdateProjectRequestAction,
  UpdateProjectStatusRequestAction,
} from '../../utils/type';

function* fetchProjectData(action: ProjectRequestAction) {
  try {
    const response: ProjectApiResponse = yield call(
      getProjectApi,
      action.payload,
    );
    const { status } = response?.data;
    if (status && status === true) {
      yield put({
        type: GET_PROJECT_SUCCESS,
        payload: response?.data,
      });
    }
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: GET_PROJECT_ERROR,
      payload: errorData,
    });
  }
}

function* addProjectData(action: AddProjectRequestAction) {
  try {
    const response: ProjectApiResponse = yield call(
      addProjectApi,
      action.payload,
    );
    const data = response?.data;
    if (data) {
      yield put({
        type: ADD_PROJECT_SUCCESS,
        payload: data,
      });
      toast.success(data?.message);
    }
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: ADD_PROJECT_ERROR,
      payload: errorData,
    });
  }
}

function* deleteProjectData(action: DeleteProjectRequestAction) {
  try {
    const response: ProjectApiResponse = yield call(
      deleteProjectApi,
      action.payload,
    );
    const data = response?.data;
    if (data) {
      yield put({
        type: DELETE_PROJECT_SUCCESS,
        payload: action?.payload?.id,
      });
      toast.success(data?.message);
    }
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: DELETE_PROJECT_SUCCESS,
      payload: errorData,
    });
  }
}

function* updateProjectData(action: UpdateProjectRequestAction) {
  try {
    const response: ProjectApiResponse = yield call(
      updateProjectApi,
      action.payload,
    );
    const data = response?.data;
    if (data) {
      yield put({
        type: UPDATE_PROJECT_SUCCESS,
        payload: data,
      });
      toast.success(data?.message);
    }
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: UPDATE_PROJECT_ERROR,
      payload: errorData,
    });
  }
}

function* fetchAllProjectData() {
  try {
    const response: ProjectApiResponse = yield call(
      getAllProjectApi
    );
    const { status } = response?.data;
    if (status && status === true) {
      yield put({
        type: GET_ALL_PROJECT_SUCCESS,
        payload: response?.data,
      });
    }
  } catch (error) {
    const errorData = handleApiError(error);
    yield put({
      type: GET_ALL_PROJECT_ERROR,
      payload: errorData,
    });
  }
}

export function* getAllProjectRequest() {
  yield takeLatest(GET_ALL_PROJECT_BEGIN, fetchAllProjectData);
}

export function* getProjectRequest() {
  yield takeLatest(GET_PROJECT_BEGIN, fetchProjectData);
}

export function* addProjectRequest() {
  yield takeLatest(ADD_PROJECT_BEGIN, addProjectData);
}

export function* deleteProjectRequest() {
  yield takeLatest(DELETE_PROJECT_BEGIN, deleteProjectData);
}

export function* updateProjectRequest() {
  yield takeLatest(UPDATE_PROJECT_BEGIN, updateProjectData);
}

