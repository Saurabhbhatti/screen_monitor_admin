import React from 'react';
import './ConfirmationModal.css';
import CustomButton from '../CustomButton/CustomButton';
import ImageComponent from '../ImageComponent/ImageComponent';
import { IconX } from '../../assets';
import { ModalProps } from '../../utils/type';

const ConfirmationModal: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onClose,
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <div className='button-container'>
          <div className='modal-header'>{title}</div>
          <div className='btn-header'>
            <ImageComponent onClick={onClose}>
              <IconX />
            </ImageComponent>
          </div>
        </div>
        <div className='modal-body'>
          <p>{message}</p>
        </div>
        <div className='modal-footer'>
          <button onClick={onClose} className='btn-cancel'>
            Cancel
          </button>
          <CustomButton
            label={'Confirm'}
            isLoading={loading}
            onClick={onConfirm}
            className='btn-confirm'
            children={undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
