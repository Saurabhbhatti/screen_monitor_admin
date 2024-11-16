import React from 'react';
import { SearchSelectProps } from '../../utils/type';
import Select from 'react-select';

const SearchSelect: React.FC<SearchSelectProps> = ({
  placeholder,
  value,
  options,
  className,
  isSearchable = true,
  isMulti = false,
  onChange,
  styles,
  isDisabled = false,
  isClearable = false
}) => {
  return (
    <Select
      placeholder={placeholder}
      value={value}
      options={options}
      className={className}
      isSearchable={isSearchable}
      isMulti={isMulti}
      onChange={onChange}
      isClearable={isClearable}
      isDisabled={isDisabled}
      styles={styles}
    />
  );
};

export default SearchSelect;
