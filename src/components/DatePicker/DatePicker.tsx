import React from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import './DatePicker.css';
import { DatePickerProps } from '../../utils/type';

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  return (
    <Flatpickr
      value={value || undefined}
      options={{
        dateFormat: 'Y-m-d',
        position: 'auto right',
        allowInput: true,
      }}
      className='custom-date-picker'
      onChange={onChange}
      placeholder='Select Date'
    />
  );
};

export default DatePicker;
