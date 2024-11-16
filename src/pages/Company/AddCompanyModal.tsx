import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { IconX } from '../../assets';
import { ErrorMessage, Form, FormikProvider, useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { companyAddEditValidation } from '../../utils/validation';
import { AddEditCompany, OptionType } from '../../utils/type';
import Button from '../../components/CustomButton/CustomButton';
import CustomTextInput from '../../components/CustomInput/CustomInput';
import SearchSelect from '../../components/CustomSelect/CustomSelect';

const AddCompanyModal = ({
  isOpen,
  onClose,
  companyUpdateData,
  userRoletOption,
  isModifyLoading,
  onSubmit,
}: AddEditCompany) => {
  const dispatch = useDispatch();

  const initialValues = {
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    companyAddress: '',
    companyWebsite: '',
    firstName: '',
    lastName: '',
    designation: '',
    email: '',
    phone: '',
    role: '',
    empCode: '',
  };

  const [submissionSuccess, setSubmissionSuccess] = useState<Boolean>(false);
  const [selectedUserRoletOption, setSelectedUserRoletOption] =
    useState<any>(null);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: companyAddEditValidation,
    onSubmit: async (values, { setSubmitting }) => {
      const companyData: any = {
        firstName: values.firstName,
        lastName: values.lastName,
        designation: values.designation,
        email: values.email,
        phone: values.phone,
        companyName: values.companyName,
        companyEmail: values.companyEmail,
        companyPhone: values.companyPhone,
        companyAddress: values.companyAddress,
        companyWebsite: values.companyWebsite,
        role: values.role,
        empCode: values.empCode,
      };
      if (companyUpdateData?.company?._id) {
        companyData.userId = companyUpdateData?.user?._id;
        companyData.companyId = companyUpdateData?.company?._id;
      }

      onSubmit(companyData);

      setSubmitting(true);
    },
  });

  const { getFieldProps, setFieldValue, values, resetForm } = formik;

  const resetFormValues = () => {
    if (companyUpdateData !== null) {
      const roleOption = {
        label: companyUpdateData?.user?.role,
        value: companyUpdateData?.user?.role,
      };
      setSelectedUserRoletOption(roleOption);
    } else {
      setSelectedUserRoletOption(null);
    }
    if (companyUpdateData && companyUpdateData?.user._id) {
      setFieldValue('firstName', companyUpdateData?.user?.firstName);
      setFieldValue('lastName', companyUpdateData?.user?.lastName);
      setFieldValue('designation', companyUpdateData?.user?.designation);
      setFieldValue('email', companyUpdateData?.user?.email);
      setFieldValue('phone', companyUpdateData?.user?.phone);
      setFieldValue('companyName', companyUpdateData?.company.companyName);
      setFieldValue('companyEmail', companyUpdateData?.company.companyEmail);
      setFieldValue('companyPhone', companyUpdateData?.company.companyPhone);
      setFieldValue(
        'companyAddress',
        companyUpdateData?.company.companyAddress
      );
      setFieldValue(
        'companyWebsite',
        companyUpdateData?.company.companyWebsite
      );
      setFieldValue('role', companyUpdateData?.user?.role);
      setFieldValue('empCode', companyUpdateData?.user?.empCode);
    } else {
      resetForm();
    }
  };

  const handleClose = () => {
    formik.setErrors({});
    onClose();
  };

  useEffect(() => {
    resetFormValues();
  }, [companyUpdateData]);

  useEffect(() => {
    if (values) {
      formik.setErrors({});
    }
  }, [values]);

  useEffect(() => {
    if (submissionSuccess) {
      resetForm();
      setSubmissionSuccess(false);
      onClose();
    }
  }, [submissionSuccess]);

  const handleUserRoleChange = (selectedOptions: OptionType) => {
    setSelectedUserRoletOption(selectedOptions);
    formik.setFieldValue('role', values);
  };

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          open={isOpen}
          onClose={handleClose}
          className='modal-main'
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
            <div className='modal-transition' />
          </Transition.Child>
          <div className='dialog'>
            <div className='sub-dialog'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='dialog-panel panel'>
                  <div className='relative'>
                    <Button
                      type='button'
                      onClick={handleClose}
                      className='iconX'
                    >
                      <IconX />
                    </Button>
                  </div>
                  <div className='edit-add-company'>
                    {companyUpdateData?._id ? 'Edit Company' : 'Add Company'}
                  </div>
                  <div
                    className='overflow-y-auto p-5'
                    style={{ maxHeight: 'calc(100vh - 150px)' }}
                  >
                    <h3 className='company-lable'>Company Details:</h3>
                    <FormikProvider value={formik}>
                      <Form>
                        <div className='company-form'>
                          <div>
                            <label htmlFor='firstName'>Company Name</label>
                            <CustomTextInput
                              name='companyName'
                              placeholder='Enter Company Name'
                            />
                          </div>

                          <div>
                            <label htmlFor='companyEmail'>Email</label>
                            <CustomTextInput
                              name='companyEmail'
                              placeholder='Enter Company Email'
                            />
                          </div>
                          <div>
                            <label htmlFor='companyPhone'>Phone</label>

                            <CustomTextInput
                              name='companyPhone'
                              placeholder='Enter Company Mobile Number'
                            />
                          </div>
                          <div>
                            <label htmlFor='companyAddress'>Address</label>

                            <CustomTextInput
                              name='companyAddress'
                              placeholder='Enter Company Address'
                            />
                          </div>
                          <div>
                            <label htmlFor='companyWebsite'>Website</label>

                            <CustomTextInput
                              name='companyWebsite'
                              placeholder='Enter Company Website'
                            />
                          </div>
                        </div>
                        <hr className='hr border-gray' />
                        <h5 className='company-lable'>Admin Details:</h5>
                        <div className='admin-detail'>
                          <div>
                            <label htmlFor='firstName'>First Name</label>

                            <CustomTextInput
                              name='firstName'
                              placeholder='Enter First Name'
                            />
                          </div>
                          <div>
                            <label htmlFor='lastName'>Last Name</label>
                            <CustomTextInput
                              name='lastName'
                              placeholder='Enter Last Name'
                            />
                          </div>
                          <div>
                            <label htmlFor='designation'>Designation</label>

                            <CustomTextInput
                              name='designation'
                              placeholder='Enter Designation'
                            />
                          </div>
                          <div>
                            <label htmlFor='adminEmail'>Email</label>

                            <CustomTextInput
                              name='email'
                              placeholder='Enter Email'
                            />
                          </div>
                          <div>
                            <label htmlFor='adminPhone'>Phone</label>

                            <CustomTextInput
                              name='phone'
                              placeholder='Enter Phone'
                            />
                          </div>
                          <div>
                            <label htmlFor='role'>Role</label>
                            <SearchSelect
                              placeholder='Select User Role'
                              value={selectedUserRoletOption}
                              options={userRoletOption}
                              isSearchable={true}
                              onChange={handleUserRoleChange}
                            />
                            <ErrorMessage
                              name={'role'}
                              component='span'
                              className='error-message'
                            />
                          </div>
                          <div>
                            <label htmlFor='empCode'>Employee Code</label>
                            <CustomTextInput
                              name='empCode'
                              placeholder='Enter Employee Code'
                            />
                          </div>
                        </div>

                        <div className='btn-section'>
                          <Button
                            type='submit'
                            onClick={handleClose}
                            className='cancel btn-outline-danger'
                          >
                            Cancel
                          </Button>

                          <Button
                            type='submit'
                            isLoading={isModifyLoading}
                            className='save'
                          >
                            Save
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
    </div>
  );
};

export default AddCompanyModal;
