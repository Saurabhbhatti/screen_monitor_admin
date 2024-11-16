import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, useFormik, FormikProvider } from 'formik';
import { IconMail } from '../../assets';
import CustomTextInput from '../../components/CustomInput/CustomInput';
import Button from '../../components/AuthButton/AuthButton';
import './ForgotPassword.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../utils/type';
import { forgotPasswordValidation } from '../../utils/validation';
import { forgotPasswordRequest } from '../../redux/auth/action';
import logo from '../../assets/LogoSign.png';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading, isForgotPasswordSuccess } = useSelector(
    (state: RootState) => state?.auth
  );

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (isForgotPasswordSuccess) {
      navigate('/signin');
    }
  }, [isForgotPasswordSuccess]);

  const initialValues = {
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordValidation,
    onSubmit: (values) => {
      dispatch(forgotPasswordRequest(values));
    },
  });

  const { getFieldProps, values } = formik;

  return (
    <div>
      <div className='card'>
        <div className='sub-card'>
          <div className='img-card'>
            <div className='forgot-container'></div>
            <div className='img-main-container'>
              <div className='main-img-div'>
                <img
                  src='/assets/images/auth/reset-password.svg'
                  alt='Cover Image'
                  className='w-full'
                />
              </div>
            </div>
          </div>
          <div className='forgot-content'>
            <div className='sub-content'>
              <Link to='/' className='w-8 block lg:hidden'>
                <img
                  src='/assets/images/logo.svg'
                  alt='Logo'
                  className='mx-auto w-10'
                />
              </Link>
            </div>
            <div>
              <img src={logo} />
            </div>
            <div className='w-full max-w-[440px] lg:mt-2'>
              <div className='mb-7'>
                <h1 className='title-password'>Password Reset</h1>
                <p>Enter your email to recover your password</p>
              </div>
              <label>Email</label>
              <FormikProvider value={formik}>
                <Form className='space-y-5'>
                  <CustomTextInput
                    {...getFieldProps('email')}
                    name='email'
                    placeholder='Enter Email'
                    icon={<IconMail fill={true} />}
                  />
                  <Button
                    isLoading={loading}
                    type='submit'
                    className='btn btn-gradient submit-btn'
                  >
                    Submit
                  </Button>
                </Form>
              </FormikProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
