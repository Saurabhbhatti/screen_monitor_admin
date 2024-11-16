import { ApiClient } from '../../service/api';
import { DELETE_HOLIDAY_END_POINT, GET_HOLIDAY_REQUEST_ENDPOINT } from '../../service/apiRoutes';

export const fetchGetHolidaysApi = async (data: string) => {
  const url = GET_HOLIDAY_REQUEST_ENDPOINT;
  const config = { method: 'GET', url: url, data };
  const res = await ApiClient(config);
  return res;
};

export const addHolidayApi = async (data: { name: string; date: string }) => {
  const url = GET_HOLIDAY_REQUEST_ENDPOINT;
  const config = { method: 'POST', url: url, data };
  const res = await ApiClient(config);
  return res;
};

export const editHolidayApi = async (data: {
  holidayId: string;
  holidayData: { name: string; date: string };
}) => {
  const url = GET_HOLIDAY_REQUEST_ENDPOINT;
  const config = { method: 'PATCH', url: url, data };

  const res = await ApiClient(config);

  return res;
};

export const deleteHolidayApi = async (holidayIds: string[]) => {
  const url = `${DELETE_HOLIDAY_END_POINT}`;
  const config = { method: 'DELETE', url: url, data: { holidayIds } };
  const res = await ApiClient(config);
  return res;
};
