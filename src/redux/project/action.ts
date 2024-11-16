import { DeleteProjectType } from '../../utils/type';
import {
  ADD_PROJECT_BEGIN,
  DELETE_PROJECT_BEGIN,
  GET_ALL_PROJECT_BEGIN,
  GET_PROJECT_BEGIN,
  UPDATE_PROJECT_BEGIN,
  UPDATE_PROJECT_STATUS_BEGIN,
} from '../constant';

export const projectRequest = (payload = {}) => ({
  type: GET_PROJECT_BEGIN,
  payload,
});

export const getAllProjectRequest = () => ({
  type: GET_ALL_PROJECT_BEGIN
})

export const addProjectRequest = (payload: any) => ({
  type: ADD_PROJECT_BEGIN,
  payload,
});

export const deleteProjectRequest = (projectId: DeleteProjectType) => ({
  type: DELETE_PROJECT_BEGIN,
  payload: projectId,
});

export const updateProjectRequest = (payload: any) => ({
  type: UPDATE_PROJECT_BEGIN,
  payload,
});
