import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css';
import { ToastMessageProps } from '../../utils/type';
const MySwal = withReactContent(Swal);

const ToastMessage: React.FC<ToastMessageProps> = ({
  message,
  position = 'bottom-start',
}) => {
  const showMessage = () => {
    MySwal.fire({
      title: message,
      toast: true,
      position: position,
      showConfirmButton: false,
      timer: 3000,
      showCloseButton: true,
    });
  };

  return (
    <div className='mb-5'>
      <div className='flex items-center justify-center'>
        <button type='button' className='btn btn-primary' onClick={showMessage}>
          {message}
        </button>
      </div>
    </div>
  );
};

export default ToastMessage;
