import React from 'react';
import {
  getLeaveTypeLabel,
  getLeaveTypeStatus,
  hasPermission,
  leaveGetStatusClass,
  UserRole,
} from '../../utils';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import { LeaveRecordsType, LeaveTableProps } from '../../utils/type';
import { IconXCircle } from '../../assets';
import Button from '../../components/CustomButton/CustomButton';
import IconCheckCircle from '../../assets/Icon/Menu/IconCheckCircle';
import styles from './Leaverecords/LeaveRecord.module.css';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import { Tooltip } from '@material-tailwind/react';

const formatDateString = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getFullYear()}`;
};

const TooltipContent = ({
  status,
  fullName,
  formattedDateString,
  reason,
}: any) => {
  if (status === 'approved' || status === 'rejected') {
    return (
      <div className='custom-tooltip-content'>
        {status === 'rejected' && (
          <>
            <span>Reason: {reason}</span>
            <br />
          </>
        )}
        <span>By {fullName}</span>
        <br />
        <span>on {formattedDateString}</span>
      </div>
    );
  }
  if (status === 'cancelled') {
    return (
      <div className='custom-tooltip-content'>
        <span>Cancelled</span>
      </div>
    );
  }
  return null;
};

const LeaveStatusCell = ({
  entry,
  userRole,
  isLeaveSelf,
  handleCancel,
}: any) => {
  const { status, reason, _id, userId, actionBy, updatedAt } = entry;
  const fullName = `${actionBy?.firstName} ${actionBy?.lastName}`;
  const formattedDateString = formatDateString(updatedAt);
  const isPending = status === 'pending';

  return (
    <td className='table-cell'>
      <Tooltip
        content={
          <TooltipContent
            status={status}
            fullName={fullName}
            formattedDateString={formattedDateString}
            reason={reason}
          />
        }
        placement='top'
        animate={{ mount: { scale: 1, y: 0 }, unmount: { scale: 0, y: 25 } }}
      >
        <span className={`${styles.status} ${leaveGetStatusClass(status)}`}>
          {getLeaveTypeStatus(status)}
        </span>
      </Tooltip>
      {isPending && userRole === UserRole.EMPLOYEE && (
        <Button
          type='button'
          onClick={() => handleCancel(_id, userId._id)}
          className={styles.cancelButton}
        >
          <IconXCircle className='leavedeleteicon' />
        </Button>
      )}
    </td>
  );
};

const LeaveActionsCell = ({ entry, handleApprove, handleReject }: any) => {
  const { status, _id, userId } = entry;
  if (status === 'pending') {
    return (
      <td>
        <div className={styles.buttonStatusDiv}>
          <Button
            type='button'
            className={styles.buttonApprove}
            onClick={() => handleApprove(_id, userId._id)}
          >
            <IconCheckCircle className='edit-icon' />
          </Button>
          <Button
            type='button'
            className={styles.buttonReject}
            onClick={() => handleReject(_id, userId._id)}
          >
            <IconXCircle className='leavedeleteicon' />
          </Button>
        </div>
      </td>
    );
  }
  return <LeaveStatusCell entry={entry} />;
};

const LeaveTable: React.FC<LeaveTableProps> = ({
  data,
  userRole,
  loading,
  activePage,
  totalPageCount,
  itemsPerPage,
  onPageClick,
  prev,
  next,
  handleCancel,
  handleReject,
  handleApprove,
  leaveformatDate,
  leaveIsSelf,
}) => {
  const renderLeaveRow = (entry: LeaveRecordsType) => {
    const isHRorPMorCA = [
      UserRole.HR,
      UserRole.PROJECT_MANAGER,
      UserRole.COMPANY_ADMIN,
    ].includes(userRole);
    const isLeaveSelf = leaveIsSelf;

    return (
      <tr key={entry._id}>
        <td className='table-cell-sticky-left text-left'>{`${entry?.userId?.firstName} ${entry?.userId?.lastName}`}</td>
        <td className='table-cell text-left'>
          {getLeaveTypeLabel(entry.leaveType)}
        </td>
        <td className='table-cell text-left'>
          {entry.applyDate.length > 0 &&
            `${leaveformatDate(entry.applyDate[0].date)} to ${leaveformatDate(
              entry.applyDate[entry.applyDate.length - 1].date
            )}`}
        </td>
        <td className='table-cell text-left'>{entry.totalDays}</td>
        {userRole === UserRole.EMPLOYEE || (isHRorPMorCA && isLeaveSelf) ? (
          <LeaveStatusCell
            entry={entry}
            userRole={userRole}
            isLeaveSelf={isLeaveSelf}
            handleCancel={handleCancel}
          />
        ) : (
          isHRorPMorCA && (
            <LeaveActionsCell
              entry={entry}
              handleApprove={handleApprove}
              handleReject={handleReject}
            />
          )
        )}
      </tr>
    );
  };

  return (
    <div className='attendace-table-container  panel'>
      <div className='attendace-table-wrapper'>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th className='table-header-cell-first'>Employee</th>
              <th className='table-header-cell-first'>Leave Type</th>
              <th className='table-header-cell-first'>Duration</th>
              <th className='table-header-cell-first'>No Of Days</th>
              {hasPermission(userRole, 'regulariseRequest', 'write') && (
                <th className='table-header-cell-last text-left'>Actions</th>
              )}
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
          ) : data.data.length > 0 ? (
            <tbody>{data.data.map(renderLeaveRow)}</tbody>
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

      {!loading && data.total > itemsPerPage && (
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
  );
};

export default LeaveTable;
