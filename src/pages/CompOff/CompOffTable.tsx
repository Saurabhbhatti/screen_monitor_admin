import React from 'react';
import './CompOff.css';
import Button from '../../components/CustomButton/CustomButton';
import IconCheckCircle from '../../assets/Icon/Menu/IconCheckCircle';
import { IconXCircle } from '../../assets';
import { CompOffTableProps } from '../../utils/type';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import { hasPermission } from '../../utils';
import styles from '../Leave/Leaverecords/LeaveRecord.module.css';
import './CompOff.css';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { approvecompOffRequest } from '../../redux/compoff/action';
import { Tooltip } from '@material-tailwind/react';
import CustomLoader from '../../components/CustomLoader/CustomLoader';

const handleRejectAlert = async (requestId: string) => {
  const result = await Swal.fire({
    icon: 'warning',
    title: 'Reject Request',
    text: 'Please provide a reason for rejection:',
    input: 'textarea',
    inputPlaceholder: 'Enter reason...',
    showCancelButton: true,
    confirmButtonText: 'Reject',
    cancelButtonText: 'Cancel',
    customClass: {
      popup: 'sweet-alerts',
      confirmButton: 'btn btn-danger',
    },
    inputValidator: (value) => {
      if (!value) {
        return 'You need to enter a reason!';
      }
    },
  });

  if (result.isConfirmed && result.value) {
    return { confirmed: true, reason: result.value };
  }
  return { confirmed: false, reason: '' };
};
const showStatusAlert = async (action: string, value?: number) => {
  const options: SweetAlertOptions = {
    icon: 'warning',
    title: ` ${action}?`,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    input: 'number',
    inputValue: `${value}`,
    inputPlaceholder: 'modify compoff',
    inputAttributes: {
      min: '0',
    },
    customClass: {
      popup: 'sweet-alerts',
      confirmButton: 'btn btn-danger',
    },
    inputValidator: (value) => {
      if (!value || isNaN(Number(value))) {
        return 'Please enter a valid number!';
      }
    },
  };

  return Swal.fire(options);
};

export const CompOffTable: React.FC<CompOffTableProps> = ({
  loading,
  leaveActivePage,
  setLeaveActivePage,
  leaveTotalPages,
  tableData,
  userRole,
  prev,
  onPageClick,
  next,
  leaveIsSelf,
  totalPageCount,
}) => {
  const dispatch = useDispatch();
  const onReject = (
    compoffId: string,
    reason: string,
    eligibleCompoff: number
  ) => {
    dispatch(
      approvecompOffRequest({
        compoffId,
        value: eligibleCompoff,
        status: 'rejected',
        eligibleCompoff: eligibleCompoff,
        comment: reason,
      })
    );
  };
  const handleReject = async (requestId: string, eligibleCompoff: number) => {
    const { confirmed, reason } = await handleRejectAlert(requestId);
    if (confirmed && reason) {
      onReject(requestId, reason, eligibleCompoff);
    }
  };
  const onApprove = (compoffId: string, eligibleCompoff: number) => {
    const status = 'approved';
    dispatch(
      approvecompOffRequest({
        compoffId,
        value: eligibleCompoff,
        status,
        eligibleCompoff: eligibleCompoff,
        comment: 'test',
      })
    );
  };
  const handleApprove = async (requestId: string, value: string) => {
    const eligibleCompoff = Number(value);
    const result = await showStatusAlert(
      'Do you want to change the eligible compoff',
      eligibleCompoff
    );
    if (result.isConfirmed && requestId) {
      onApprove(requestId, result.value);
    }
  };

  const renderStatus = (item: any) => {
    switch (item.status) {
      case 'approved':
        return <span className='status-approved'>Approved</span>;
      case 'rejected':
        return (
          <Tooltip
            content={
              <span className='custom-tooltip-content'>{item.description}</span>
            }
            placement='bottom'
            className='custom-tooltip'
          >
            <span className='status-rejected'>Rejected</span>
          </Tooltip>
        );
      case 'cancelled':
        return <span className='status-rejected'>Cancelled</span>;
      default:
        return null;
    }
  };

  const renderActions = (item: any) => {
    if (hasPermission(userRole, 'regulariseRequest', 'write')) {
      return (
        <div className='action-buttons'>
          {item.status === 'pending' && (
            <>
              <Button
                type='button'
                onClick={() => handleApprove(item._id, item.eligibleCompoff)}
                className='approve-btn'
              >
                <IconCheckCircle className='w-6 h-6' />
              </Button>
              <Button
                type='button'
                onClick={() => handleReject(item._id, item.eligibleCompoff)}
                className='reject-btn'
              >
                <IconXCircle className='w-6 h-6' />
              </Button>
            </>
          )}
        </div>
      );
    }
    return null;
  };
  return (
    <>
      <div className='mt-5 panel p-0 border-0 overflow-hidden flex flex-col'>
        <div className='table-responsive'>
          <table className='table-striped table-hover'>
            <thead>
              <tr>
                <th className='table-header'>Name</th>
                <th className='table-header'>Date</th>
                <th className='table-header'>Description</th>
                <th className='table-header'>Tracked Hours</th>
                <th className='table-header'>Eligible Compoff</th>
                <th className='table-header'>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6}>
                    <div className='flex justify-center items-center w-full h-32'>
                      <CustomLoader />
                    </div>
                  </td>
                </tr>
              ) : tableData.data.length > 0 ? (
                tableData.data.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>
                      <div className='project-name'>
                        <div>
                          {item.user?.firstName + ' ' + item.user?.lastName}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>{item?.workDate?.split('T')[0]}</div>
                    </td>
                    <td>{item?.description}</td>
                    <td className='whitespace-normal break-words max-w-[200px]'>
                      {item?.trackedHours}
                    </td>
                    <td className='whitespace-nowrap'>
                      {item?.eligibleCompoff}
                    </td>
                    <td>
                      {renderStatus(item)}
                      {renderActions(item)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <div className='no-data-alert'>No Data Available!</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!loading && (tableData?.total ?? 0) > 2 && (
          <div className='mt-5 flex self-end mr-8'>
            <ul className='list-ul'>
              <li>
                <Button
                  type='button'
                  className={`flex justify-center font-semibold p-2 rounded-full transition ${
                    leaveActivePage === 1
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-white-light text-dark hover:text-white hover:bg-primary'
                  } dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary`}
                  onClick={prev}
                  disabled={leaveActivePage === 1}
                >
                  <IconCaretDown className='w-5 h-5 rotate-90 rtl:-rotate-90' />
                </Button>
              </li>
              {[...Array(totalPageCount)].map((_, index) => (
                <li key={index}>
                  <Button
                    type='button'
                    className={`flex justify-center font-semibold px-3.5 py-2 rounded-full transition ${
                      leaveActivePage === index + 1
                        ? 'bg-primary text-white'
                        : 'bg-white-light text-dark hover:text-white hover:bg-primary'
                    } dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary`}
                    onClick={() => {
                      if (totalPageCount > 1) {
                        setLeaveActivePage(index + 1);
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
                  className={`flex justify-center font-semibold p-2 rounded-full transition ${
                    leaveActivePage === totalPageCount
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-white-light text-dark hover:text-white hover:bg-primary'
                  } dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary`}
                  onClick={next}
                  disabled={leaveActivePage === totalPageCount}
                >
                  <IconCaretDown className='w-5 h-5 -rotate-90 rtl:rotate-90' />
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default CompOffTable;
