import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconMail } from '../../assets';
import IconLock from '../../assets/Icon/IconLock';
import { Form, useFormik, FormikProvider } from 'formik';
import CustomTextInput from '../../components/CustomInput/CustomInput';
import Button from '../../components/AuthButton/AuthButton';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { LoginValidation } from '../../utils/validation';
import { loginRequest } from '../../redux/auth/action';
import { getUserRole, UserRole } from '../../utils';
import { RootState } from '../../utils/type';
import logo from '../../assets/LogoSign.png';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isSuccess } = useSelector((state: RootState) => state?.auth);
  let userRole = getUserRole();

  useEffect(() => {
    if (isSuccess && userRole === UserRole.SUPER_ADMIN) {
      navigate('/company');
    } else if (isSuccess) {
      navigate('/dashboard');
    }
  }, [isSuccess, userRole]);

  const initialValues = {
    username: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginValidation,
    onSubmit: (values) => {
      dispatch(loginRequest(values));
    },
  });

  const { getFieldProps, values } = formik;

  const handleForgotPassword = () => {
    navigate('/forgotpassword');
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div>
      <div className='img-login-container'>
        <img
          src='/assets/images/auth/bg-gradient.png'
          alt='image'
          className='h-full w-full object-cover'
        />
      </div>
      <div className='main-login-container'>
        <div className='sub-container'>
          <div className='login-img-container'>
            <div className='sub-login-img-container'></div>
            <div className='img-main-div'>
              <div className='img-div'>
                <img
                  src='/assets/images/auth/login.svg'
                  alt='Cover Image'
                  className='w-full'
                />
              </div>
            </div>
          </div>
          <div className='input-container'>
            <div className='sub-input-container'>
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
            <div className='input mb-18'>
              <div className='mb-10'>
                <h1 className='signin'>Sign in</h1>
                <p className='text-title'>
                  Enter your email and password to login
                </p>
              </div>
              <FormikProvider value={formik}>
                <Form className='form'>
                  <label htmlFor='Email'>Username</label>
                  <CustomTextInput
                    type='text'
                    placeholder='Enter Username'
                    {...getFieldProps('username')}
                    name='username'
                    icon={<IconMail fill={true} />}
                  />
                  <label htmlFor='Email'>Password</label>
                  <CustomTextInput
                    type='password'
                    placeholder='Enter Password'
                    {...getFieldProps('password')}
                    name='password'
                    icon={<IconLock fill={true} />}
                  />
                  <div
                    onClick={handleForgotPassword}
                    className='forgot-password-button ml-80'
                  >
                    Forgot Password?
                  </div>

                  <Button
                    type='submit'
                    className={'button btn btn-gradient'}
                    isLoading={loading}
                  >
                    Sign in
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

export default Login;
