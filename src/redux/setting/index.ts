import { ApiClient } from '../../service/api';
import { ADD_UPDATE_SETTING_END_POINT } from '../../service/apiRoutes';
import { SettingPayload } from '../../utils/type';

export const addUpdateSettingApi = async (payload: SettingPayload) => {
  const config = {
    method: 'PATCH',
    url: `${ADD_UPDATE_SETTING_END_POINT}`,
    data: payload,
  };
  const res = await ApiClient(config);
  return res;
};

export const getSettingApi = async () => {
  const config = {
    method: 'GET',
    url: 'admin/setting',
  };
  const res = await ApiClient(config);
  return res;
};
