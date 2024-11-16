import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Flatpickr from 'react-flatpickr';
import { formatOptions } from '../../../utils/mockData';
import { fetchLeaveRecordsRequest } from '../../../redux/leave/leaveGetData/action';
import styles from './LeaveRecord.module.css';
import {
  LeaveRecordsPayload,
  MemberOption,
  OptionType,
  TeamMember,
} from '../../../utils/type';
import {
  getUserRole,
  itemsPerPage,
  MAX_DATE,
  MIN_DATE,
  showConfirmationAlert,
  showRejectReasonAlert,
  UserRole,
} from '../../../utils';
import {
  approveLeaveRequest,
  cancelLeaveRequest,
  rejectLeaveRequest,
} from '../../../redux/leave/leavePostData/action';
import { getAllUserRequest } from '../../../redux/user/action';
import SearchSelect from '../../../components/CustomSelect/CustomSelect';
import CustomSwitch from '../../../components/SwitchComponent/SwitchComponent';
import LeaveTable from '../LeaveTable';
import LeaveForm from '../LeaveApplicationForm/LeaveApplicationForm';
import Button from '../../../components/CustomButton/CustomButton';
import { toast } from 'react-toastify';
import axios from 'axios';

export const LeaveRecords = () => {
  const [leaveIsSelf, setLeaveIsSelf] = useState<boolean>(false);
  const [leaveStatus, setLeaveStatus] = useState<string | null>(null);
  const [leaveDateRange, setLeaveDateRange] = useState<Date[]>([
    new Date(),
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  ]);

  const [leaveFileFormat, setLeaveFileFormat] = useState<any | null>(null);
  const [leaveSelectedMember, setLeaveSelectedMember] = useState<OptionType[]>(
    []
  );
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(1);

  const dispatch = useDispatch();

  const { allUserData } = useSelector((state: TeamMember) => state.user);
  const { data, error, loading } = useSelector(
    (state: any) => state.leaveRecords
  );

  const { approveLoading, rejectLoading, cancelLoading } = useSelector(
    (state: any) => state.leaveRequest
  );

  const { loading: LeaveResqvetLoading } = useSelector(
    (state: any) => state?.leave
  );

  let userRole = getUserRole();

  const leaveFetchTimeRequests = useCallback(() => {
    const payload: LeaveRecordsPayload = {
      limit: itemsPerPage,
      offset: activePage,
    };
    if (leaveStatus) payload.status = leaveStatus;
    if (leaveSelectedMember.length)
      payload.userFilterId = leaveSelectedMember.map((member) => member.value);
    if (leaveDateRange.length === 2) {
      const [startDate, endDate] = leaveDateRange;
      payload.startDate = startDate.toISOString().split('T')[0];
      payload.endDate = endDate.toISOString().split('T')[0];
    }
    if (leaveIsSelf) payload.isSelf = true;

    dispatch(fetchLeaveRecordsRequest(payload));
  }, [
    dispatch,
    leaveStatus,
    leaveSelectedMember,
    leaveDateRange,
    leaveIsSelf,
    activePage,
  ]);

  useEffect(() => {
    if (
      approveLoading ||
      rejectLoading ||
      cancelLoading ||
      LeaveResqvetLoading
    ) {
      leaveFetchTimeRequests();
    }
  }, [approveLoading, rejectLoading, cancelLoading, LeaveResqvetLoading]);

  const handleApprove = async (leaveId: string, userId: string) => {
    const result = await showConfirmationAlert('approve this request');
    if (result.isConfirmed) {
      const payload = {
        leaveId,
        userId,
        status: 'approved',
      };
      dispatch(approveLeaveRequest(payload));
    }
  };

  const handleReject = async (leaveId: string, userId: string) => {
    const result = await showRejectReasonAlert();

    if (result.isConfirmed && result.value) {
      const payload = {
        leaveId,
        userId,
        status: 'rejected',
        comment: result.value,
      };
      dispatch(rejectLeaveRequest(payload));
      return { confirmed: true, reason: result.value };
    }

    return { confirmed: false, reason: '' };
  };

  const handleCancel = (leaveId: string, userId: string) => {
    const payload = {
      leaveId,
      userId,
      status: 'cancelled',
    };
    dispatch(cancelLeaveRequest(payload));
  };

  const leaveformatDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const memberOptions: OptionType[] =
    allUserData?.data?.map(({ firstName, _id }: MemberOption) => ({
      label: firstName,
      value: _id,
    })) || [];

  useEffect(() => {
    leaveFetchTimeRequests();
    if (userRole !== UserRole.EMPLOYEE) {
      dispatch(getAllUserRequest());
    }
  }, [leaveFetchTimeRequests, activePage, dispatch]);

  useEffect(() => {
    if (data?.total) {
      setTotalPageCount(Math.ceil(data.total / itemsPerPage));
    }
  }, [data]);

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

  const handleExportFile = async () => {
    const baseUrl = import.meta.env.VITE_APP_BASE_URL;
    const token = localStorage.getItem('userToken') ?? '';
    const fileName = 'Leave_Data.xlsx';

    try {
      const response = await axios.get(`${baseUrl}/admin/export-leave-report`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        responseType: 'blob',
      });

      if (response.status === 200) {
        const blob = response.data;
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
  };

  return (
    <>
      <h2 className='text-2xl font-semibold mb-3'>Leave</h2>
      <div className='flex max-h-[200px] items-center justify-end flex-wrap gap-4 mb-4'>
        <span className='filter-label '>Filter by:</span>
        <div className={styles.leaveRecordToggelMainSwitch}>
          {userRole !== UserRole.EMPLOYEE &&
            userRole !== UserRole.COMPANY_ADMIN && (
              <span className={styles.leaveRecordToggelMainSwitchSpam}>
                Self :
              </span>
            )}
          {userRole !== UserRole.EMPLOYEE &&
            userRole !== UserRole.COMPANY_ADMIN && (
              <>
                <CustomSwitch
                  onChange={() => {
                    setLeaveIsSelf((prev) => !prev);
                    setActivePage(1);
                  }}
                  checked={leaveIsSelf}
                />
              </>
            )}
        </div>
        {userRole !== UserRole.EMPLOYEE && (
          <SearchSelect
            placeholder='Select Member'
            options={memberOptions}
            isSearchable={true}
            value={leaveSelectedMember}
            isMulti
            onChange={setLeaveSelectedMember}
            styles={{
              menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
            }}
          />
        )}
        <SearchSelect
          placeholder='Select status'
          options={formatOptions}
          isSearchable={true}
          value={leaveFileFormat}
          onChange={(option) => {
            setLeaveFileFormat(option);
            setLeaveStatus(option ? option.value : null);
          }}
          styles={{
            menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
          }}
        />
        <Flatpickr
          options={{
            mode: 'range',
            dateFormat: 'd-m-Y',
            minDate: MIN_DATE,
            maxDate: MAX_DATE,
          }}
          value={leaveDateRange}
          onChange={setLeaveDateRange}
          className='time-activity-date-picker'
          placeholder='Select date range'
        />
        {userRole !== UserRole.COMPANY_ADMIN && <LeaveForm />}
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

      <LeaveTable
        data={data}
        userRole={userRole}
        loading={loading}
        activePage={activePage}
        totalPageCount={totalPageCount}
        itemsPerPage={itemsPerPage}
        onPageClick={onPageClick}
        prev={prev}
        next={next}
        handleCancel={handleCancel}
        handleApprove={handleApprove}
        handleReject={handleReject}
        leaveformatDate={leaveformatDate}
        leaveIsSelf={leaveIsSelf}
      />
    </>
  );
};
