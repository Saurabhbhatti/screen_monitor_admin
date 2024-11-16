import { ProjectAction, ProjectState } from '../../utils/type';
import {
  ADD_PROJECT_BEGIN,
  ADD_PROJECT_ERROR,
  ADD_PROJECT_SUCCESS,
  DELETE_PROJECT_BEGIN,
  DELETE_PROJECT_ERROR,
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

const initialState: ProjectState = {
  projectData: [],
  allProjectData: [],
  error: null,
  loading: false,
  isModifyingProject: false,
  isSuccess: false,
};

const projectReducer = (
  state: ProjectState = initialState,
  action: ProjectAction,
): ProjectState => {
  switch (action.type) {
    case GET_PROJECT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projectData: action.payload,
        error: null,
      };
    case GET_PROJECT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        projectData: [],
      };
    case GET_ALL_PROJECT_BEGIN:
      return {
        ...state,
        error: null,
      };
    case GET_ALL_PROJECT_SUCCESS:
      return {
        ...state,
        allProjectData: action.payload,
        error: null,
      };
    case GET_ALL_PROJECT_ERROR:
      return {
        ...state,
        error: action.payload,
        allProjectData: [],
      };
    case ADD_PROJECT_BEGIN:
      return {
        ...state,
        isModifyingProject: true,
        isSuccess: false,
      };
    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        isModifyingProject: false,
        isSuccess: true,
        projectData: {
          ...state.projectData,
          data: [action.payload?.data, ...state.projectData?.data],
        },
      };
    case ADD_PROJECT_ERROR:
      return {
        ...state,
        error: action.payload,
        isModifyingProject: false
      };
    case UPDATE_PROJECT_BEGIN:
      return {
        ...state,
        isModifyingProject: true,
        isSuccess: false,
      };
    case UPDATE_PROJECT_SUCCESS:
      const projectData = state.projectData?.data ?? [];
      const index = projectData.findIndex(
        (project: any) => project._id === action.payload?.data?._id,
      );
      const updatedProjects = [...projectData];
      updatedProjects[index] = action.payload?.data;
      return {
        ...state,
        isModifyingProject: false,
        projectData: {
          ...state.projectData,
          data: updatedProjects,
        },
        isSuccess: true,
      };
    case UPDATE_PROJECT_ERROR:
      return {
        ...state,
        error: action.payload,
        isModifyingProject: false
      };
    case DELETE_PROJECT_BEGIN:
      return {
        ...state,
        error: null,
      };
    case DELETE_PROJECT_SUCCESS:
      const projectId = action.payload;
      const filteredProjects = state.projectData?.data.filter(
        (project: any) => project._id !== projectId,
      );
      return {
        ...state,
        projectData: {
          ...state.projectData,
          data: filteredProjects,
        },
      };
    case DELETE_PROJECT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default projectReducer;
