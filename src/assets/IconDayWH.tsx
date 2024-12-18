import { FC } from 'react';

interface IconDayProps {
  className?: string;
}

const IconDayWH: FC<IconDayProps> = ({ className }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M7 4V2.5'
        stroke='#1C274C'
        stroke-width='1.5'
        stroke-linecap='round'
      />
      <path
        d='M17 4V2.5'
        stroke='#1C274C'
        stroke-width='1.5'
        stroke-linecap='round'
      />
      <path
        d='M9 14.5L10.5 13V17'
        stroke='#1C274C'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M13 16V14C13 13.4477 13.4477 13 14 13C14.5523 13 15 13.4477 15 14V16C15 16.5523 14.5523 17 14 17C13.4477 17 13 16.5523 13 16Z'
        stroke='#1C274C'
        stroke-width='1.5'
        stroke-linecap='round'
      />
      <path
        d='M21.5 9H16.625H10.75M2 9H5.875'
        stroke='#1C274C'
        stroke-width='1.5'
        stroke-linecap='round'
      />
      <path
        d='M14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C20.1752 21.4816 19.3001 21.7706 18 21.8985'
        stroke='#1C274C'
        stroke-width='1.5'
        stroke-linecap='round'
      />
    </svg>
  );
};

export default IconDayWH;
