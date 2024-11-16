import { ApiClient } from "../../service/api";
import { GET_SCREENSHOT_END_POINT } from "../../service/apiRoutes";
import { ScreenShotPayload } from "../../utils/type";

export const screenShortApi = async (payload: ScreenShotPayload) => {
  const config = {
    method: 'POST',
    url: `${GET_SCREENSHOT_END_POINT}`,
    data: payload
  }
  const res = await ApiClient(config);
  return res;
}