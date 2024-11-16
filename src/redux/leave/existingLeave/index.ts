import { ApiClient } from '../../../service/api';
import { EXISTING_LEAVE } from '../../../service/apiRoutes';

export const getExistingLeaveApi = async () => {
  let url = EXISTING_LEAVE;

  const config = {
    method: 'GET',
    url: url,
  };
  const res = await ApiClient(config);
  return res;
};
