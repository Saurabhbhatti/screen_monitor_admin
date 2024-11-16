import {IconButton} from '@material-tailwind/react';
import React, {Children} from 'react';

const CustomIconButton: React.FC<any> = ({
  variant = 'text',
  className = '',
  children,
  onClick,
  ...props
}) => {
  return (
    <div>
      <IconButton
        onClick={onClick}
        variant={variant}
        className={className}
        {...props}>
        {children}
      </IconButton>
    </div>
  );
};

export default CustomIconButton;
