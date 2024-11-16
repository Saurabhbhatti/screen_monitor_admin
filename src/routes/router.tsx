import { Navigate, Route, Routes } from 'react-router-dom';
import { BlankLayout, DefaultLayout } from '../layouts';
import { PrivateRoute, PublicRoute } from '.';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/DashBoard/DashBoard';
import TeamMember from '../pages/TeamMembers/TeamMembers';
import Timeactivity from '../pages/TimeActivity/TimeActivity';
import Project from '../pages/Projects/Projects';
import Screenshot from '../pages/ScreenShot/Screenshot';
import Dsr from '../pages/Dsr/DsrPage';
import Calendar from '../pages/Calendar/Calendar';
import Profile from '../pages/Profile/Profile';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import ChangePassword from '../pages/ChangePassword/ChangePassword';
import CompanyModule from '../pages/Company/CompanyModule';
// import Leave from '../pages/Leave/Leave';
import NotFound from '../pages/NoFound/NoFound';
import TimeRegulation from '../pages/TimeRegulate/TimeRegulation';
import AttendanceTable from '../pages/Attendance/Attendance';
import CompOff from '../pages/CompOff/CompOff';
import LeavePage from '../pages/Leave/leavepage';
import Holidays from '../pages/Holiday/Holiday';
import { LeaveHistory } from '../pages/Leave/LeaveHistory/Leavehistory';
import Setting from '../pages/Settings/Setting';

const Router = () => {
  return (
    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route element={<PublicRoute />}>
        <Route index element={<Navigate replace to='/signin' />} />
        <Route
          path='/signin'
          element={
            <BlankLayout>
              <Login />
            </BlankLayout>
          }
        />
        <Route
          path='/forgotpassword'
          element={
            <BlankLayout>
              <ForgotPassword />
            </BlankLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route
          path='/company'
          element={
            <DefaultLayout>
              <CompanyModule />
            </DefaultLayout>
          }
        />
        <Route
          path='/change-password'
          element={
            <DefaultLayout>
              <ChangePassword />
            </DefaultLayout>
          }
        />
        <Route
          path='/dashboard'
          element={
            <DefaultLayout>
              <Dashboard />
            </DefaultLayout>
          }
        />
        <Route
          path='/team-member'
          element={
            <DefaultLayout>
              <TeamMember />
            </DefaultLayout>
          }
        />
        <Route
          path='/time-activity'
          element={
            <DefaultLayout>
              <Timeactivity />
            </DefaultLayout>
          }
        />
        <Route
          path='/projects'
          element={
            <DefaultLayout>
              <Project />
            </DefaultLayout>
          }
        />
        <Route
          path='/screenshot'
          element={
            <DefaultLayout>
              <Screenshot />
            </DefaultLayout>
          }
        />
        <Route
          path='/dsr'
          element={
            <DefaultLayout>
              <Dsr />
            </DefaultLayout>
          }
        />
        <Route
          path='/leave'
          element={
            <DefaultLayout>
              {/* <Leave /> */}
              <LeavePage />
            </DefaultLayout>
          }
        />
         <Route
          path='/leavehistory'
          element={
            <DefaultLayout>
              {/* <Leave /> */}
              <LeaveHistory />
            </DefaultLayout>
          }
        />
        <Route
          path='/calendar'
          element={
            <DefaultLayout>
              <Calendar />
            </DefaultLayout>
          }
        />

        <Route
          path='/timeregulate'
          element={
            <DefaultLayout>
              <TimeRegulation />
            </DefaultLayout>
          }
        />

        <Route
          path='/attendance'
          element={
            <DefaultLayout>
              <AttendanceTable />
            </DefaultLayout>
          }
        />

        <Route
          path='/compoff'
          element={
            <DefaultLayout>
              <CompOff />
            </DefaultLayout>
          }
        />

        <Route
          path='/holiday'
          element={
            <DefaultLayout>
              <Holidays />
            </DefaultLayout>
          }
        />
        <Route
          path='/settings'
          element={
            <DefaultLayout>
              <Setting />
            </DefaultLayout>
          }
        />
        <Route
          path='/profile'
          element={
            <DefaultLayout>
              <Profile />
            </DefaultLayout>
          }
        />
      </Route>
    </Routes>
  );
};

export default Router;
