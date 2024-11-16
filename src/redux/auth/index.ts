import { ApiClient } from "../../service/api";
import { CHANGE_PASSWORD_END_POINT, FORGOT_PASSWORD_END_POINT, LOGIN_END_POINT } from "../../service/apiRoutes";

export const loginApi = async (data: any) => {
  const config = {
    method: 'POST',
    url: LOGIN_END_POINT,
    data,
  };
  const res = await ApiClient(config);
  return res;
};

export const forgotPasswordApi = async (data: any) => {
  const config = {
    method: 'POST',
    url: FORGOT_PASSWORD_END_POINT,
    data,
  };
  const res = await ApiClient(config);
  return res;
};

export const changePassword = async (data: any) => {
  const config = {
    method: 'PUT',
    url: CHANGE_PASSWORD_END_POINT,
    data,
  };
  const res = await ApiClient(config);
  return res;
};