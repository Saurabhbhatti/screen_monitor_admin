import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { attendanceValidationSchema } from '../../utils/validation';
import Button from '../../components/CustomButton/CustomButton';
import { AttendanceFormValues, SettingRootState } from '../../utils/type';
import { fetchaAddUpdateSettingRequest } from '../../redux/setting/action';
import './Setting.css';

const AttendanceSettings = () => {
  const dispatch = useDispatch();
  const attendance = useSelector(
    (state: SettingRootState) => state.settings.data.attendance
  );

  const isUpdate = !!(
    attendance?.totalWorkingHours ||
    attendance?.flexibleTotalHours ||
    attendance?.elegibleCompoff ||
    attendance?.halfLeave
  );

  const initialValues: AttendanceFormValues = {
    totalWorkingHours: attendance?.totalWorkingHours || '',
    flexibleTotalHours: attendance?.flexibleTotalHours || '',
    elegibleCompoff: attendance?.elegibleCompoff || '',
    halfLeave: attendance?.halfLeave || '',
  };

  const handleSubmit = (values: AttendanceFormValues) => {
    const {
      totalWorkingHours,
      flexibleTotalHours,
      elegibleCompoff,
      halfLeave,
    } = values;

    if (
      !totalWorkingHours &&
      !flexibleTotalHours &&
      !elegibleCompoff &&
      !halfLeave
    ) {
      toast.error('Please fill out at least one field before submitting!');
      return;
    }
    const payload = {
      attendance: {
        totalWorkingHours,
        flexibleTotalHours,
        elegibleCompoff,
        halfLeave,
      },
    };

    dispatch(fetchaAddUpdateSettingRequest(payload));
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={attendanceValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className='setting-main-container'>
            <div className='input-field-container'>
              <label>Total working Hours</label>
              <Field
                name='totalWorkingHours'
                type='text'
                className='input-field'
                placeholder='Enter total working hours'
              />
              <ErrorMessage
                name='totalWorkingHours'
                component='div'
                className='error-message'
              />
            </div>
            <div className='input-field-container'>
              <label>Flexible on total hours</label>
              <Field
                name='flexibleTotalHours'
                type='text'
                className='input-field'
                placeholder='Enter flexible hours'
              />
              <ErrorMessage
                name='flexibleTotalHours'
                component='div'
                className='error-message'
              />
            </div>
          </div>

          <div className='flex items-center space-x-4 mt-5'>
            <div className='input-field-container'>
              <label>Eligible for compoff</label>
              <Field
                name='elegibleCompoff'
                type='text'
                className='input-field'
                placeholder='Enter compoff hours'
              />
              <ErrorMessage
                name='elegibleCompoff'
                component='div'
                className='error-message'
              />
            </div>
            <div className='input-field-container'>
              <label>Half leave</label>
              <Field
                name='halfLeave'
                type='text'
                className='input-field'
                placeholder='Enter half leave hours'
              />
              <ErrorMessage
                name='halfLeave'
                component='div'
                className='error-message'
              />
            </div>
          </div>

          <Button type='submit' className='update-button-style'>
            {isUpdate ? 'Update' : 'Add'}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default AttendanceSettings;
