import React, { useState, useEffect } from 'react';
import { IconPencilPaper } from '../../assets';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { bankDetails } from '../../utils/validation';
import { BankDetail, ProfileBankDetailProps } from '../../utils/types/profile';
import CustomLoader from '../../components/CustomLoader/CustomLoader';

const ProfileBankDetail: React.FC<ProfileBankDetailProps> = ({
  onDataSubmit,
  profileData,
  loading,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const bankDetail = profileData?.data?.bankDetail;

  const initialValues = {
    bankName: bankDetail?.bankName || '',
    branchName: bankDetail?.branchName || '',
    ifscCode: bankDetail?.ifscCode || '',
    accountNumber: bankDetail?.accountNumber || '',
    accountHolderName: bankDetail?.accountHolderName || '',
  };

  const handleSubmit = (
    values: typeof initialValues,
    { setSubmitting }: FormikHelpers<typeof initialValues>
  ) => {
    const updatedData: BankDetail = {
      bankDetail: {
        accountNumber: values.accountNumber,
        accountHolderName: values.accountHolderName,
        bankName: values.bankName,
        branchName: values.branchName,
        ifscCode: values.ifscCode,
      },
    };

    onDataSubmit(updatedData);
    setIsEditable(false);
    setSubmitting(false);
  };

  return (
    <>
      <div className='flex justify-between items-center'>
        <h2 className='bank-details-title'>Bank Details</h2>
        <button
          type='button'
          onClick={() => setIsEditable((prev) => !prev)}
          className='icon-pencil btn btn-primary'
          aria-label={isEditable ? 'Save Changes' : 'Edit Bank Details'}
        >
          <IconPencilPaper className='w-4 h-4' />
        </button>
      </div>

      {loading ? (
        <div className='flex justify-center items-center w-full h-32 item-center'>
          <CustomLoader />
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={bankDetails}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, resetForm }) => {
            useEffect(() => {
              if (!isEditable) {
                resetForm();
              }
            }, [isEditable, resetForm]);

            return (
              <Form className='bank-details-form'>
                <div className='bank-details-grid'>
                  {[
                    'bankName',
                    'branchName',
                    'ifscCode',
                    'accountNumber',
                    'accountHolderName',
                  ].map((field) => (
                    <div key={field}>
                      <label className='form-label'>
                        {field
                          .replace(/([A-Z])/g, ' $1')
                          .replace(/^./, (str) => str.toUpperCase())}
                      </label>
                      <Field
                        type='text'
                        name={field}
                        className='global-form'
                        disabled={!isEditable}
                        placeholder={`Enter ${field.replace(
                          /([A-Z])/g,
                          ' $1'
                        )}`}
                      />
                      <ErrorMessage
                        name={field}
                        component='div'
                        className='error'
                      />
                    </div>
                  ))}
                </div>
                {isEditable && (
                  <div className='save-btn'>
                    <button
                      type='submit'
                      disabled={isSubmitting || !isEditable}
                      className='btn btn-primary'
                    >
                      {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default ProfileBankDetail;
