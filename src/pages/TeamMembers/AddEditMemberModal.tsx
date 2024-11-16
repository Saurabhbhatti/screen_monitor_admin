import React, { Fragment } from 'react';
import { Form, Field, FormikProvider, ErrorMessage } from 'formik';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomTextInput from '../../components/CustomInput/CustomInput';
import { Dialog, Transition } from '@headlessui/react';
import { AddEditMemberModalProps } from '../../utils/type';
import { IconX } from '../../assets';
import SearchSelect from '../../components/CustomSelect/CustomSelect';
import './AddEditMemberModal.css';

const AddEditMemberModal: React.FC<AddEditMemberModalProps> = ({
  addContactModal,
  setAddContactModal,
  userUpdateData,
  addUserLoading,
  updateUserLoading,
  handleProjectChange,
  handleUserRoleChange,
  selectedProjectOption,
  selectedUserRoleOption,
  formik,
  projectOption,
  userRoletOption,
  isDisable,
}) => {
  const handleClickCancel = () => {
    setAddContactModal(false);
    formik.setErrors({});
  };
  return (
    <Transition appear show={addContactModal} as={Fragment}>
      <Dialog
        as='div'
        open={addContactModal}
        onClose={handleClickCancel}
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
                  onClick={handleClickCancel}
                  className='absolute top-4 right-4 text-gray-400'
                >
                  <IconX />
                </CustomButton>

                <div className='bg-gray-100 py-3 text-lg font-medium px-5'>
                  {userUpdateData?._id ? 'Edit User' : 'Add User'}
                </div>

                <FormikProvider value={formik}>
                  <Form className='p-4'>
                    <div className='mb-5'>
                      <label htmlFor='firstName'>First Name</label>
                      <Field
                        name='firstName'
                        placeholder='Enter First Name'
                        as={CustomTextInput}
                      />
                    </div>

                    <div className='mb-5'>
                      <label htmlFor='lastName'>Last Name</label>
                      <Field
                        name='lastName'
                        placeholder='Enter Last Name'
                        as={CustomTextInput}
                      />
                    </div>

                    <div className='mb-5'>
                      <label htmlFor='email'>Email</label>
                      <Field
                        name='email'
                        placeholder='Enter Email'
                        as={CustomTextInput}
                      />
                    </div>

                    <div className='mb-5'>
                      <label htmlFor='phone'>Phone Number</label>
                      <Field
                        name='phone'
                        placeholder='Enter Phone Number'
                        as={CustomTextInput}
                      />
                    </div>

                    <div className='mb-5'>
                      <label htmlFor='designation'>Designation</label>
                      <Field
                        name='designation'
                        placeholder='Enter Designation'
                        as={CustomTextInput}
                      />
                    </div>

                    <div className='mb-5'>
                      <label htmlFor='employeeCode'>Employee Code</label>
                      <Field
                        name='empCode'
                        placeholder='Enter Employee Code'
                        as={CustomTextInput}
                      />
                    </div>

                    <div className='mb-5'>
                      <label htmlFor='userRole'>User Role</label>

                      <SearchSelect
                        placeholder='Select User Role'
                        value={selectedUserRoleOption}
                        options={userRoletOption}
                        isSearchable={true}
                        isMulti={false}
                        onChange={handleUserRoleChange}
                      />
                      <ErrorMessage
                        name={'role'}
                        component='span'
                        className='error-message'
                      />
                    </div>

                    <div className='mb-5'>
                      <label htmlFor='project'>Project</label>
                      <SearchSelect
                        placeholder='Select Project'
                        value={selectedProjectOption}
                        options={projectOption}
                        isSearchable={true}
                        isMulti
                        onChange={handleProjectChange}
                      />
                    </div>

                    <div className='flex justify-end items-center mt-8'>
                      <CustomButton
                        type='button'
                        className='px-5 py-2 text-sm font-medium border rounded-md transition duration-300 hover:shadow-none btn-outline-danger'
                        onClick={handleClickCancel}
                      >
                        Cancel
                      </CustomButton>
                      {userUpdateData?._id ? (
                        <CustomButton
                          type='submit'
                          label='Update'
                          disabled={isDisable}
                          className={`button-style ${
                            isDisable ? 'button-disabled' : 'button-enabled'
                          } ${updateUserLoading ? 'opacity-50' : ''}`}
                          isLoading={updateUserLoading}
                        >
                          {'Update'}
                        </CustomButton>
                      ) : (
                        <CustomButton
                          type='submit'
                          className='button-style bg-primary'
                          isLoading={addUserLoading}
                        >
                          {'Add'}
                        </CustomButton>
                      )}
                    </div>
                  </Form>
                </FormikProvider>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddEditMemberModal;
