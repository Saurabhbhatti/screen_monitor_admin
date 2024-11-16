import React, { useEffect, useState } from 'react';
import { IconPencilPaper } from '../../assets';
import Flatpickr from 'react-flatpickr';
import { getEndOfCurrentWeek } from '../../utils';
import { bloodGroups, GenderSelection } from '../../utils/mockData';
import SearchSelect from '../../components/CustomSelect/CustomSelect';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { profileDetails } from '../../utils/validation';
import {
  FormValues,
  ProfileDetailsComponentProps,
} from '../../utils/types/profile';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import dayjs from 'dayjs';

const ProfileDetailsComponent: React.FC<ProfileDetailsComponentProps> = ({
  onDataSubmit,
  profileData,
  loading,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    personalDetail = {},
    aadharCard = {},
    panCard = {},
  } = profileData?.data || {};

  const initialValues: FormValues = {
    dateRangeJoining: personalDetail?.dateOfJoining?.format('DD-MM-YYYY') || '',
    totalExperience: personalDetail?.totalExperience?.toString() || '',
    areaOfExpertise: personalDetail?.skills?.join(', ') || '',
    currentAddress: personalDetail?.currentAddress || '',
    dateRangeBirth: personalDetail?.dateOfBirth?.format('DD-MM-YYYY') || '',
    bloodGroup: personalDetail?.bloodGroup
      ? { value: personalDetail.bloodGroup, label: personalDetail.bloodGroup }
      : { value: '', label: '' },
    gender: personalDetail?.gender
      ? { value: personalDetail.gender, label: personalDetail.gender }
      : { value: '', label: '' },
    permanentAddress: personalDetail?.permanentAddress || '',
    aadharNumber: aadharCard?.number || '',
    panNumber: panCard?.number || '',
  };

  return (
    <>
      <div className='flex justify-between mb-4'>
        <h2 className='text-lg font-bold'>Profile Details</h2>
        <button
          type='button'
          onClick={() => setIsEditing(!isEditing)}
          className='icon-pencil btn btn-primary'
          aria-label={isEditing ? 'Cancel Editing' : 'Edit Profile'}
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
          validationSchema={profileDetails}
          onSubmit={(values: FormValues, { setSubmitting, resetForm }) => {
            const formattedData = {
              personalDetail: {
                gender: values.gender.value,
                bloodGroup: values.bloodGroup.value,
                dateOfBirth: dayjs(values.dateRangeBirth).format('YYYY-MM-DD'),
                dateOfJoining: dayjs(values.dateRangeJoining).format(
                  'YYYY-MM-DD'
                ),
                totalExperience: parseInt(values.totalExperience, 10),
                currentAddress: values.currentAddress,
                permanentAddress: values.permanentAddress,
                skills: values.areaOfExpertise
                  .split(',')
                  .map((skill) => skill.trim()),
              },
              aadharCard: {
                number: values.aadharNumber,
              },
              panCard: {
                number: values.panNumber,
              },
            };

            onDataSubmit(formattedData);
            setIsEditing(false);
            setSubmitting(false);
          }}
        >
          {({ setFieldValue, values, isSubmitting, resetForm }) => {
            useEffect(() => {
              if (!isEditing) {
                resetForm();
              }
            }, [isEditing, resetForm]);

            return (
              <Form className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {/* Date of Joining */}
                  <div>
                    <label className='form-label'>Date of Joining</label>
                    <Flatpickr
                      options={{
                        dateFormat: 'd-m-Y',
                        position: 'auto right',
                        allowInput: true,
                        maxDate: getEndOfCurrentWeek(),
                      }}
                      value={values.dateRangeJoining}
                      onChange={(dates) =>
                        setFieldValue(
                          'dateRangeJoining',
                          dates.length > 0 ? dates[0] : null
                        )
                      }
                      className='profile-date-picker'
                      placeholder='Select Date of Joining'
                      disabled={!isEditing}
                    />
                    <ErrorMessage
                      name='dateRangeJoining'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>

                  {/* Total Work Experience */}
                  <div>
                    <label className='form-label'>Total Work Experience</label>
                    <Field
                      type='text'
                      name='totalExperience'
                      className='global-form'
                      placeholder='Enter Total Work Experience'
                      disabled={!isEditing}
                    />
                    <ErrorMessage
                      name='totalExperience'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>

                  {/* Area of Expertise */}
                  <div>
                    <label className='form-label'>
                      Area Of Expertise (Skills)
                    </label>
                    <Field
                      as='textarea'
                      name='areaOfExpertise'
                      className='global-form'
                      rows={2}
                      placeholder='Enter Area Of Expertise (comma separated)'
                      disabled={!isEditing}
                    />
                    <ErrorMessage
                      name='areaOfExpertise'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>

                  {/* Personal Details Section */}
                  <div className='md:col-span-2'>
                    <h2 className='bank-details-title'>Personal Details</h2>
                    <div className='bank-details-grid'>
                      {/* Date Of Birth */}
                      <div>
                        <label className='form-label'>Date Of Birth</label>
                        <Flatpickr
                          options={{
                            dateFormat: 'd-m-Y',
                            position: 'auto right',
                            allowInput: true,
                            maxDate: getEndOfCurrentWeek(),
                          }}
                          value={values.dateRangeBirth}
                          onChange={(dates) =>
                            setFieldValue(
                              'dateRangeBirth',
                              dates.length > 0 ? dates[0] : null
                            )
                          }
                          className='profile-date-picker'
                          placeholder='Select Date of Birth'
                          disabled={!isEditing}
                        />
                        <ErrorMessage
                          name='dateRangeBirth'
                          component='div'
                          className='text-red-500 text-sm'
                        />
                      </div>

                      {/* Aadhar Number */}
                      <div>
                        <label className='form-label'>Aadhar Number</label>
                        <Field
                          type='text'
                          name='aadharNumber'
                          className='global-form'
                          placeholder='Enter Aadhar Number'
                          disabled={!isEditing}
                        />
                        <ErrorMessage
                          name='aadharNumber'
                          component='div'
                          className='text-red-500 text-sm'
                        />
                      </div>

                      {/* PAN Number */}
                      <div>
                        <label className='form-label'>PAN Number</label>
                        <Field
                          type='text'
                          name='panNumber'
                          className='global-form'
                          placeholder='Enter PAN Number'
                          disabled={!isEditing}
                        />
                        <ErrorMessage
                          name='panNumber'
                          component='div'
                          className='text-red-500 text-sm'
                        />
                      </div>

                      {/* Blood Group */}
                      <div>
                        <label className='form-label'>Blood Group</label>
                        <SearchSelect
                          placeholder='Select Blood Group'
                          options={bloodGroups}
                          value={values.bloodGroup}
                          onChange={(option) =>
                            setFieldValue('bloodGroup', option)
                          }
                          isDisabled={!isEditing}
                        />
                        <ErrorMessage
                          name='bloodGroup.value'
                          component='div'
                          className='text-red-500 text-sm'
                        />
                      </div>

                      {/* Gender */}
                      <div>
                        <label className='form-label'>Gender</label>
                        <SearchSelect
                          options={GenderSelection}
                          value={values.gender}
                          onChange={(option) => setFieldValue('gender', option)}
                          placeholder='Select Gender'
                          isDisabled={!isEditing}
                        />
                        <ErrorMessage
                          name='gender.value'
                          component='div'
                          className='text-red-500 text-sm'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Current Address */}
                  <div>
                    <label className='form-label'>Current Address</label>
                    <Field
                      as='textarea'
                      name='currentAddress'
                      className='global-form'
                      rows={3}
                      placeholder='Enter Current Address'
                      disabled={!isEditing}
                    />
                    <ErrorMessage
                      name='currentAddress'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>

                  {/* Permanent Address */}
                  <div>
                    <label className='form-label'>Permanent Address</label>
                    <Field
                      as='textarea'
                      name='permanentAddress'
                      className='global-form'
                      rows={3}
                      placeholder='Enter Permanent Address'
                      disabled={!isEditing}
                    />
                    <ErrorMessage
                      name='permanentAddress'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>
                </div>
                {isEditing && (
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

export default ProfileDetailsComponent;
