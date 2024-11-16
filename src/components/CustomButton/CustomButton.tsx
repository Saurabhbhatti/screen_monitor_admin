import { Spinner } from '@material-tailwind/react';
import React from 'react';
import { ButtonProps } from '../../utils/type';

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  className = '',
  onClick,
  children,
  isLoading = false,
  disabled = false,
  label,
  variant,
}) => {
  return (
    <button type={type} className={className} disabled={disabled} onClick={onClick}>
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
