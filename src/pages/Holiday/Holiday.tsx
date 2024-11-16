import React, { useEffect, useState } from 'react';
import 'flatpickr/dist/flatpickr.css';
import './Holiday.css';
import { Holiday, HolidayState } from '../../utils/type';
import { useDispatch, useSelector } from 'react-redux';
import { IconEdit, IconTrashLines } from '../../assets';
import {
  addHolidayRequest,
  fetchHolidaysRequest,
  editHolidayRequest,
  deleteHolidayRequest,
} from '../../redux/holiday/action';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import CustomButton from '../../components/CustomButton/CustomButton';
import { formatDate, getUserRole, hasPermission } from '../../utils';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import Button from '../../components/CustomButton/CustomButton';
import IconUserPlus from '../../components/Icon/IconUserPlus';
import AddUpdateHolidayModal from './AddUpdateHolidayModal';
import { Tooltip } from '@material-tailwind/react';

const Holidays: React.FC = () => {
  const [holidayName, setHolidayName] = useState<string>('');
  const [holidayDate, setHolidayDate] = useState<Date | null>(null);
  const [editingHolidayId, setEditingHolidayId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedHolidays, setSelectedHolidays] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { holidays, loading } = useSelector(
    (state: HolidayState) => state.holidayReducer
  );

  const userRole = getUserRole();
  useEffect(() => {
    dispatch(fetchHolidaysRequest());
  }, [dispatch]);

  const handleAddHoliday = () => {
    if (!holidayDate) {
      console.error('Holiday date is required.');
      return;
    }

    const holidayData = {
      name: holidayName,
      date: dayjs(holidayDate).format('YYYY-MM-DD'),
    };

    if (editingHolidayId) {
      dispatch(
        editHolidayRequest({ holidayId: editingHolidayId, ...holidayData })
      );
      setEditingHolidayId(null);
      setIsModalOpen(false);
    } else {
      dispatch(addHolidayRequest(holidayData));
      setIsModalOpen(false);
    }

    resetForm();
  };

  const resetForm = () => {
    setHolidayName('');
    setHolidayDate(null);
    setEditingHolidayId(null);
  };

  const handleEditHoliday = (holiday: Holiday) => {
    setHolidayName(holiday.name);
    setHolidayDate(new Date(holiday.date));
    setEditingHolidayId(holiday._id);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    resetForm();
    setIsModalOpen(false);
  };

  const handleDeleteHoliday = (holidayId: string) => {
    showAlert(10, [holidayId]);
  };

  const handleCheckboxChange = (holidayId: string) => {
    setSelectedHolidays((prev) =>
      prev.includes(holidayId)
        ? prev.filter((id) => id !== holidayId)
        : [...prev, holidayId]
    );
  };

  const handleSelectAllHolidaysChange = () => {
    if (selectedHolidays.length === holidays.data.length) {
      setSelectedHolidays([]);
    } else {
      setSelectedHolidays(holidays.data.map((holiday: Holiday) => holiday._id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedHolidays.length > 0) {
      showAlert(10, selectedHolidays);
    } else {
      toast.error('No holidays selected for deletion.');
    }
  };

  const showAlert = async (type: number, holidayIds: string[]) => {
    if (type === 10) {
      const options: SweetAlertOptions = {
        icon: 'warning',
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: 'Delete',
        padding: '2em',
        customClass: {
          popup: 'sweet-alerts',
          confirmButton: 'btn btn-danger',
        },
      };

      Swal.fire(options).then((result) => {
        if (result.isConfirmed) {
          if (Array.isArray(holidayIds)) {
            dispatch(deleteHolidayRequest(holidayIds));
          } else {
            dispatch(deleteHolidayRequest([holidayIds]));
          }

          Swal.fire({
            title: 'Deleted!',
            text: 'Holiday(s) deleted successfully.',
            icon: 'success',
            customClass: {
              popup: 'sweet-alerts',
              confirmButton: 'btn btn-success',
            },
          });
          setSelectedHolidays([]);
        }
      });
    }
  };

  return (
    <div>
      <div className='holiday-header'>
        <h2 className='holiday-heading'>Holiday</h2>
        <div className='add-holiday-button'>
          {hasPermission(userRole, 'holiday', 'write') && (
            <Button
              type='button'
              className='adduser-button-style'
              onClick={() => setIsModalOpen(true)}
            >
              <IconUserPlus className='userplus-icon' />
              Add Holiday
            </Button>
          )}
        </div>
      </div>

      {hasPermission(userRole, 'holiday', 'write') &&
        selectedHolidays.length > 0 && (
          <div className='selected-holidays-actions flex justify-between items-center'>
            <div className='flex items-center gap-4'>
              <Tooltip content='Select all'>
                <input
                  type='checkbox'
                  className='form-checkbox'
                  checked={selectedHolidays.length === holidays?.data?.length}
                  onChange={() => handleSelectAllHolidaysChange()}
                />
              </Tooltip>
              <span className='selected-item-count'>
                {selectedHolidays.length} items selected
              </span>
            </div>
            <button onClick={handleDeleteSelected} className='delete-button'>
              <IconTrashLines className='text-danger w-4.5 h-4.5' /> Delete
            </button>
          </div>
        )}

      <div className='holiday-container'>
        <div className='holiday-table-container panel'>
          <div className='holiday-table-wrapper'>
            <table className='table table-striped table-hover'>
              <thead>
                <tr className='table-row'>
                  {hasPermission(userRole, 'holiday', 'write') && (
                    <th className='table-header-cell-first'></th>
                  )}
                  <th className='table-header-cell-first'>Name</th>
                  <th className='table-header-cell-first'>Day</th>
                  <th className='table-header-cell-first'>Date</th>
                  {hasPermission(userRole, 'holiday', 'write') && (
                    <th className='table-header-cell-first'>Actions</th>
                  )}
                </tr>
              </thead>
              {loading ? (
                <tbody>
                  <tr>
                    <td colSpan={5}>
                      <div className='custom-loading'>
                        <CustomLoader />
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : holidays?.data?.length > 0 ? (
                <tbody>
                  {holidays.data.map((holiday: Holiday) => (
                    <tr key={holiday._id}>
                      {hasPermission(userRole, 'holiday', 'write') && (
                        <td>
                          <Tooltip content='Select'>
                            <input
                              type='checkbox'
                              className='form-checkbox'
                              checked={selectedHolidays.includes(holiday._id)}
                              onChange={() => handleCheckboxChange(holiday._id)}
                            />
                          </Tooltip>
                        </td>
                      )}
                      <td className='table-cell'>{holiday.name}</td>
                      <td className='table-cell'>{holiday.day}</td>

                      <td className='table-cell-sticky-left'>
                        {formatDate(holiday.date)}
                      </td>
                      {hasPermission(userRole, 'holiday', 'write') && (
                        <td className='whitespace-nowrap'>
                          <div className='custome-button-holiday'>
                            <CustomButton
                              type='button'
                              onClick={() => handleEditHoliday(holiday)}
                              className=''
                            >
                              <IconEdit className='w-5 h-5 text-warning' />
                            </CustomButton>
                            <CustomButton
                              type='button'
                              onClick={() => handleDeleteHoliday(holiday._id)}
                              className=''
                            >
                              <IconTrashLines className='text-danger w-5 h-5' />
                            </CustomButton>
                          </div>
                        </td>
                      )}
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
        </div>
      </div>

      {hasPermission(userRole, 'holiday', 'write') && (
        <AddUpdateHolidayModal
          loading={loading}
          isOpen={isModalOpen}
          holidayName={holidayName}
          holidayDate={holidayDate}
          onClose={() => setIsModalOpen(false)}
          handleAddHoliday={handleAddHoliday}
          handleCancel={handleCancel}
          setHolidayName={setHolidayName}
          setHolidayDate={setHolidayDate}
          editingHolidayId={editingHolidayId}
        />
      )}
    </div>
  );
};

export default Holidays;
