import React from 'react';
import Button from '../../components/CustomButton/CustomButton';
import { useNavigate } from 'react-router-dom';
import './NoFound.css';

export const NotFound = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className='main-wrap'>
      <div className='sub-wrap'>
        <div className='relative'>
          <img
            src={'/assets/images/error/404-dark.svg'}
            alt='404'
            className='w-full max-w-xs md:max-w-full'
          />
          <p className='notFound'>The page you requested was not found!</p>
          <Button
            onClick={handleHomeClick}
            className=' btn btn-gradient dashboard-btn'
          >
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
