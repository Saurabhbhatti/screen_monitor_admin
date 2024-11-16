import React from 'react';
import './TimeRegulateTable.css';
import { TableHead, TimeRegulateTableProps } from '../../utils/type';
import Button from '../../components/CustomButton/CustomButton';
import { IconXCircle } from '../../assets';
import IconCheckCircle from '../../assets/Icon/Menu/IconCheckCircle';
import { format } from 'date-fns';
import { hasPermission, itemsPerPage, UserRole } from '../../utils';
import { Tooltip } from '@material-tailwind/react';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import IconCaretDown from '../../components/Icon/IconCaretDown';

const showStatusAlert = async (action: string) => {
  const options: SweetAlertOptions = {
    icon: 'warning',
    title: `Are you sure you want to ${action}?`,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    customClass: {
      popup: 'sweet-alerts',
      confirmButton: 'btn btn-danger',
    },
  };
  return Swal.fire(options);
};

const handleRejectAlert = async () => {
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

const TimeRegulateTable: React.FC<TimeRegulateTableProps> = ({
  tableHead,
  timeReqData,
  userRole,
  onApprove,
  onReject,
  onCancel,
  loading,
  activePage,
  setActivePage,
  prev,
  next,
  onPageClick,
  totalPageCount,
}) => {
  const handleReject = async (requestId: string) => {
    const { confirmed, reason } = await handleRejectAlert();
    if (confirmed) {
      const payload = { requestId, reason, status: 'rejected' };
      onReject(payload);
    }
  };

  const handleApprove = async (requestId: string) => {
    const result = await showStatusAlert('approve this request');
    if (result.isConfirmed) {
      const payload = { requestId, status: 'approved' };
      onApprove(payload);
    }
  };

  const handleCancel = async (requestId: string) => {
    const result = await showStatusAlert('cancel this request');
    if (result.isConfirmed) {
      const payload = { requestId, status: 'cancelled' };
      onCancel(payload);
    }
  };

  const renderStatus = (row: any) => {
    const fullName = `${row.actionBy?.firstName} ${row.actionBy?.lastName}`;
    const formattedDate = new Date(row.updatedAt);
    const formattedDateString = `${formattedDate
      .getDate()
      .toString()
      .padStart(2, '0')}-${(formattedDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${formattedDate.getFullYear()}`;

    switch (row.status) {
      case 'approved':
        return (
          <Tooltip
            content={
              <div className='custom-tooltip-content'>
                <span>By {fullName} </span>
                <br />
                <span>on {formattedDateString}</span>
              </div>
            }
            placement='bottom'
            className='custom-tooltip'
          >
            <span className='status-approved'>Approved</span>
          </Tooltip>
        );

      case 'rejected':
        return (
          <Tooltip
            content={
              <div className='custom-tooltip-content'>
                <span>Reason: {row.reason}</span>
                <br />
                <span>By {fullName} </span>
                <br />
                <span>on {formattedDateString}</span>
              </div>
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

  const renderActions = (row: any) => {
    if (userRole === UserRole.EMPLOYEE && row.status === 'pending') {
      return (
        <Button
          type='button'
          onClick={() => handleCancel(row._id)}
          className='reject-btn'
        >
          <IconXCircle className='w-6 h-6' />
        </Button>
      );
    }

    if (hasPermission(userRole, 'regulariseRequest', 'acceptDecline')) {
      return (
        <div className='action-buttons'>
          {row.status === 'pending' && (
            <>
              <Button
                type='button'
                onClick={() => handleApprove(row._id)}
                className='approve-btn'
              >
                <IconCheckCircle className='w-6 h-6' />
              </Button>
              <Button
                type='button'
                onClick={() => handleReject(row._id)}
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
    <div className='table-container panel'>
      <div className='table-wrapper'>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              {tableHead.map((header: TableHead) => (
                <th key={header.key} className='table-header'>
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan={8}>
                  <div className='flex justify-center items-center w-full h-32'>
                    <CustomLoader />
                  </div>
                </td>
              </tr>
            </tbody>
          ) : timeReqData?.data?.length > 0 ? (
            <tbody>
              {timeReqData?.data?.map((row: any, index: number) => (
                <tr key={index} className='table-row'>
                  <td className='table-cell'>{row.userId.firstName}</td>
                  <td className='table-cell'>
                    {format(new Date(row.applyDate), 'dd-MM-yyyy')}
                  </td>
                  <td className='table-cell'>
                    {format(new Date(row.createdAt), 'dd-MM-yyyy')}
                  </td>
                  <td className='table-cell'>{row.timeSlot}</td>
                  <td className='table-cell'>{row.projectId.projectName}</td>
                  <td className='table-cell'>{row.description}</td>
                  <td className='table-cell'>{row.requestBy.firstName}</td>
                  <td className='table-cell'>
                    {renderStatus(row)}
                    {renderActions(row)}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={8}>
                  <div className='no-data-alert'>No Data Available!</div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      {!loading && timeReqData?.total > itemsPerPage && (
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
                      setActivePage(index + 1);
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

export default TimeRegulateTable;
