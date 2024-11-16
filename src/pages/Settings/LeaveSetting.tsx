import { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Button from '../../components/CustomButton/CustomButton';
import SearchSelect from '../../components/CustomSelect/CustomSelect';
import { leaveOptions, LeaveColourType } from '../../utils/mockData';
import {
  LeaveColors,
  LeavePayload,
  OptionType,
  SettingRootState,
} from '../../utils/type';
import { fetchaAddUpdateSettingRequest } from '../../redux/setting/action';
import './Setting.css';

const LeaveSettings = () => {
  const hexColor = '#00FF00';
  const dispatch = useDispatch();
  const { data, loading } = useSelector(
    (state: SettingRootState) => state?.settings
  );
  const leave = data?.leave || {};

  const colorPickerRef = useRef<HTMLDivElement | null>(null);

  const [leaveValue, setLeaveValue] = useState<string | number>(
    leave?.leaveValue || ''
  );
  const [leaveType, setLeaveType] = useState<OptionType | undefined>(
    leaveOptions.find((option) => option.value === leave?.leaveType)
  );
  const [selectedColours, setSelectedColours] = useState<{
    [key: string]: string;
  }>({
    sickLeave: '',
    vacationLeave: '',
    personalLeave: '',
    onLeave: '',
    absent: '',
    present: '',
  });
  const [activeColorPickerKey, setActiveColorPickerKey] = useState<
    string | null
  >(null);

  useEffect(() => {
    // Update state with leave data when it changes
    if (leave) {
      setLeaveValue(leave.leaveValue || '');
      setLeaveType(
        leaveOptions.find((option) => option.value === leave.leaveType) ||
          undefined
      );
      setSelectedColours({
        sickLeave: leave.leaveColor?.sickLeave || '',
        vacationLeave: leave.leaveColor?.vacationLeave || '',
        personalLeave: leave.leaveColor?.personalLeave || '',
        onLeave: leave.leaveColor?.onLeave || '',
        absent: leave.leaveColor?.absent || '',
        present: leave.leaveColor?.present || '',
      });
    }
  }, [leave]);

  const isUpdate = () => {
    return (
      leaveValue ||
      leaveType ||
      Object.values(selectedColours).some((color) => color)
    );
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLeaveValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const regex = /^\d*\.?\d*$/;

    if (regex.test(value)) {
      setLeaveValue(value);
    }
  };

  const handleLeaveTypeChange = (selectedOption: OptionType) => {
    setLeaveType(selectedOption);
  };

  const handleColourChange = (key: string) => (selectedColour: string) => {
    setSelectedColours((prev) => ({ ...prev, [key]: selectedColour }));
  };

  const toggleColorPicker = (key: string) => {
    setActiveColorPickerKey((prev) => (prev === key ? null : key));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      colorPickerRef.current &&
      !colorPickerRef.current.contains(event.target as Node)
    ) {
      setActiveColorPickerKey(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!leaveType || !leaveType.value || !leaveValue) {
      toast.error(
        'Please select a leave type and enter a value before submitting!'
      );
      return;
    }

    const leaveColor: LeaveColors = {
      sickLeave: selectedColours.sickLeave,
      vacationLeave: selectedColours.vacationLeave,
      personalLeave: selectedColours.personalLeave,
      onLeave: selectedColours.onLeave,
      absent: selectedColours.absent,
      present: selectedColours.present,
    };

    const payload: LeavePayload = {
      leave: {
        leaveType: leaveType.value,
        leaveValue,
        leaveColor,
      },
    };

    dispatch(fetchaAddUpdateSettingRequest(payload));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='leaveSetting-main-container'>
          <div className='leaveSetting-container'>
            <label className='setting-label'>Leave Type</label>
            <div className='mt-3'>
              <SearchSelect
                placeholder='Select Leave'
                options={leaveOptions}
                isSearchable={false}
                value={leaveType}
                onChange={handleLeaveTypeChange}
                className='w-full'
              />
            </div>
          </div>
          <div className='leaveSetting-label-div'>
            <label className='setting-label'>Leave Value</label>
            <input
              className='leaveSetting-value'
              value={leaveValue}
              onChange={handleLeaveValueChange}
            />
          </div>
        </div>

        <label className='setting-label'>Leave Colours</label>

        <div className='flex'>
          <div className='leaveSetting-left-side'>
            {LeaveColourType.slice(0, 3).map((item) => (
              <div key={item.key} className='leave-color-item'>
                <span className='font-semibold w-[150px]'>{item.label}:</span>
                <div className='leave-color-input-container'>
                  <input
                    type='text'
                    value={selectedColours[item.key] || ''}
                    onChange={(e) =>
                      handleColourChange(item.key)(e.target.value)
                    }
                    className='leave-color-input'
                    placeholder='Enter Hex Color'
                  />

                  <span
                    className='leave-color-preview'
                    style={{
                      backgroundColor: selectedColours[item.key] || hexColor,
                      marginTop: 2,
                    }}
                    onClick={() => toggleColorPicker(item.key)}
                  ></span>

                  {activeColorPickerKey === item.key && (
                    <div
                      ref={colorPickerRef}
                      className='color-picker-container'
                    >
                      <HexColorPicker
                        color={selectedColours[item.key] || hexColor}
                        onChange={handleColourChange(item.key)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Remaining Items Defined */}
          <div className='leaveSetting-right-side'>
            {LeaveColourType.slice(3, 6).map((item) => (
              <div key={item.key} className='leave-color-item'>
                <span className='font-semibold w-[150px]'>{item.label}:</span>
                <div className='leave-color-input-container'>
                  <input
                    type='text'
                    value={selectedColours[item.key] || ''}
                    onChange={(e) =>
                      handleColourChange(item.key)(e.target.value)
                    }
                    className='leave-color-input'
                    placeholder='Enter Hex Color'
                  />

                  <span
                    className='leave-color-preview'
                    style={{
                      backgroundColor: selectedColours[item.key] || hexColor,
                      marginTop: 2,
                    }}
                    onClick={() => toggleColorPicker(item.key)}
                  ></span>

                  {activeColorPickerKey === item.key && (
                    <div
                      ref={colorPickerRef}
                      className='color-picker-container'
                    >
                      <HexColorPicker
                        color={selectedColours[item.key] || hexColor}
                        onChange={handleColourChange(item.key)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button type='submit' className='update-button-style'>
          {isUpdate() ? 'Update' : 'Add'}
        </Button>
      </form>
    </div>
  );
};

export default LeaveSettings;
