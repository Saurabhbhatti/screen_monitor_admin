import React from 'react';
import { ControlsProps } from '../../utils/type';
import './DsrPage.css';
import Flatpickr from 'react-flatpickr';
import SearchSelect from '../../components/CustomSelect/CustomSelect';
import Dropdown from '../../components/Dropdown';
import { getEndOfCurrentWeek, hasPermission } from '../../utils';

const DsrHeader: React.FC<ControlsProps> = ({
  userRole,
  memberOptions,
  handleMemberChange,
  selectedMember,
  dateRange,
  setDateRange,
  fileFormat,
  onFormatChange,
}) => {
  const handleDateChange = (selectedDates: Date[]) => {
    if (selectedDates.length === 2) {
      setDateRange(selectedDates);
    }
  };

  return (
    <div className='controls'>
      <span className='filter-label '>Filter by:</span>
      {hasPermission(userRole, 'report', 'read') && (
        <SearchSelect
          placeholder='Select Member'
          options={memberOptions}
          isSearchable
          value={selectedMember}
          onChange={handleMemberChange}
          styles={{
            menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
          }}
        />
      )}

      <Flatpickr
        options={{
          mode: 'range',
          dateFormat: 'Y-m-d',
          maxDate: getEndOfCurrentWeek(),
        }}
        value={dateRange}
        onChange={handleDateChange}
        className='attendance-date-picker'
        placeholder='Select date range'
      />

      {hasPermission(userRole, 'report', 'write') && (
        <Dropdown
          offset={[0, 5]}
          placement='bottom-end'
          btnClassName='dropdown-toggle export-btn'
          button={
            <>
              {fileFormat?.label || 'Select Format'}
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </span>
            </>
          }
        >
          <ul>
            <li>
              <button
                type='button'
                onClick={() =>
                  onFormatChange({ value: 'xlsx', label: 'Excel' })
                }
                className='dropdown-item'
              >
                Excel
              </button>
            </li>
          </ul>
        </Dropdown>
      )}
    </div>
  );
};

export default DsrHeader;
