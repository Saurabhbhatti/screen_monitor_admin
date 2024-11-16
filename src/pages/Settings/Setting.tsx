import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconMenu } from '../../assets';
import { settingsOption } from '../../utils/mockData';
import { getUserRole, SettingModule, UserRole } from '../../utils';
import { SettingRootState, settingsOptionType } from '../../utils/type';
import LeaveSettings from './LeaveSetting';
import ProductivitySettings from './ProductivitySetting';
import AttendanceSettings from './AttendenceSetting';
import JiraSetup from './JiraSetup';
import { getSettingRequest } from '../../redux/setting/action';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import './Setting.css';

const Settings = () => {
  const dispatch = useDispatch();
  const userRole = getUserRole();
  const { loading } = useSelector((state: SettingRootState) => state?.settings);

  const [isShowCryptoMenu, setIsShowCryptoMenu] = useState(false);
  const [selectedModule, setSelectedModule] =
    useState<settingsOptionType | null>(null);

  const filteredSettingsOption =
    userRole === UserRole.EMPLOYEE
      ? settingsOption.filter((option) => option.id === 5)
      : settingsOption;

  useEffect(() => {
    if (settingsOption.length > 0) {
      setSelectedModule(settingsOption[0]);
      setIsShowCryptoMenu(true);
    }
  }, []);

  const handleModuleSelect = (module: settingsOptionType) => {
    setSelectedModule(module);
    setIsShowCryptoMenu(false);
  };

  useEffect(() => {
    dispatch(getSettingRequest());
  }, []);

  useEffect(() => {
    if (filteredSettingsOption.length > 0) {
      setSelectedModule(filteredSettingsOption[0]);
      setIsShowCryptoMenu(true);
    }
  }, [filteredSettingsOption]);

  return (
    <>
      <div className='setting-header'>
        <h2 className='setting-title'>Settings</h2>
      </div>
      <div className='settings-container'>
        {loading && (
          <div className='setting-custom-loading'>
            <CustomLoader />
          </div>
        )}

        {/* Menu Bar */}
        <div
          className={`menu-bar panel ${
            isShowCryptoMenu ? 'block xl:block' : 'hidden xl:block'
          }`}
        >
          {filteredSettingsOption.map((item) => (
            <div key={item.id}>
              <button
                type='button'
                className={`menu-button ${
                  selectedModule && selectedModule.id === item.id
                    ? 'active'
                    : 'inactive'
                }`}
                onClick={() => handleModuleSelect(item)}
              >
                <div className='flex font-semibold text-md'>{item.title}</div>
              </button>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className='content-area'>
          <div className='content-header'>
            <button
              onClick={() => setIsShowCryptoMenu(!isShowCryptoMenu)}
              type='button'
              className='icon-menu'
            >
              <IconMenu />
            </button>
            <h2 className='module-title'>{selectedModule?.title}</h2>
          </div>

          <div className='p-4'>
            {selectedModule ? (
              selectedModule.title === SettingModule.LEAVE ? (
                <LeaveSettings />
              ) : selectedModule.title === SettingModule.PRODUCTIVITY ? (
                <ProductivitySettings />
              ) : selectedModule.title === SettingModule.ATTENDANCE ? (
                <AttendanceSettings />
              ) : selectedModule.title === SettingModule.JIRASETUP ? (
                <JiraSetup />
              ) : (
                <div>
                  <h2 className='setting-title'>{selectedModule.title}</h2>
                  <p className='module-description'>
                    {selectedModule.description}
                  </p>
                </div>
              )
            ) : (
              <div>
                <p>Please select a module to view details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
