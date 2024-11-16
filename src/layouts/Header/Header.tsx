import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dropdown } from '../../components';
import './Header.css';
import { resetState } from '../../redux/auth/action';
import { IRootState } from '../../redux/rootReducer';
import { toggleSidebar } from '../../redux/themeConfigSlice';
import ImageComponent from '../../components/ImageComponent/ImageComponent';
import { IconLogout, IconMenu, IconUser } from '../../assets';
import { removeAllLocalStorage } from '../../utils';
import { RootState } from '../../utils/type';
import { profileState } from '../../utils/types/profile';
import { fetchProfileRequest } from '../../redux/profile/actions';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state?.auth);
  const { profileData } = useSelector((state: profileState) => state.profile);

  const logout = () => {
    removeAllLocalStorage();
    dispatch(resetState());
    navigate('/signin');
  };

  useEffect(() => {
    dispatch(fetchProfileRequest());
  }, [dispatch]);

  useEffect(() => {
    const selector = document.querySelector(
      'ul.horizontal-menu a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
      selector.classList.add('active');
      const all: any = document.querySelectorAll(
        'ul.horizontal-menu .nav-link.active'
      );
      for (let i = 0; i < all.length; i++) {
        all[0]?.classList.remove('active');
      }
      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
        if (ele) {
          ele = ele[0];
          setTimeout(() => {
            ele?.classList.add('active');
          });
        }
      }
    }
  }, [location]);

  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl'
      ? true
      : false;

  const themeConfig = useSelector((state: IRootState) => state.themeConfig);

  return (
    <header
      className={`z-40 ${
        themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''
      }`}
    >
      <div className='shadow-sm h-25'>
        <div className='header-container'>
          <div className='horizontal-logo'>
            <ImageComponent
              className='collapse-icon'
              onClick={() => {
                dispatch(toggleSidebar());
              }}
            >
              <IconMenu className='w-5 h-5' />
            </ImageComponent>
          </div>
          <div className='dropdown-menu'>
            <div className='header-subcontain'></div>
            <div className='dropdown shrink-0 flex'>
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                btnClassName='relative group block'
                button={
                  <img
                    className='w-9 h-9 rounded-full object-cover saturate-50'
                    src={
                      profileData?.data?.personalDetail?.profilePic?.fileUrl ||
                      '/assets/images/user-profile.jpeg'
                    }
                    alt='userProfile'
                  />
                }
              >
                <ul className='user-container'>
                  <li className='list-hider'>
                    <div className='user-popup'>
                      <img
                        className='user-image rounded-lg'
                        src={
                          profileData?.data?.personalDetail?.profilePic
                            ?.fileUrl || '/assets/images/user-profile.jpeg'
                        }
                        alt='userProfile'
                      />
                      <div className='user-name'>
                        <h4 className='text-base'>{user?.data?.firstName}</h4>
                      </div>
                    </div>
                  </li>
                  <li className='list-hider'>
                    <Link to='/profile' className='profile'>
                      <IconUser className='icon-user' />
                      Profile
                    </Link>
                  </li>
                  <li className='list-hider'>
                    <Link to='/change-password' className='change-password'>
                      <IconUser className='icon-user' />
                      Change password
                    </Link>
                  </li>
                  <li onClick={logout} className='signout list-hider'>
                    <Link to='/signin' className='logout'>
                      <span className='flex items-center'>
                        <IconLogout className='signout-icon' />
                        Sign Out
                      </span>
                    </Link>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
