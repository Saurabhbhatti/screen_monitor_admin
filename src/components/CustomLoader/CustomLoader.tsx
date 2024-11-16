import React from 'react';

const CustomLoader: React.FC = () => {
  return (
    <div className='flex justify-center items-center w-10 h-10'>
      <span className='animate-spin border-4 border-transparent border-l-primary rounded-full w-10 h-10'></span>
    </div>
  );
};

export default CustomLoader;
