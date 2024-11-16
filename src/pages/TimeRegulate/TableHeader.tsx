import React from 'react';
import SearchSelect from '../../components/CustomSelect/CustomSelect';
import CustomSwitch from '../../components/SwitchComponent/SwitchComponent';
import Button from '../../components/CustomButton/CustomButton';
import Flatpickr from 'react-flatpickr';
import { hasPermission } from '../../utils';
import { TimeRegulationHeadProps } from '../../utils/type';
import './TableHeader.css';
const TableHeader: React.FC<TimeRegulationHeadProps> = ({
  userRole,
  handleSelfSwitch,
  isSelf,
  memberOptions,
  selectedMember,
  handleMemberChange,
  statusFormat,
  statusOptions,
  onStatusChange,
  maxDate,
  dateRange,
  setDateRange,
  handleButtonClick,
}) => {
  return (
    <div className='table-header-main'>
      <h2 className='table-header-h2'>Time Regulation</h2>
      <div className='table-header-main-sub'>
        <div className='table-header-main-detail'>
          <div className='table-header-main-detail-sub'>
            <span className='filter-label '>Filter by:</span>
            {hasPermission(userRole, 'regulariseRequest', 'read') && (
              <div className='table-header-span-selecter'>
                <div className='table-header-span'>
                  <span>Self :</span>
                  <CustomSwitch onChange={handleSelfSwitch} checked={isSelf} />
                </div>

                <SearchSelect
                  placeholder='Select Member'
                  options={memberOptions}
                  isSearchable={true}
                  value={selectedMember}
                  onChange={handleMemberChange}
                  isClearable={true}
                  className='table-header-selecter'
                  styles={{
                    menuPortal: (base: React.CSSProperties) => ({
                      ...base,
                      zIndex: 9999,
                    }),
                  }}
                />
              </div>
            )}
            <SearchSelect
              placeholder='Select Status'
              value={statusFormat}
              isSearchable={true}
              options={statusOptions}
              className='select-format'
              onChange={onStatusChange}
              isClearable={true}
            />
          </div>
          <div className='table-header-data-flatpickr'>
            <Flatpickr
              options={{ mode: 'range', dateFormat: 'Y-m-d', maxDate }}
              value={dateRange}
              onChange={(dates: Date[]) => setDateRange(dates)}
              className='table-header-time-activity-date-picker'
              placeholder='Select date range'
            />
            <Button
              onClick={handleButtonClick}
              className='table-header-plus-button'
            >
              <span className='plus-icon'>+</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
