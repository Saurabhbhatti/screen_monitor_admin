import { PropsWithChildren, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import App from '../../App';
import { Header, Sidebar } from '../../layouts';
import './DefaultLayout.css';
import { toggleSidebar } from '../../redux/themeConfigSlice';
import { IRootState } from '../../redux/rootReducer';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const dispatch = useDispatch();

  const [showLoader, setShowLoader] = useState(true);
  const [showTopButton, setShowTopButton] = useState(false);

  const goToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const onScrollHandler = () => {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScrollHandler);

    const screenLoader = document.getElementsByClassName('screen_loader');
    if (screenLoader?.length) {
      screenLoader[0].classList.add('animate__fadeOut');
      setTimeout(() => {
        setShowLoader(false);
      }, 200);
    }

    return () => {
      window.removeEventListener('onscroll', onScrollHandler);
    };
  }, []);

  return (
    <App>
      <div className='relative-container'>
        <div
          className={`${!themeConfig.sidebar && 'hidden'} sidebar-overlay`}
          onClick={() => dispatch(toggleSidebar())}></div>
        {showLoader && (
          <div className='screen_loader screen-loader-container animate__animated'>
            <svg
              width='64'
              height='64'
              viewBox='0 0 135 135'
              xmlns='http://www.w3.org/2000/svg'
              fill='#4361ee'>
              <path d='M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z'>
                <animateTransform
                  attributeName='transform'
                  type='rotate'
                  from='0 67 67'
                  to='-360 67 67'
                  dur='2.5s'
                  repeatCount='indefinite'
                />
              </path>
              <path d='M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z'>
                <animateTransform
                  attributeName='transform'
                  type='rotate'
                  from='0 67 67'
                  to='360 67 67'
                  dur='8s'
                  repeatCount='indefinite'
                />
              </path>
            </svg>
          </div>
        )}
        <div className='back-to-top-button'>
          {showTopButton && (
            <button
              type='button'
              className='back-to-top btn btn-outline-primary'
              onClick={goToTop}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='back-to-top-icon'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='1.5'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8 7l4-4m0 0l4 4m-4-4v18'
                />
              </svg>
            </button>
          )}
        </div>

        <div className={`main-container ${themeConfig.navbar}`}>
          <Sidebar />
          <div className='main-content'>
            <Header />
            <Suspense>
              <div
                className={`content-area animate__animated ${themeConfig.animation}`}>
                {children}
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </App>
  );
};

export default DefaultLayout;