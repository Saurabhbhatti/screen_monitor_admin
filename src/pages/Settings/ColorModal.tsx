import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CustomButton from '../../components/CustomButton/CustomButton';
import { IconX } from '../../assets';

const ColorModal = () => {
  return (
    <Transition appear show={false} as={Fragment}>
      <Dialog
        as='div'
        open={false}
        onClose={() => {}}
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
                  onClick={() => {}}
                  className='absolute top-4 right-4 text-gray-400'
                >
                  <IconX />
                </CustomButton>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ColorModal;
