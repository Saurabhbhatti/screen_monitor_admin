import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../redux/themeConfigSlice';
import { IRootState } from '../../redux/rootReducer';
import './Error404.css';

const Error404 = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Error 404'));
  }, [dispatch]);

  const isDark = useSelector(
    (state: IRootState) =>
      state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode
  );

  return (
    <div className='error-container'>
      <div className='error-content'>
        <div className='relative'>
          <img
            src={
              isDark
                ? '/assets/images/error/404-dark.svg'
                : '/assets/images/error/404-light.svg'
            }
            alt='404'
            className='error-image'
          />
          <p className='error-message'>The page you requested was not found!</p>
          <Link to='/' className='error-link'>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
