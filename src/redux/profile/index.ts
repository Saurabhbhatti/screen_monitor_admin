import { ApiClient } from '../../service/api';
import { PROFILE_END_POINT } from '../../service/apiRoutes';

let url = PROFILE_END_POINT;

export const fetchProfileApi = async () => {
  const config = {
    method: 'GET',
    url: url,
  };
  const res = await ApiClient(config);
  return res;
};

export const updateProfileApi = async (data: any) => {
  const isFormData = data instanceof FormData;

  const config = {
    method: 'PATCH',
    url: url,
    data,
    headers: {
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
    },
  };

  const res = await ApiClient(config);
  return res;
};
