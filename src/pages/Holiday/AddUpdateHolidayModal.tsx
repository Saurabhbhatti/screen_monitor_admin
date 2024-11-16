import React, { Fragment } from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import { Dialog, Transition } from '@headlessui/react';
import { AddUpdateHolidayModalProps } from '../../utils/type';
import { IconX } from '../../assets';
import Flatpickr from 'react-flatpickr';
import './AddUpdateHoliday.css';

const AddUpdateHolidayModal: React.FC<AddUpdateHolidayModalProps> = ({
  isOpen,
  loading,
  holidayName,
  holidayDate,
  onClose,
  handleCancel,
  setHolidayName,
  setHolidayDate,
  editingHolidayId,
  handleAddHoliday,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        open={isOpen}
        onClose={onClose}
        className='relative z-[51]'
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/60' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center px-4 py-8'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='relative max-w-lg w-full rounded-lg border-0 p-0 overflow-hidden bg-white text-black'>
                <CustomButton
                  type='button'
                  onClick={onClose}
                  className='absolute top-4 right-4 text-gray-400'
                >
                  <IconX />
                </CustomButton>
                <div className='formSection'>
                  <h3>
                    <strong>{editingHolidayId ? 'Edit' : 'Add'}</strong>
                  </h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddHoliday();
                    }}
                  >
                    <div className='formGroup'>
                      <label htmlFor='holidayName'>Holiday Name:</label>
                      <input
                        type='text'
                        placeholder='Enter Name'
                        id='holidayName'
                        value={holidayName}
                        onChange={(e) => setHolidayName(e.target.value)}
                        required
                        className='form-input'
                      />
                    </div>
                    <div className='formGroup'>
                      <label htmlFor='holidayDate'>Date:</label>
                      <Flatpickr
                        value={holidayDate ? [holidayDate] : []}
                        options={{
                          dateFormat: 'd-m-Y',
                          position: 'auto right',
                          allowInput: true,
                        }}
                        className='flatpicker form-input'
                        onChange={(date: Date[]) => setHolidayDate(date[0])}
                        placeholder='Select Date'
                      />
                    </div>
                    <div className='action-button'>
                      {editingHolidayId && (
                        <CustomButton
                          type='button'
                          className='holiday-cancel-button'
                          onClick={handleCancel}
                        >
                          Cancel
                        </CustomButton>
                      )}
                      <CustomButton
                        type='submit'
                        className={`button-style ${
                          editingHolidayId ? 'bg-primary' : 'full-width'
                        } ${
                          !holidayDate
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                            : 'bg-primary'
                        }`}
                        disabled={!holidayDate}
                      >
                        {editingHolidayId ? 'Update' : 'Add'}
                      </CustomButton>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddUpdateHolidayModal;
