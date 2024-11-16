import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import themeConfigSlice from './themeConfigSlice';
import projectReducer from './project/reducer';
import companyReducer from './company/reducer';
import userReducer from './user/reducer';
import timeActivityReducer from './time-activity/reducer';
import screenshotReducer from './screenshot/reducer';
import dsrReducer from './dsr/reducer';
import timeRequestReducer from './TimeRequest/reducer';
import leaveReducer from './leave/reducer';
import leaveRecordsReducer from './leave/leaveGetData/reducer';
import leaveApprovalReducer from './leave/leavePostData/reducer';
import holidayReducer from './holiday/reducer';
import compOffReducer from './compoff/reducer';
import attendanceReducer from './attendance/reducer';
import existingLeavReducer from './leave/existingLeave/reducer';
import leaveHistoryReducer from './leave/leaveHistory/reducer';
import settingsReducer from './setting/reducer';
import profileReducer from './profile/reducer';

const rootReducer = combineReducers({
  themeConfig: themeConfigSlice,
  auth: authReducer,
  projects: projectReducer,
  company: companyReducer,
  user: userReducer,
  dsr: dsrReducer,
  timeActivity: timeActivityReducer,
  timeRequest: timeRequestReducer,
  screenshot: screenshotReducer,
  leave: leaveReducer,
  leaveRecords: leaveRecordsReducer,
  leaveRequest: leaveApprovalReducer,
  holidayReducer: holidayReducer,
  compoff: compOffReducer,
  attendance: attendanceReducer,
  existingLeave: existingLeavReducer,
  leaveHistory: leaveHistoryReducer,
  settings: settingsReducer,
  profile: profileReducer,
});

export default rootReducer;
export type IRootState = ReturnType<typeof rootReducer>;
