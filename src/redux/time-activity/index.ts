import { ApiClient } from "../../service/api";
import { GET_TIMELINE_END_POINT, TIME_ACTIVITY_END_POINT } from "../../service/apiRoutes";
import { TimeActivityPayload, TimeActivityQueryParams, TimeLinePaylod } from "../../utils/type";

export const getTimeActivityApi = async (payload: TimeActivityPayload) => {
  let url = TIME_ACTIVITY_END_POINT;
  const queryParams: TimeActivityQueryParams = {}; 
  const { page, rowsPerPage } = payload
  if (page && rowsPerPage) {
    queryParams.offset = page;
    queryParams.limit = rowsPerPage;
  }

  const queryString = new URLSearchParams(queryParams as Record<string, string>).toString();
  if (queryString) {
    url += `?${queryString}`;
  }
  const config = {
    method: 'POST',
    url: url,
    data: payload
  };
  const res = await ApiClient(config);
  return res;
};


export const getTimeLineApi = async (payload: TimeLinePaylod) => {
  let url = GET_TIMELINE_END_POINT;

  const config = {
    method: 'POST',
    url: url,
    data: payload
  };
  const res = await ApiClient(config);
  return res;
};