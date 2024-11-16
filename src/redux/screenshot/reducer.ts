import { ScreenShotAction, ScreenShotState } from "../../utils/type";
import { FETCH_SCREENSHOT_DATA_FAILURE, FETCH_SCREENSHOT_DATA_REQUEST, FETCH_SCREENSHOT_DATA_SUCCESS } from "../constant";

const initialState: ScreenShotState = {
  screenshots: [],
  loading: false,
  error: null
};
const screenshotReducer = (state:ScreenShotState = initialState, action: ScreenShotAction):ScreenShotState => {
  switch (action.type) {
    case FETCH_SCREENSHOT_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_SCREENSHOT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        screenshots: action?.payload,
      };
    case FETCH_SCREENSHOT_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload??null,
        screenshots: []
      };
    default:
      return state;
  }
};
export default screenshotReducer;