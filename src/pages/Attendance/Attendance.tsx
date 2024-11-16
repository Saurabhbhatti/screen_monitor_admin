import React, { useState, useEffect, useCallback } from 'react';
import './Attendance.css';
import {
  getEndOfCurrentWeek,
  getPreviosSevenDays,
  getUnixTimestamps,
  getUnixTimestampsSingleDate,
  getUserRole,
  hasPermission,
  itemsPerPage,
  useDebouncedValue,
  UserRole,
} from '../../utils';
import SearchSelect from '../../components/CustomSelect/CustomSelect';
import Flatpickr from 'react-flatpickr';
import {
  Attendance,
  AttendancePayload,
  AttendanceState,
  MemberOption,
  OptionType,
  TeamMember,
  TimeLinePaylod,
} from '../../utils/type';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserRequest } from '../../redux/user/action';
import AttendanceTable from './AttendanceTable';
import TimeLineModal from '../TimeActivity/TimeLineModal';
import {
  getAttendanceRequest,
  getTimeLineRequest,
} from '../../redux/attendance/action';
import Button from '../../components/CustomButton/CustomButton';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import Search from '../../components/SearchInput/SearchInput';

const AttendanceCalendar: React.FC = () => {
  const dispatch = useDispatch();
  const userRole = getUserRole();

  const [selectedMember, setSelectedMember] = useState<OptionType | null>(null);
  const [timeLineDate, setTimeLineDate] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [dateRange, setDateRange] = useState<any>(getPreviosSevenDays());
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(1);
  const [openTimeActivityModal, setTimeActivityModal] =
    useState<boolean>(false);

  const debouncedSearchTerm = useDebouncedValue(search, 500);
  const { attendanceData, loading, timeLineData, timeLineLoading } =
    useSelector((state: AttendanceState) => state.attendance);
  const { allUserData } = useSelector((state: TeamMember) => state.user);

  const userId =
    userRole === UserRole.EMPLOYEE
      ? allUserData?.data?._id
      : selectedMember?.value;

  const memberOptions: OptionType[] =
    allUserData?.data?.map(({ firstName, _id }: MemberOption) => ({
      label: firstName,
      value: _id,
    })) || [];

  const handleMemberChange = (selected: OptionType | null) =>
    setSelectedMember(selected);

  useEffect(() => {
    if (
      !allUserData?.data?.length &&
      hasPermission(userRole, 'attendance', 'read')
    ) {
      dispatch(getAllUserRequest());
    }
  }, [allUserData?.data, userRole, dispatch]);

  useEffect(() => {
    if (attendanceData?.data?.length) {
      const calculatedActivities = attendanceData.data[0]?.activities || [];
      setAttendance(calculatedActivities);
    }
  }, [attendanceData]);

  useEffect(() => {
    if (attendanceData?.total) {
      setTotalPageCount(Math.ceil(attendanceData.total / itemsPerPage));
    }
  }, [attendanceData]);

  const prev = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  const onPageClick = (selectedPage: number) => {
    setActivePage(selectedPage);
  };

  const next = () => {
    if (activePage < totalPageCount) {
      setActivePage(activePage + 1);
    }
  };

  useEffect(() => {
    if (dateRange.length === 2) {
      const [startUnixTime, endUnixTime] = getUnixTimestamps(dateRange);
      const requestParams: AttendancePayload = {
        page: activePage,
        rowsPerPage: itemsPerPage,
        startTime: startUnixTime,
        endTime: endUnixTime,
        searchText: debouncedSearchTerm,
        ...(selectedMember && { memberId: [selectedMember.value] }),
      };
      dispatch(getAttendanceRequest(requestParams));
    }
  }, [dateRange, activePage, selectedMember, debouncedSearchTerm, dispatch]);

  const handleAttendanceActivity = useCallback(
    (activity: Attendance, _id: string) => {
      if (
        activity.attendance === 'Holiday' ||
        activity.attendance === 'Absent'
      ) {
        toast.info(`No timeline available for ${activity.attendance}`);
        return;
      }

      setTimeLineDate(activity.date);
      setTimeActivityModal(true);
      const timestamps = getUnixTimestampsSingleDate(activity.date);
      const timeLineRequest: TimeLinePaylod = {
        userId: _id,
        startTime: timestamps.startUnixTimestamp,
        endTime: timestamps.endUnixTimestamp,
      };
      dispatch(getTimeLineRequest(timeLineRequest));
    },
    [dispatch]
  );

  const handleExportFile = useCallback(async () => {
    const baseUrl = import.meta.env.VITE_APP_BASE_URL;
    const selectedMemberId =
      userRole === UserRole.EMPLOYEE
        ? [userId]
        : selectedMember?.value
        ? [selectedMember.value]
        : allUserData?.data?.map((user: MemberOption) => user._id) || [];
    const token = localStorage.getItem('userToken') ?? '';
    const empName =
      userRole === UserRole.EMPLOYEE
        ? allUserData.firstName
        : selectedMember?.label ?? 'all-members';
    const month =
      dateRange.length > 0 ? format(dateRange[0], 'MMMM') : 'unknown-month';
    const fileName = `${empName}-${month}.xlsx`;

    if (dateRange.length === 2) {
      const [startUnixTime, endUnixTime] = getUnixTimestamps(dateRange);
      const requestParams: AttendancePayload = {
        startTime: startUnixTime,
        endTime: endUnixTime,
        searchText: debouncedSearchTerm,
        exportExcel: 'xlsx',
        ...(selectedMemberId.length > 0 && { memberId: selectedMemberId }),
      };

      try {
        const response = await fetch(`${baseUrl}/admin/attendance`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestParams),
        });

        if (response.ok) {
          const blob = await response.blob();
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toast.success('File downloaded successfully!');
        } else {
          throw new Error(response.statusText);
        }
      } catch (error) {
        console.error('Error exporting file:', error);
        toast.error('There was an error exporting the file.');
      }
    } else {
      toast.warn('Please select a valid date range to export the file.');
    }
  }, [
    dateRange,
    selectedMember,
    debouncedSearchTerm,
    userRole,
    userId,
    allUserData,
  ]);

  return (
    <div>
      <div className='attendace-container'>
        <h2 className='text-2xl font-semibold mb-3'>Attendance</h2>
      </div>
      <div className='attendace-search-container'>
        <div className='attendance-left'>
          <div className='time-activity-input-wrapper'>
            <Search
              placeholder='Search User'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className='attendance-right'>
          <span className='filter-label '>Filter by:</span>
          <SearchSelect
            placeholder='Select Member'
            options={memberOptions}
            isClearable={true}
            isSearchable={true}
            value={selectedMember}
            onChange={handleMemberChange}
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
            onChange={(dates: Date[]) => setDateRange(dates)}
            className='attendance-date-picker'
            placeholder='Select date range'
          />

          <div>
            <Button
              type='button'
              className='adduser-button-style'
              onClick={() => handleExportFile()}
            >
              Export
            </Button>
          </div>
        </div>
      </div>

      <AttendanceTable
        tableHeader={attendance}
        tableData={attendanceData}
        loading={loading}
        prev={prev}
        next={next}
        totalPageCount={totalPageCount}
        activePage={activePage}
        setActivePage={setActivePage}
        onPageClick={onPageClick}
        handleTimeActivity={handleAttendanceActivity}
      />

      {openTimeActivityModal && (
        <TimeLineModal
          openTimeActivityModal={openTimeActivityModal}
          setTimeActivityModal={setTimeActivityModal}
          timeLineData={timeLineData?.data?.timelineActivity}
          dsrData={timeLineData?.data?.dsr}
          timeLineLoading={timeLineLoading}
          timeLineDate={timeLineDate}
        />
      )}

      {!timeLineLoading &&
        !timeLineData?.data?.timelineActivity &&
        openTimeActivityModal && (
          <div className='no-data-alert'>No Data Available!</div>
        )}
    </div>
  );
};

export default AttendanceCalendar;
