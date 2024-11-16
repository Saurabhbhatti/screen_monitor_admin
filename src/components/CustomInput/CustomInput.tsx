import React from 'react';
import { Field, FieldProps, ErrorMessage } from 'formik';
import './CustomInput.css';
import { CustomTextInputProps } from '../../utils/type';

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  name,
  className,
  labelProps = {},
  placeholder,
  label,
  disabled,
  type = 'text',
  labelVisibility = 'visible',
  icon,
}) => {
  return (
    <div className={`relative ${className}`}>
      <Field name={name} id={name}>
        {({ field }: FieldProps<any>) => (
          <div className='relative'>
            <input
              type={type}
              className={'input-text'}
              placeholder={placeholder}
              {...field}
              disabled={disabled}
              style={{ paddingLeft: icon ? '3rem' : '1rem' }}
            />
            {icon && <span className='icon'>{icon}</span>}
          </div>
        )}
      </Field>
      <ErrorMessage name={name} component='span' className='error-message' />
    </div>
  );
};

export default CustomTextInput;
