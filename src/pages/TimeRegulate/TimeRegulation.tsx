import React, { useEffect, useState, useCallback, useMemo } from 'react';
import './TimeRegulation.css';
import {
  MemberOption,
  OptionType,
  ProjectOption,
  Projects,
  TeamMember,
  TimeRegulationRootState,
} from '../../utils/type';
import { useDispatch, useSelector } from 'react-redux';
import 'flatpickr/dist/flatpickr.css';
import {
  findProjectsByMembers,
  formatOptions,
  getEndOfCurrentWeek,
  getPreviosSevenDays,
  getUserRole,
  hasPermission,
  itemsPerPage,
  UserRole,
} from '../../utils';
import TimeRegulateTable from './TimeRegulateTable';
import { TimeRegulateTableHead } from '../../utils/mockData';
import {
  applyTimeRequestBegin,
  changeTimeRequestStatusBegin,
  getTimeRequestBegin,
} from '../../redux/TimeRequest/action';
import TableHeader from './TableHeader';
import { getAllUserRequest } from '../../redux/user/action';
import { getAllProjectRequest } from '../../redux/project/action';
import TimeRegulationModal from './TimeRegulationModal';
import { format } from 'date-fns';

const TimeRegulation = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  //apply
  const [showText, setShowText] = useState<boolean>(false);
  const [isApplyEnabled, setIsApplyEnabled] = useState(false);
  const [selectedUser, setSelectedUser] = useState<OptionType | null>(null);
  const [dateTime, setDateTime] = useState(new Date());
  const [regularizeStartTime, setRegularizeStartTime] = useState('');
  const [regularizeEndTime, setRegularizeEndTime] = useState('');
  const [description, setDescription] = useState<string>('');
  const [selectedProjectOption, setSelectedProjectOption] =
    useState<OptionType | null>(null);
  const [projectOption, setProjectOption] = useState<OptionType[]>([]);

  const { allProjectData } = useSelector((state: Projects) => state.projects);
  const userId = useSelector((state: any) => state?.auth.user.data._id);

  // approve reject cancle
  const [selectedMember, setSelectedMember] = useState<OptionType | null>(null);
  const [maxDate, setMaxDate] = useState<Date>(getEndOfCurrentWeek());
  const [dateRange, setDateRange] = useState<any>(getPreviosSevenDays());
  const [status, setStatus] = useState<OptionType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSelf, setIsSelf] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { allUserData } = useSelector((state: TeamMember) => state.user);
  const { loading, applySuccess }: { loading: boolean; applySuccess: boolean } =
    useSelector((state: TimeRegulationRootState) => state.timeRequest);

  const timeReqData = useSelector(
    (state: TimeRegulationRootState) => state.timeRequest.timeRequests
  );

  const userRole = getUserRole();

  const memberOptions = useMemo(() => {
    return (
      allUserData?.data?.map(({ firstName, _id }: MemberOption) => ({
        label: firstName,
        value: _id,
      })) || []
    );
  }, [allUserData]);

  const allProjectOptions: OptionType[] =
    allProjectData?.data?.map(({ projectName, _id }: ProjectOption) => ({
      label: projectName,
      value: _id,
    })) || [];

  const handleMemberChange = (selectedOption: OptionType | null) => {
    setSelectedMember(selectedOption);
  };

  const onStatusChange = (selectedOption: OptionType | null) => {
    setStatus(selectedOption);
  };

  const handleSelfSwitch = () => {
    setIsSelf((prev) => !prev);
  };

  const fetchTimeRequests = useCallback(() => {
    if (dateRange.length !== 2) {
      return;
    }

    const payload = {
      page: activePage,
      rowsPerPage: itemsPerPage,
      userFilterId: selectedMember ? [selectedMember.value] : undefined,
      status: status ? status.value : undefined,
      startDate: dateRange[0] ? format(dateRange[0], 'yyyy-MM-dd') : undefined,
      endDate: dateRange[1] ? format(dateRange[1], 'yyyy-MM-dd') : undefined,
      isSelf,
    };

    dispatch(getTimeRequestBegin(payload));
  }, [
    dispatch,
    status,
    selectedMember,
    dateRange,
    isSelf,
    activePage,
    itemsPerPage,
  ]);

  useEffect(() => {
    fetchTimeRequests();
  }, [fetchTimeRequests]);

  useEffect(() => {
    if (selectedUser) {
      const selectedUserValues = [selectedUser.value];
      const memberInProject = findProjectsByMembers(
        selectedUserValues,
        allProjectData?.data || []
      );
      setProjectOption(memberInProject);
    }
  }, [allProjectData]);

  useEffect(() => {
    if (!allUserData?.data?.length) {
      if (hasPermission(userRole, 'regulariseRequest', 'read')) {
        dispatch(getAllUserRequest());
        dispatch(getAllProjectRequest());
      }
    }
  }, [userRole, dispatch]);

  const handleApplyButton = () => {
    const startDate = new Date(dateTime);
    const startTimeInMinutes = timeStringToMinutes(regularizeStartTime);
    const endTimeInMinutes = timeStringToMinutes(regularizeEndTime);

    startDate.setMinutes(startDate.getMinutes() + startTimeInMinutes);
    const endDate = new Date(startDate);
    endDate.setMinutes(
      startDate.getMinutes() + (endTimeInMinutes - startTimeInMinutes)
    );

    const projectId = selectedProjectOption?.value ?? '';

    const requestData = {
      userId: userRole === UserRole.EMPLOYEE ? userId : selectedUser?.value,
      projectId,
      applyDate: startDate,
      startTime: Math.floor(startDate.getTime() / 1000),
      endTime: Math.floor(endDate.getTime() / 1000),
      description,
    };

    dispatch(applyTimeRequestBegin(requestData));

    setSelectedProjectOption(null);
    setSelectedUser(null);
    setDateTime(new Date());
    setRegularizeStartTime('');
    setRegularizeEndTime('');
    setDescription('');
    setShowText(false);
  };

  useEffect(() => {
    if (applySuccess && !loading) {
      fetchTimeRequests();
    }
  }, [applySuccess, loading]);

  const handleChangeUser = useCallback(
    (selectedOption: OptionType | null) => {
      setSelectedUser(selectedOption);
      setSelectedProjectOption(null);

      if (selectedOption) {
        const userProjects = findProjectsByMembers(
          [selectedOption.value],
          allProjectData?.data || []
        );
        setProjectOption(userProjects);
      } else {
        setProjectOption([]);
      }
    },
    [allProjectData]
  );

  const handleChangeProject = useCallback(
    (selectedOption: OptionType | null) => {
      setSelectedProjectOption(selectedOption);
    },
    []
  );

  const handleStartTimeChange = (event: any) => {
    const startTime = event.target.value;
    setRegularizeStartTime(startTime);

    if (regularizeEndTime < startTime) {
      setRegularizeEndTime('');
    }
    validateTotalHours(startTime, regularizeEndTime);
  };

  const handleEndTimeChange = (event: any) => {
    const endTime = event.target.value;

    if (endTime < regularizeStartTime) {
      setError('End time cannot be less than start time.');
    } else {
      setError('');
      setRegularizeEndTime(endTime);
      validateTotalHours(regularizeStartTime, endTime);
    }
  };

  const validateTotalHours = (start: string, end: string) => {
    if (start && end) {
      const startDate = new Date(`1970-01-01T${start}:00`);
      const endDate = new Date(`1970-01-01T${end}:00`);

      const hoursDiff =
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

      if (hoursDiff > 8) {
        setError('Total hours cannot exceed 8 hours.');
      } else {
        setError('');
      }
    }
  };

  const timeStringToMinutes = (timeString: string) => {
    const [hours = 0, minutes = 0] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleCancelButton = () => {
    setError('');
    setSelectedProjectOption(null);
    setSelectedUser(null);
    setDateTime(new Date());
    setRegularizeStartTime('');
    setRegularizeEndTime('');
    setDescription('');
    setShowText(false);
  };

  useEffect(() => {
    const isValid =
      Boolean(regularizeStartTime) &&
      Boolean(regularizeEndTime) &&
      regularizeEndTime >= regularizeStartTime &&
      error === '' &&
      description.trim().length > 0;

    setIsApplyEnabled(isValid);
  }, [regularizeStartTime, regularizeEndTime, error, description]);

  useEffect(() => {
    if (timeReqData?.total) {
      setTotalPageCount(Math.ceil(timeReqData.total / itemsPerPage));
    }
  }, [timeReqData]);

  const handleApprove = (payload: { requestId: string; status: string }) => {
    dispatch(changeTimeRequestStatusBegin(payload));
  };

  const handleReject = (payload: {
    requestId: string;
    reason: string;
    status: string;
  }) => {
    dispatch(changeTimeRequestStatusBegin(payload));
  };

  const handleCancel = (payload: { requestId: string; status: string }) => {
    dispatch(changeTimeRequestStatusBegin(payload));
  };

  const handleButtonClick = () => {
    setShowText(true);
  };

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

  return (
    <div>
      <div className='time-regulation-main'>
        <TimeRegulationModal
          memberOptions={memberOptions}
          addProjectModal={showText}
          setAddProjectModal={setShowText}
          dateTime={dateTime}
          selectedUser={selectedUser}
          setDateTime={setDateTime}
          userRole={userRole}
          handleChangeUser={handleChangeUser}
          projectOption={projectOption}
          selectedProjectOption={selectedProjectOption}
          regularizeStartTime={regularizeStartTime}
          regularizeEndTime={regularizeEndTime}
          error={error}
          description={description}
          handleStartTimeChange={handleStartTimeChange}
          handleEndTimeChange={handleEndTimeChange}
          handleDescriptionChange={handleDescriptionChange}
          isApplyEnabled={isApplyEnabled}
          handleApplyButton={handleApplyButton}
          handleCancelButton={handleCancelButton}
          loading={loading}
          allProjectOptions={allProjectOptions}
          handleChangeProject={handleChangeProject}
        />
        <>
          <TableHeader
            userRole={userRole}
            handleSelfSwitch={handleSelfSwitch}
            isSelf={isSelf}
            memberOptions={memberOptions}
            selectedMember={selectedMember}
            handleMemberChange={handleMemberChange}
            statusFormat={status}
            statusOptions={formatOptions}
            onStatusChange={onStatusChange}
            maxDate={maxDate}
            dateRange={dateRange}
            setDateRange={setDateRange}
            handleButtonClick={handleButtonClick}
          />

          <TimeRegulateTable
            loading={loading}
            prev={prev}
            next={next}
            totalPageCount={totalPageCount}
            activePage={activePage}
            setActivePage={setActivePage}
            onPageClick={onPageClick}
            tableHead={TimeRegulateTableHead(userRole)}
            timeReqData={timeReqData}
            userRole={userRole}
            onApprove={handleApprove}
            onReject={handleReject}
            onCancel={handleCancel}
          />
        </>
      </div>
    </div>
  );
};

export default TimeRegulation;
