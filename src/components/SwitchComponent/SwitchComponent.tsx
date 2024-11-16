import React from 'react';
import './SwitchComponent.css';
import { CustomSwitchProps, SwitchComponentProps } from '../../utils/type';

const CustomSwitch: React.FC<any> = ({
  id,
  isSelected,
  onChange,
}) => {
  return (
    <label className='switch-lable'>
      <input
        type='checkbox'
        className='switch-input peer custom_switch'
        id={id}
        checked={isSelected}
        onChange={onChange}
      />
      <span className='switch-toggle'></span>
    </label>
  );
};

export default CustomSwitch;
