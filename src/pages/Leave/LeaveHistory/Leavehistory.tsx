import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Flatpickr from 'react-flatpickr';
import {
  getLeaveTypeLabel,
  getUserRole,
  itemsPerPage,
  MAX_DATE,
  MIN_DATE,
  UserRole,
} from '../../../utils';
import Button from '../../../components/CustomButton/CustomButton';
import CustomLoader from '../../../components/CustomLoader/CustomLoader';
import {
  LeaveHistoryPayload,
  LeaveHistoryType,
  LeaveRootState,
  MemberOption,
  OptionType,
  TeamMember,
} from '../../../utils/type';
import SearchSelect from '../../../components/CustomSelect/CustomSelect';
import IconCaretDown from '../../../components/Icon/IconCaretDown';
import CustomSwitch from '../../../components/SwitchComponent/SwitchComponent';
import { leaveHistoryRequest } from '../../../redux/leave/leaveHistory/action';
import styles from './Leavehistory.module.css';

export const LeaveHistory = () => {
  const userRole = getUserRole();
  const dispatch = useDispatch();

  const [activePage, setActivePage] = useState<number>(1);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  const [leaveSelectedMember, setLeaveSelectedMember] = useState<OptionType[]>(
    []
  );
  const [leaveDateRange, setLeaveDateRange] = useState<Date[]>([
    new Date(),
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  ]);
  const [leaveIsSelf, setLeaveIsSelf] = useState<boolean>(false);

  const { allUserData } = useSelector((state: TeamMember) => state.user);
  const { leaveReduxState, loading } = useSelector(
    (state: LeaveRootState) => state.leaveHistory
  );

  const isSelf =
    userRole !== UserRole.EMPLOYEE && userRole !== UserRole.COMPANY_ADMIN;

  const memberOptions: OptionType[] =
    allUserData?.data?.map(({ firstName, _id }: MemberOption) => ({
      label: firstName,
      value: _id,
    })) || [];

  useEffect(() => {
    const payload: LeaveHistoryPayload = {
      limit: itemsPerPage,
      offset: activePage,
    };

    if (leaveSelectedMember.length)
      payload.userFilterId = leaveSelectedMember.map((member) => member.value);
    if (leaveDateRange.length === 2) {
      const [startDate, endDate] = leaveDateRange;
      payload.startDate = startDate.toISOString().split('T')[0];
      payload.endDate = endDate.toISOString().split('T')[0];
    }
    if (leaveIsSelf) payload.isSelf = true;

    dispatch(leaveHistoryRequest(payload));
  }, [dispatch, activePage, leaveSelectedMember, leaveIsSelf, leaveDateRange]);

  useEffect(() => {
    if (leaveReduxState?.total) {
      setTotalPageCount(Math.ceil(leaveReduxState.total / itemsPerPage));
    }
  }, [leaveReduxState]);

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

  return (
    <>
      <h2 className='text-2xl font-semibold mb-3'>Leave History</h2>
      <div className='flex justify-end gap-3'>
        <span className='filter-label '>Filter by:</span>
        {isSelf && (
          <span className={styles.leaveRecordToggelMainSwitchSpam}>Self :</span>
        )}
        {isSelf && (
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
      </div>
      <div className='attendace-table-container  panel'>
        <div className='attendace-table-wrapper'>
          <table className='table table-striped table-hover'>
            <thead>
              <tr>
                <th className='table-header-cell-first'>Employee</th>
                <th className='table-header-cell-first'>Leave Type</th>
                <th className='table-header-cell-first'>Credit</th>
                <th className='table-header-cell-first'>Debit</th>
                <th className='table-header-cell-first'>Description</th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr>
                  <td colSpan={6}>
                    <div className='flex justify-center items-center w-full h-32'>
                      <CustomLoader />
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : leaveReduxState.data.length > 0 ? (
              <tbody>
                {leaveReduxState.data.map(
                  (entry: LeaveHistoryType, index: number) => (
                    <tr key={entry._id}>
                      <td className='table-cell-sticky-left'>
                        <div className='flex flex-col no-wrap'>
                          <span>{`${entry?.user?.firstName} ${entry?.user?.lastName}`}</span>
                        </div>
                      </td>
                      <td className='table-cell'>
                        {getLeaveTypeLabel(entry?.leave?.leaveType || '-')}
                      </td>
                      <td className='table-cell-sticky-left'>
                        <div>
                          <span>{entry?.credited}</span>
                        </div>
                      </td>
                      <td className='table-cell-sticky-left'>
                        <div>
                          <span>{entry?.debited}</span>
                        </div>
                      </td>
                      <td className='table-cell-sticky-left'>
                        <div>
                          <span>{entry?.leave?.leaveType || '-'}</span>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={8}>
                    <span className='no-data-alert'>No Data Available!</span>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
        {!loading && leaveReduxState?.total > itemsPerPage && (
          <div className='page-data-container'>
            <ul className='ul-list'>
              <li>
                <Button
                  type='button'
                  className={`prev-btn ${
                    activePage === 1
                      ? 'page-number-enable'
                      : 'page-number-disable'
                  } btn-dark`}
                  onClick={prev}
                  disabled={activePage === 1}
                >
                  <IconCaretDown className='prev-icon' />
                </Button>
              </li>
              {[...Array(totalPageCount)].map((_, index) => (
                <li key={index}>
                  <Button
                    type='button'
                    className={`number-activePage  ${
                      activePage === index + 1
                        ? 'active-number'
                        : 'page-number-disable'
                    } btn-dark`}
                    onClick={() => {
                      if (totalPageCount > 1) {
                        onPageClick(index + 1);
                      }
                    }}
                  >
                    {index + 1}
                  </Button>
                </li>
              ))}
              <li>
                <Button
                  type='button'
                  className={`prev-btn ${
                    activePage === totalPageCount
                      ? 'page-number-enable'
                      : 'page-number-disable'
                  } btn-dark`}
                  onClick={next}
                  disabled={activePage === totalPageCount}
                >
                  <IconCaretDown className='next-btn' />
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
