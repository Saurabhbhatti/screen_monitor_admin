import { TimeActivityPayload, TimeLinePaylod } from "../../utils/type";
import { GET_TIME_ACTIVITY_BEGIN, GET_TIMELINE_BEGIN } from "../constant";

export const getTimeActivityRequest = (payload: TimeActivityPayload) => ({
  type: GET_TIME_ACTIVITY_BEGIN,
  payload,
});

export const getTimeLineRequest=(payload:TimeLinePaylod)=>({
  type: GET_TIMELINE_BEGIN,
  payload,
})