import React, { useEffect, useState, useCallback } from 'react';
import {
  LeaveRecordsPayload,
  LeaveRecordsType,
  LeaveRecordUser,
  MemberOption,
  OptionType,
  TeamMember,
} from '../../utils/type';
import { useDispatch, useSelector } from 'react-redux';
import SearchSelect from '../../components/CustomSelect/CustomSelect';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import {
  getUserRole,
  hasPermission,
  itemsPerPage,
  UserRole,
} from '../../utils';
import { formatOptions } from '../../utils/mockData';
import CompOffTable from './CompOffTable';
import './CompOff.css';
import { fetchCompOffRequest } from '../../redux/compoff/action';
import { getAllUserRequest } from '../../redux/user/action';
import { format, isValid, parse } from 'date-fns';
import CustomSwitch from '../../components/SwitchComponent/SwitchComponent';
const CompOff = () => {
  const [selectedMember, setSelectedMember] = useState<OptionType | null>(null);
  const [leaveActivePage, setLeaveActivePage] = useState(1);
  const [leaveIsSelf, setLeaveIsSelf] = useState<boolean>(false);
  const [leaveMinDate, setLeaveMinDate] = useState<Date>(
    new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
  );
  const [leaveMaxDate, setLeaveMaxDate] = useState<Date>(
    new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  );
  const [leaveDateRange, setLeaveDateRange] = useState<Date[]>([
    new Date(),
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  ]);
  const [leaveStatus, setLeaveStatus] = useState<string | null>(null);
  const [leaveFileFormat, setLeaveFileFormat] = useState<any | null>(null);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  const dispatch = useDispatch();
  const { allUserData } = useSelector((state: TeamMember) => state.user);
  const { data, error, loading, approvalLoading } = useSelector(
    (state: any) => state.compoff
  );
  const userRole = getUserRole();
  const leaveRecordsPerPage = 10;
  const leaveTotalPages = Math.ceil((data?.total || 0) / leaveRecordsPerPage);
  const memberOptions: OptionType[] =
    allUserData?.data?.map(({ firstName, _id }: MemberOption) => ({
      label: firstName,
      value: _id,
    })) || [];

  const handleMemberChange = (selectedOption: OptionType | null) => {
    setSelectedMember(selectedOption);
  };
  const compOffRequest = useCallback(() => {
    const payload: LeaveRecordsPayload = {
      limit: leaveRecordsPerPage,
      offset: leaveActivePage,
    };

    if (leaveStatus) payload.status = leaveStatus;

    if (selectedMember) {
      payload.userFilterId = [selectedMember.value];
    }

    if (leaveDateRange.length === 1) {
      const selectedDate = leaveDateRange[0];
      if (isValid(selectedDate)) {
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        payload.startDate = formattedDate;
        payload.endDate = formattedDate;
      } else {
        console.error('Invalid selectedDate:', selectedDate);
      }
    } else if (leaveDateRange.length === 2) {
      const [startDate, endDate] = leaveDateRange;
      if (isValid(startDate) && isValid(endDate)) {
        payload.startDate = format(startDate, 'yyyy-MM-dd');
        payload.endDate = format(endDate, 'yyyy-MM-dd');
      } else {
        console.error('Invalid startDate or endDate:', startDate, endDate);
      }
    } else {
      console.error(
        'leaveDateRange should contain either one or two dates:',
        leaveDateRange
      );
    }
    if (leaveIsSelf) payload.isSelf = true;
    dispatch(fetchCompOffRequest(payload));
  }, [
    dispatch,
    leaveStatus,
    selectedMember,
    leaveDateRange,
    leaveIsSelf,
    leaveActivePage,
  ]);
  const prev = () => {
    if (leaveActivePage > 1) {
      setLeaveActivePage(leaveActivePage - 1);
    }
  };

  const onPageClick = (selectedPage: any) => {
    setLeaveActivePage(selectedPage);
  };
  useEffect(() => {
    if (data?.total) {
      setTotalPageCount(Math.ceil(data.total / itemsPerPage));
    }
  }, [data]);

  const next = () => {
    if (leaveActivePage < totalPageCount) {
      setLeaveActivePage(leaveActivePage + 1);
    }
  };
  useEffect(() => {
    if (userRole !== UserRole.EMPLOYEE && !approvalLoading) {
      compOffRequest();
      dispatch(getAllUserRequest());
    }
  }, [compOffRequest, leaveActivePage, dispatch, approvalLoading]);

  const handleSelfSwitch = () => {
    setLeaveIsSelf((prev) => !prev);
  };
  return (
    <div>
      <h2 className='text-2xl font-semibold'>CompOff</h2>

      <div className='flex max-h-[200px] items-center justify-end flex-wrap gap-4 mb-4'>
        <div className='flex items-center space-x-4'>
          <span className='filter-label '>Filter by:</span>
          {hasPermission(userRole, 'regulariseRequest', 'write') && (
            <>
              <span>Self :</span>
              <CustomSwitch onChange={handleSelfSwitch} checked={leaveIsSelf} />
              <SearchSelect
                placeholder='Select Member'
                options={memberOptions}
                isSearchable={true}
                value={selectedMember}
                onChange={handleMemberChange}
                isClearable={true}
                styles={{
                  menuPortal: (base: React.CSSProperties) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                }}
              />
            </>
          )}
          <SearchSelect
            placeholder='Select status'
            options={formatOptions}
            isSearchable={true}
            value={leaveFileFormat}
            isClearable={true}
            onChange={(option) => {
              setLeaveFileFormat(option);
              setLeaveStatus(option ? option.value : null);
            }}
            styles={{ menuPortal: (base: any) => ({ ...base, zIndex: 9999 }) }}
          />
          <Flatpickr
            options={{
              mode: 'range',
              dateFormat: 'd-m-Y',
              maxDate: 'today',
            }}
            value={leaveDateRange}
            onChange={setLeaveDateRange}
            className='time-activity-date-picker'
            placeholder='Select date range'
          />
        </div>
      </div>
      <div className='mb-2'>
        <CompOffTable
          loading={loading}
          leaveIsSelf={leaveIsSelf}
          tableData={data}
          userRole={userRole}
          leaveTotalPages={leaveTotalPages}
          leaveActivePage={leaveActivePage}
          prev={prev}
          next={next}
          totalPageCount={totalPageCount}
          setLeaveActivePage={setLeaveActivePage}
          onPageClick={onPageClick}
        />
      </div>
    </div>
  );
};

export default CompOff;
