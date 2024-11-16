import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import { IRootState } from '../../redux/rootReducer';
import { toggleSidebar } from '../../redux/themeConfigSlice';
import ImageComponent from '../../components/ImageComponent/ImageComponent';
import {
  IconCaretsDown,
  IconMenuCalendar,
  IconMenuCharts,
  IconMenuDashboard,
  IconMenuDatatables,
  IconMenuUsers,
  IconUser,
} from '../../assets';
import { getUserRole, hasPermission, UserRole } from '../../utils';
import { RootState } from '../../utils/type';
import IconMenuForms from '../../assets/Icon/IconMenuForms';
import logo from '../../assets/Logo.png';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconClock from '../../assets/Icon/IconClock';
import './Sidebar.css';

const Sidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const themeConfig = useSelector((state: IRootState) => state.themeConfig);

  const semidark = useSelector(
    (state: IRootState) => state.themeConfig.semidark
  );

  const userRole = getUserRole();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state?.auth);

  const { t } = useTranslation();

  useEffect(() => {
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
      selector.classList.add('active');
      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any =
          ul.closest('li.menu').querySelectorAll('.nav-link') || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [location]);

  const toggleSubMenu = (menu: string) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  const handleMenuClick = (menu: string) => {
    setOpenSubMenu(null);
  };

  return (
    <div className={semidark ? 'dark' : ''}>
      <nav className={`sidebar ${semidark ? 'dark' : ''}`}>
        <div className='bg-white dark:bg-black h-full'>
          <div className='flex justify-between items-center'>
            <NavLink to='/'>
              <img alt='logo' src={logo} className='ml-6 mt-2' />
            </NavLink>
            <ImageComponent
              className='collapse-icon'
              onClick={() => dispatch(toggleSidebar())}
            >
              <IconCaretsDown className='m-auto rotate-90' />
            </ImageComponent>
          </div>
          {userRole === UserRole.SUPER_ADMIN ? (
            <div className='ml-5 font-bold text-sm mb-3 mt-3'>{userRole}</div>
          ) : (
            <div className='ml-5 font-bold text-sm mb-3 mt-3'>
              {user?.data?.companyName} ({userRole})
            </div>
          )}
          <PerfectScrollbar className='scrollbar'>
            <ul className='sidebar-menu'>
              {userRole === UserRole.SUPER_ADMIN ? (
                <li className='menu nav-item'>
                  <NavLink to='/company' className='nav-link group'>
                    <div className='flex items-center'>
                      <IconUser className='menu-icon' />
                      <span className='title text-sm'>{t('Company')}</span>
                    </div>
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className='menu nav-item'>
                    <NavLink
                      to='/dashboard'
                      // className={`nav-link group ${currentMenu === 'dashboard' ? 'active' : ''}`}
                      onClick={() => handleMenuClick('dashboard')}
                    >
                      <div className='flex items-center'>
                        <IconMenuDashboard className='menu-icon' />
                        <span className='title text-sm'>{t('Dashboard')}</span>
                      </div>
                    </NavLink>
                  </li>
                  {userRole !== UserRole.EMPLOYEE && (
                    <li className='menu nav-item'>
                      <NavLink
                        to='/team-member'
                        className='nav-link group'
                        onClick={() => handleMenuClick('team-member')}
                      >
                        <div className='flex items-center'>
                          <IconMenuUsers className='menu-icon' />
                          <span className='title text-sm'>
                            {t('Team Members')}
                          </span>
                        </div>
                      </NavLink>
                    </li>
                  )}
                  <li className='menu nav-item'>
                    <button
                      type='button'
                      className={`nav-link group w-full ${
                        openSubMenu === 'timeActivity' ? 'active' : ''
                      }`}
                      onClick={() => toggleSubMenu('timeActivity')}
                    >
                      <div className='flex items-center'>
                        <IconClock className='menu-icon' />
                        <span className='title text-sm'>{t('Real Time')}</span>
                      </div>
                      <div>
                        <IconCaretDown
                          className={`transition-transform duration-200 ${
                            openSubMenu === 'timeActivity'
                              ? 'rotate-180'
                              : 'rotate-0'
                          }`}
                        />
                      </div>
                    </button>
                    {openSubMenu === 'timeActivity' && (
                      <ul className='sub-menu'>
                        <li>
                          <NavLink
                            to='/time-activity'
                            className={`sub-nav-link ${
                              location.pathname === '/time-activity'
                                ? 'active'
                                : ''
                            }`}
                          >
                            {t('Time Activity')}
                          </NavLink>
                          <NavLink
                            to='/timeregulate'
                            className={`sub-nav-link ${
                              location.pathname === '/timeregulate'
                                ? 'active'
                                : ''
                            }`}
                          >
                            {t('Time Regulation')}
                          </NavLink>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className='menu nav-item'>
                    <NavLink
                      to='/projects'
                      className='nav-link group'
                      onClick={() => handleMenuClick('projects')}
                    >
                      <div className='flex items-center'>
                        <IconMenuDatatables className='menu-icon' />
                        <span className='title text-sm'>{t('Projects')}</span>
                      </div>
                    </NavLink>
                  </li>
                  <li className='menu nav-item'>
                    <NavLink
                      to='/screenshot'
                      className='nav-link group'
                      onClick={() => handleMenuClick('screenshot')}
                    >
                      <div className='flex items-center'>
                        <IconMenuCharts className='menu-icon' />
                        <span className='title text-sm'>
                          {t('Screenshots')}
                        </span>
                      </div>
                    </NavLink>
                  </li>
                  <li className='menu nav-item'>
                    <NavLink
                      to='/dsr'
                      className='nav-link group'
                      onClick={() => handleMenuClick('dsr')}
                    >
                      <div className='flex items-center'>
                        <IconMenuForms className='menu-icon' />
                        <span className='title text-sm'>{t('DSR')}</span>
                      </div>
                    </NavLink>
                  </li>
                  <li className='menu nav-item'>
                    <button
                      type='button'
                      className={`nav-link group w-full ${
                        openSubMenu === 'timeOff' ? 'active' : ''
                      }`}
                      onClick={() => toggleSubMenu('timeOff')}
                    >
                      <div className='flex items-center'>
                        <IconMenuCalendar className='menu-icon' />
                        <span className='title text-sm'>{t('Leaves')}</span>
                      </div>
                      <div>
                        <IconCaretDown
                          className={`transition-transform duration-200 ${
                            openSubMenu === 'timeOff'
                              ? 'rotate-180'
                              : 'rotate-0'
                          }`}
                        />
                      </div>
                    </button>

                    {openSubMenu === 'timeOff' && (
                      <ul className='sub-menu'>
                        <li>
                          <NavLink
                            to='/leave'
                            className={`sub-nav-link ${
                              location.pathname === '/leave' ? 'active' : ''
                            }`}
                          >
                            {t('Leave')}
                          </NavLink>

                          {userRole !== UserRole.EMPLOYEE && (
                            <NavLink
                              to='/compoff'
                              className={`sub-nav-link ${
                                location.pathname === '/compoff' ? 'active' : ''
                              }`}
                            >
                              {t('Comp Off')}
                            </NavLink>
                          )}

                          <NavLink
                            to='/leavehistory'
                            className={`sub-nav-link ${
                              location.pathname === '/leavehistory'
                                ? 'active'
                                : ''
                            }`}
                          >
                            {t('Leave History')}
                          </NavLink>
                        </li>
                      </ul>
                    )}
                  </li>
                  {hasPermission(userRole, 'timeActivity', 'read') && (
                    <li className='menu nav-item'>
                      <NavLink
                        to='/attendance'
                        className='nav-link group'
                        onClick={() => handleMenuClick('attendance')}
                      >
                        <div className='flex items-center'>
                          <IconMenuForms className='menu-icon' />
                          <span className='title text-sm'>
                            {t('Attendance')}
                          </span>
                        </div>
                      </NavLink>
                    </li>
                  )}
                  <li className='menu nav-item'>
                    <NavLink
                      to='/holiday'
                      className='nav-link group'
                      onClick={() => handleMenuClick('holiday')}
                    >
                      <div className='flex items-center'>
                        <IconMenuForms className='menu-icon' />
                        <span className='title text-sm'>{t('Holiday')}</span>
                      </div>
                    </NavLink>
                  </li>
                  <li className='menu nav-item'>
                    <NavLink
                      to='/settings'
                      className='nav-link group'
                      onClick={() => handleMenuClick('settings')}
                    >
                      <div className='flex items-center'>
                        <IconMenuForms className='menu-icon' />
                        <span className='title text-sm'>{t('Settings')}</span>
                      </div>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
