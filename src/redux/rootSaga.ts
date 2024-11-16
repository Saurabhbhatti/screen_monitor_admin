import { all } from 'redux-saga/effects';
import {
  changePasswordRequest,
  forgotPasswordRequest,
  LoginRequest,
} from './auth/saga';
import {
  addProjectRequest,
  deleteProjectRequest,
  getAllProjectRequest,
  getProjectRequest,
  updateProjectRequest,
} from './project/saga';
import {
  addCompanyRequest,
  deleteCompanyRequest,
  getCompanyRequest,
  updateCompanyRequest,
} from './company/saga';
import {
  getTimeActivityRequest,
  getTimeLineRequest,
} from './time-activity/saga';
import screenshotSaga from './screenshot/saga';
import {
  addUserRequest,
  deleteUserRequest,
  getAllUserRequest,
  getUserRequest,
  getUserRoleRequest,
  updateUserRequest,
} from './user/saga';
import dsrSaga from './dsr/saga';
import { watchTimeRequestSagas } from './TimeRequest/saga';
import leaveSaga from './leave/saga';
import leaveGetSaga from './leave/leaveGetData/saga';
import { leaveApprovalSaga } from './leave/leavePostData/saga';
import { watchHolidays } from './holiday/saga';
import { watchApproveCompOff, watchFetchCompOff } from './compoff/saga';
import { getAttendanceWatcher, getTimeLineWatcher } from './attendance/saga';
import existingLeaveGetSaga from './leave/existingLeave/saga';
import leaveHistorySaga from './leave/leaveHistory/saga';
import settingSaga from './setting/saga';
import { watchFetchProfile } from './profile/saga';

export default function* rootSaga() {
  yield all([
    LoginRequest(),
    forgotPasswordRequest(),
    changePasswordRequest(),
    getProjectRequest(),
    addProjectRequest(),
    deleteProjectRequest(),
    updateProjectRequest(),
    getCompanyRequest(),
    addCompanyRequest(),
    updateCompanyRequest(),
    getUserRequest(),
    dsrSaga(),
    deleteUserRequest(),
    addUserRequest(),
    updateUserRequest(),
    deleteCompanyRequest(),
    getAllProjectRequest(),
    getUserRoleRequest(),
    getTimeActivityRequest(),
    watchTimeRequestSagas(),
    screenshotSaga(),
    getAllUserRequest(),
    getTimeLineRequest(),
    leaveSaga(),
    leaveGetSaga(),
    leaveApprovalSaga(),
    watchHolidays(),
    watchFetchCompOff(),
    watchApproveCompOff(),
    getAttendanceWatcher(),
    getTimeLineWatcher(),
    existingLeaveGetSaga(),
    leaveHistorySaga(),
    settingSaga(),
    watchFetchProfile(),
  ]);
}
