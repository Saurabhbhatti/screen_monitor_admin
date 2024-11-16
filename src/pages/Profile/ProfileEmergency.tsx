import React, { useState, useEffect } from 'react';
import { IconPencilPaper } from '../../assets';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { emergencyContactDetails } from '../../utils/validation';
import {
  EmergencyContact,
  ProfileEmergencyProps,
} from '../../utils/types/profile';
import CustomLoader from '../../components/CustomLoader/CustomLoader';

const ProfileEmergency: React.FC<ProfileEmergencyProps> = ({
  profileData,
  onDataSubmit,
  loading,
}) => {
  const [isEditable, setIsEditable] = useState(false);

  const { emergencyContact } = profileData?.data || {};

  return (
    <>
      <div className='flex justify-between items-center'>
        <h2 className='emergency-contact-title'>Emergency Contact Details</h2>
        <button
          type='button'
          onClick={() => setIsEditable(!isEditable)}
          className='icon-pencil btn btn-primary'
          aria-label={
            isEditable ? 'Save Changes' : 'Edit Emergency Contact Details'
          }
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
          initialValues={{
            name: emergencyContact?.name || '',
            relation: emergencyContact?.relation || '',
            number: emergencyContact?.contactNumber || '',
          }}
          validationSchema={emergencyContactDetails}
          enableReinitialize
          onSubmit={(
            values: EmergencyContact,
            { setSubmitting, resetForm }: FormikHelpers<EmergencyContact>
          ) => {
            onDataSubmit(values);
            setIsEditable(false);
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ isSubmitting, resetForm }) => {
            useEffect(() => {
              if (!isEditable) {
                resetForm();
              }
            }, [isEditable, resetForm]);

            return (
              <Form className='emergency-contact-form'>
                <div className='flex flex-wrap justify-between'>
                  <div>
                    <label className='form-label'>Name</label>
                    <Field
                      type='text'
                      name='name'
                      className='global-form'
                      disabled={!isEditable}
                      placeholder='Enter Name'
                    />
                    <ErrorMessage
                      name='name'
                      component='div'
                      className='error'
                    />
                  </div>
                  <div>
                    <label className='form-label'>Relation</label>
                    <Field
                      type='text'
                      name='relation'
                      className='global-form'
                      disabled={!isEditable}
                      placeholder='Enter Relation'
                    />
                    <ErrorMessage
                      name='relation'
                      component='div'
                      className='error'
                    />
                  </div>
                  <div>
                    <label className='form-label'>Number</label>
                    <Field
                      type='text'
                      name='number'
                      className='global-form'
                      disabled={!isEditable}
                      placeholder='Enter Phone Number'
                    />
                    <ErrorMessage
                      name='number'
                      component='div'
                      className='error'
                    />
                  </div>
                </div>
                {isEditable && (
                  <div className='save-btn'>
                    <button
                      type='submit'
                      disabled={isSubmitting}
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

export default ProfileEmergency;
