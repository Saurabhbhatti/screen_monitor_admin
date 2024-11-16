import React from 'react';
import { ButtonProps } from '../../utils/type';
import { Spinner } from '@material-tailwind/react';

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  className = '',
  onClick,
  children,
  isLoading = false,
}) => {
  return (
    <button
      type={type}
      className={`btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] ${className}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <Spinner
          color='blue'
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
