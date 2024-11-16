import React from 'react';
import IconSearch from '../../components/Icon/IconSearch';
import './SearchInput.css';
import { CustomSearchInputProps, SearchProps } from '../../utils/type';
import { IconXCircle } from '../../assets';

const Search: React.FC<SearchProps> = ({
  placeholder = 'Search',
  value,
  onChange,
}) => {
  return (
    <div className='relative'>
      <input
        type='text'
        placeholder={placeholder}
        className='search-input peer'
        value={value}
        onChange={onChange}
      />
      <button type='button' className='search-btn'>
        <IconSearch className='mx-auto' />
      </button>
    </div>
  );
};

export default Search;
