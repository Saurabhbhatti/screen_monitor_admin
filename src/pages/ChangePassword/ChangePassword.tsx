import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton/CustomButton';
import { FormikProvider, useFormik, Form } from 'formik';
import CustomTextInput from '../../components/CustomInput/CustomInput';
import { ChangePasswordValidationScheme } from '../../utils/validation';
import { changePasswordRequest, resetState } from '../../redux/auth/action';
import { RootState } from '../../utils/type';
import { useEffect } from 'react';
import IconLockDots from '../../assets/Icon/IconLockDots';
import { removeAllLocalStorage } from '../../utils';
import './ChangePassword.css';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { user, loading, isChangePassword } = useSelector(
    (state: RootState) => state?.auth
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isChangePassword) {
      removeAllLocalStorage();
      dispatch(resetState());
      navigate('/signin');
    }
  }, [isChangePassword]);

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ChangePasswordValidationScheme,
    onSubmit: (values) => {
      dispatch(
        changePasswordRequest({
          email: user?.data?.email,
          currentPassword: values.oldPassword,
          newPassword: values.newPassword,
        })
      );
    },
  });

  const { getFieldProps, values } = formik;
  return (
    <div className='change-password-container '>
      <div className='change-password-wrapper'>
        <div className='mb-10'>
          <h1 className='change-password-title'>Change Password</h1>
          <p className='change-password-subtitle'>
            Fill Below Details To Change Password
          </p>
        </div>
        <FormikProvider value={formik}>
          <Form className='change-password-form'>
            <div>
              <label htmlFor='currentPassword'>Old Passowrd : </label>
              <div className='relative text-white-dark'>
                <CustomTextInput
                  type='password'
                  labelVisibility='hidden'
                  placeholder={'Old Password'}
                  // {...getFieldProps('oldPassword')}
                  name='oldPassword'
                  label='oldPassword'
                  icon={<IconLockDots fill={true} />}
                />
              </div>
            </div>
            <div>
              <label htmlFor='newPassowrd'>New Password</label>
              <div className='relative text-white-dark'>
                <CustomTextInput
                  type='password'
                  labelVisibility='hidden'
                  placeholder={'New Password'}
                  {...getFieldProps('newPassword')}
                  name='newPassword'
                  label='newPassword'
                  icon={<IconLockDots fill={true} />}
                />
              </div>
            </div>
            <div>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <div className='relative text-white-dark'>
                <CustomTextInput
                  type='password'
                  labelVisibility='hidden'
                  placeholder={'Confirm Password'}
                  {...getFieldProps('Confirm Password')}
                  name='confirmPassword'
                  label='confirmPassword'
                  icon={<IconLockDots fill={true} />}
                />
              </div>
            </div>

            <CustomButton
              type='submit'
              className='btn btn-gradient submit-button '
              isLoading={loading}
            >
              Submit
            </CustomButton>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default ChangePassword;
