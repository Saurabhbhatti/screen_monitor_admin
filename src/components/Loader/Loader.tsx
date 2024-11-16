import React from 'react';
import { Spinner } from '@material-tailwind/react';

const Loader: React.FC = () => {
  return (
    <div className='flex items-center justify-center h-full'>
      <Spinner
        color='blue'
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
    </div>
  );
};

export default Loader;
