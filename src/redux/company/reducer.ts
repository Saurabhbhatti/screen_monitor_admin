import { CompanyAction, CompanyState } from '../../utils/type';
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

const intialState: CompanyState = {
  companyData: [],
  error: null,
  loading: false,
  isSuccess: false,
  isModifyCompanyLoading: false,
};

const companyReducer = (
  state: CompanyState = intialState,
  action: CompanyAction
): CompanyState => {
  switch (action.type) {
    case GET_COMPANY_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        companyData: action.payload,
        error: null,
      };
    case GET_COMPANY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        companyData: null,
      };
    case ADD_COMPANY_BEGIN:
      return {
        ...state,
        isModifyCompanyLoading: true,
        isSuccess: false,
      };
    case ADD_COMPANY_SUCCESS:
      const { data } = action.payload?.data || {};
      const newUser = data?.user;
      const newCompany = data?.company;

      const newObject = {
        _id: newCompany?._id,
        user: newUser,
        company: newCompany,
      };

      return {
        ...state,
        isModifyCompanyLoading: false,
        companyData: {
          ...state.companyData,
          company: [newObject, ...(state.companyData?.company || [])],
        },
        isSuccess: true,
      };
    case ADD_COMPANY_ERROR:
      return {
        ...state,
        error: action.payload,
        isModifyCompanyLoading: false,
      };
    case DELETE_COMPANY_BEGIN:
      return {
        ...state,
        isModifyCompanyLoading: true,
        error: null,
      };
    case DELETE_COMPANY_SUCCESS:
      const companyId = action.payload;
      const filterCompany = state.companyData?.company?.filter(
        (company: any) => company?._id !== companyId
      );
      return {
        ...state,
        isModifyCompanyLoading: false,
        companyData: {
          ...state.companyData,
          company: filterCompany,
        },
      };

    case DELETE_COMPANY_ERROR:
      return {
        ...state,
        isModifyCompanyLoading: false,
        error: action.payload,
      };
    case UPDATE_COMPANY_BEGIN:
      return {
        ...state,
        isModifyCompanyLoading: true,
        isSuccess: false,
      };
    case UPDATE_COMPANY_SUCCESS:
      const { user, company } = action.payload?.data?.data || {};
      const updatedCompany = {
        user,
        company,
      };
      return {
        ...state,
        isModifyCompanyLoading: false,
        companyData: {
          ...state.companyData,
          company: state.companyData?.company?.map((comp: any) =>
            comp?._id === updatedCompany?.company?._id
              ? {
                  ...comp,
                  company: updatedCompany.company,
                  user: updatedCompany.user,
                }
              : comp
          ),
        },
        isSuccess: true,
      };

    case UPDATE_COMPANY_ERROR:
      return {
        ...state,
        error: action.payload,
        isModifyCompanyLoading: false,
        isSuccess: false,
      };

    default:
      return state;
  }
};

export default companyReducer;
