import React, { useState, useEffect, useCallback, Fragment } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import IconSearch from '../../components/Icon/IconSearch';
import './TimeActivity.css';
import TimeLineModal from './TimeLineModal';
import TimeActivityTable from './TimeActivityTable';
import { getAllProjectRequest } from '../../redux/project/action';
import { getAllUserRequest } from '../../redux/user/action';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTimeActivityRequest,
  getTimeLineRequest,
} from '../../redux/time-activity/action';
import {
  DateRange,
  MemberOption,
  OptionType,
  ProjectOption,
  Projects,
  TeamMember,
  TimeActivities,
  TimeActivityPayload,
  TimeActivityRootState,
  TimeLinePaylod,
} from '../../utils/type';
import {
  getUserRole,
  getUnixTimestamps,
  useDebouncedValue,
  itemsPerPage,
  getUnixTimestampsSingleDate,
  getEndOfCurrentWeek,
  findProjectsByMembers,
  hasPermission,
  getPreviosSevenDays,
  formatDateRange,
} from '../../utils';
import SearchSelect from '../../components/CustomSelect/CustomSelect';
import Search from '../../components/SearchInput/SearchInput';

export const TimeActivity: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>(
    getPreviosSevenDays() as DateRange
  );
  const [selectedProject, setSelectedProject] = useState<OptionType[]>([]);
  const [selectedMember, setSelectedMember] = useState<OptionType[]>([]);
  const [openTimeActivityModal, setTimeActivityModal] =
    useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [activities, setActivities] = useState<TimeActivities[]>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const [timeLineDate, setTimeLineDate] = useState<string>('');
  const [projectOption, setProjectOption] = useState<OptionType[]>([]);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);

  const dispatch = useDispatch();
  const { allUserData } = useSelector((state: TeamMember) => state.user);
  const { allProjectData } = useSelector((state: Projects) => state.projects);
  const { timeActivityData, loading, timeLineData, timeLineLoading } =
    useSelector((state: TimeActivityRootState) => state.timeActivity);
  const userRole = getUserRole();
  const debouncedSearchTerm = useDebouncedValue(search, 500);

  const allProjectOptions: OptionType[] =
    allProjectData?.data?.map(({ projectName, _id }: ProjectOption) => ({
      label: projectName,
      value: _id,
    })) || [];

  const memberOptions: OptionType[] =
    allUserData?.data?.map(({ firstName, _id }: MemberOption) => ({
      label: firstName,
      value: _id,
    })) || [];

  useEffect(() => {
    if (timeActivityData?.total) {
      setTotalPageCount(Math.ceil(timeActivityData.total / itemsPerPage));
    }
  }, [timeActivityData]);

  useEffect(() => {
    const selectedUserValues =
      selectedMember.map((member) => member.value) || [];
    const memberInProject = findProjectsByMembers(
      selectedUserValues,
      allProjectData?.data || []
    );
    setProjectOption(memberInProject);
  }, [selectedMember, allProjectData]);

  useEffect(() => {
    if (dateRange.length === 2) {
      const [startUnixTime, endUnixTime] = getUnixTimestamps(dateRange);
      const requestParams: TimeActivityPayload = {
        page: activePage,
        rowsPerPage: itemsPerPage,
        startTime: startUnixTime,
        endTime: endUnixTime,
        searchText: debouncedSearchTerm,
      };
      if (selectedProject.length > 0) {
        requestParams.projectId = selectedProject.map((option) => option.value);
      }

      if (selectedMember.length > 0) {
        requestParams.memberId = selectedMember.map((option) => option.value);
      }
      if (selectedProject.length !== 0 || selectedMember.length !== 0) {
        requestParams.page = 1;
      }
      dispatch(getTimeActivityRequest(requestParams));
    }
  }, [
    dateRange,
    activePage,
    itemsPerPage,
    selectedProject,
    selectedMember,
    debouncedSearchTerm,
    dispatch,
  ]);

  const prev = useCallback(() => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  }, [activePage]);

  const onPageClick = useCallback((selectedPage: number) => {
    setActivePage(selectedPage);
  }, []);

  const next = useCallback(() => {
    if (activePage < totalPageCount) {
      setActivePage(activePage + 1);
    }
  }, [activePage, totalPageCount]);

  const handleProjectChange = useCallback((projectOptions: OptionType[]) => {
    setSelectedProject(projectOptions);
  }, []);

  const handleMemberChange = useCallback((memberOptions: OptionType[]) => {
    setSelectedMember(memberOptions);
    setSelectedProject([]);
  }, []);

  useEffect(() => {
    if (hasPermission(userRole, 'timeActivity', 'read')) {
      dispatch(getAllUserRequest());
    }
    dispatch(getAllProjectRequest());
  }, [userRole, dispatch]);

  useEffect(() => {
    if (timeActivityData?.data?.length) {
      const calculatedActivities = timeActivityData.data[0]?.activities || [];
      setActivities(calculatedActivities);
    }
  }, [timeActivityData]);

  const handleTimeActivity = useCallback(
    (activity: TimeActivities, _id: string) => {
      setTimeLineDate(activity.date);
      setTimeActivityModal(true);
      const timestamps = getUnixTimestampsSingleDate(activity.date);
      const timeLinerequest: TimeLinePaylod = {
        userId: _id,
        startTime: timestamps.startUnixTimestamp,
        endTime: timestamps.endUnixTimestamp,
      };
      dispatch(getTimeLineRequest(timeLinerequest));
    },
    [dispatch]
  );

  return (
    <>
      <div>
        <h2 className='text-2xl font-semibold mb-3'>Time Activity</h2>
        <div className='time-activity-container'>
          {hasPermission(userRole, 'timeActivity', 'read') && (
            <div className='time-activity-input-wrapper w-[200px]'>
              <Search
                placeholder='Search Activity'
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
              />
            </div>
          )}
          <div className='time-activity-search-container'>
            <div className='time-activity-input-container'>
              <span className='filter-label '>Filter by:</span>
              {hasPermission(userRole, 'timeActivity', 'read') && (
                <SearchSelect
                  placeholder='Select Member'
                  options={memberOptions}
                  isSearchable={true}
                  value={selectedMember}
                  isMulti
                  onChange={handleMemberChange}
                  styles={{
                    menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
                  }}
                />
              )}
              <SearchSelect
                placeholder='Select Project'
                isSearchable={true}
                options={
                  hasPermission(userRole, 'timeActivity', 'read')
                    ? projectOption
                    : allProjectOptions
                }
                isDisabled={
                  hasPermission(userRole, 'timeActivity', 'read')
                    ? selectedMember.length
                      ? false
                      : true
                    : false
                }
                value={selectedProject}
                isMulti
                onChange={handleProjectChange}
                styles={{
                  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
                }}
              />
              <Flatpickr
                options={{
                  mode: 'range',
                  dateFormat: 'Y-m-d',
                  maxDate: getEndOfCurrentWeek(),
                }}
                value={dateRange}
                onChange={(dates: Date[]) => {
                  if (dates.length === 2) {
                    setDateRange(formatDateRange(dates));
                  }
                }}
                className='time-activity-date-picker'
                placeholder='Select date range'
              />
            </div>
          </div>
        </div>
      </div>

      <TimeActivityTable
        tableHeader={activities}
        tableData={timeActivityData}
        loading={loading}
        prev={prev}
        next={next}
        totalPageCount={totalPageCount}
        activePage={activePage}
        setActivePage={setActivePage}
        onPageClick={onPageClick}
        handleTimeActivity={handleTimeActivity}
      />

      <TimeLineModal
        openTimeActivityModal={openTimeActivityModal}
        setTimeActivityModal={setTimeActivityModal}
        timeLineData={timeLineData?.data?.timelineActivity}
        dsrData={timeLineData?.data?.dsr}
        timeLineLoading={timeLineLoading}
        timeLineDate={timeLineDate}
      />
    </>
  );
};

export default TimeActivity;
