import { FETCH_SCREENSHOT_DATA_REQUEST } from "../constant";

export const fetchScreenshotDataRequest = (data: any) => ({
  type: FETCH_SCREENSHOT_DATA_REQUEST,
  payload: data,
});