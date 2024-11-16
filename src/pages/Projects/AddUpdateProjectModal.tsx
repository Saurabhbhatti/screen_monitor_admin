import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ErrorMessage, Field, Form, FormikProvider } from 'formik';
import CustomTextInput from '../../components/CustomInput/CustomInput';
import SearchSelect from '../../components/CustomSelect/CustomSelect';
import Button from '../../components/CustomButton/CustomButton';
import { IconX } from '../../assets';
import { AddUpdateProjectModalProps } from '../../utils/type';
import './AddUpdateProjectModal.css';

const AddUpdateProjectModal: React.FC<AddUpdateProjectModalProps> = ({
  addProjectModal,
  setAddProjectModal,
  projectUpdateData,
  formik,
  getFieldProps,
  values,
  setFieldValue,
  memberOptions,
  selectedAddMembers,
  customStyles,
  handleAddSelectedMemberChange,
  isModifyingProject,
  isDisable,
}) => {
  const handleClickCancel = () => {
    setAddProjectModal(false);
    formik.setErrors({});
  };

  return (
    <Transition appear show={addProjectModal} as={Fragment}>
      <Dialog
        as='div'
        open={addProjectModal}
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
          <div className='main-transition' />
        </Transition.Child>
        <div className='dialog-div'>
          <div className='sub-dialog-div'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='panel dialog-panel-list'>
                <Button
                  type='button'
                  onClick={handleClickCancel}
                  className='closeIcon'
                >
                  <IconX />
                </Button>
                <div className='lable-modal'>
                  {projectUpdateData?._id ? 'Edit Project' : 'Add Project'}
                </div>
                <div className='p-5'>
                  <FormikProvider value={formik}>
                    <Form>
                      <div className='mb-5'>
                        <label htmlFor='name'>Enter Project Name</label>
                        <CustomTextInput
                          {...getFieldProps('projectName')}
                          name='projectName'
                          placeholder='Enter Project Name'
                        />
                      </div>
                      <div className='mb-5'>
                        <label className='flex items-center'>
                          <input
                            {...getFieldProps('isScreenshot')}
                            type='checkbox'
                            name='isScreenshot'
                            checked={values.isScreenshot}
                            onChange={() =>
                              setFieldValue(
                                'isScreenshot',
                                !values.isScreenshot
                              )
                            }
                            className='check-box form-checkbox'
                          />
                          <span>Screenshot</span>
                        </label>
                      </div>
                      <div className='mb-5'>
                        <label htmlFor='member'>Member</label>
                        <SearchSelect
                          placeholder='Select Member'
                          options={memberOptions}
                          isMulti
                          value={selectedAddMembers}
                          styles={customStyles}
                          isSearchable={false}
                          onChange={handleAddSelectedMemberChange}
                        />
                        <ErrorMessage
                          name={'memberIds'}
                          component='span'
                          className='error-message'
                        />
                      </div>
                      <div className='mb-5'>
                        <label htmlFor='address'>Notes</label>
                        <Field name={'notes'} id={'notes'}>
                          {({ field }: any) => (
                            <div className='relative'>
                              <textarea
                                id='notes'
                                rows={3}
                                placeholder='Enter Notes'
                                className='notes-area form-textarea'
                                {...field}
                              />
                            </div>
                          )}
                        </Field>
                        <ErrorMessage
                          name={'notes'}
                          component='div'
                          className='error-message'
                        />
                      </div>
                      <div className='btn-div'>
                        <Button
                          type='button'
                          onClick={handleClickCancel}
                          className='cancel  btn-outline-danger'
                        >
                          Cancel
                        </Button>
                        <Button
                          disabled={projectUpdateData?._id ? isDisable : false}
                          isLoading={isModifyingProject}
                          type='submit'
                          className={`submit ${isDisable ? 'disabled' : ''}`}
                        >
                          {projectUpdateData?._id ? 'Update' : 'Save'}
                        </Button>
                      </div>
                    </Form>
                  </FormikProvider>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddUpdateProjectModal;
