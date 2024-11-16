import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import './Profile.css';
import { setPageTitle } from '../../redux/themeConfigSlice';
import ProfileDetailsComponent from './ProfileDetails';
import ProfileBasicDetails from './ProfileBasicDetails';
import ProfileBankDetail from './ProfileBankDetail';
import ProfileEmergency from './ProfileEmergency';
import ProfileDocumentDetails from './ProfileDocument';
import {
  fetchProfileRequest,
  updateProfileDataRequest,
} from '../../redux/profile/actions';
import { profileState } from '../../utils/types/profile';
import ProfileMenu from './ProfileMenu ';

const Profile = () => {
  const dispatch = useDispatch();

  const { loading, profileData, error } = useSelector(
    (state: profileState) => state.profile
  );

  useEffect(() => {
    dispatch(setPageTitle('Profile'));
    dispatch(fetchProfileRequest());
  }, [dispatch]);

  const [panelContainerActiveSection, setPanelContainerActiveSection] =
    useState('profileDetails');

  const profile = useRef(null);
  const profileDetails = useRef(null);
  const bankDetails = useRef(null);
  const emergencyContact = useRef(null);
  const ProfileDocument = useRef(null);

  const scrollToSection = (ref: {
    current: {
      scrollIntoView: (arg0: { behavior: string; block: string }) => void;
    };
  }) => {
    if (ref.current) {
      requestAnimationFrame(() => {
        ref.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }
  };

  const handleSectionClick = (section: string, ref: any) => {
    setPanelContainerActiveSection(section);
    scrollToSection(ref);
  };

  const handleUpdate = (data: any) => {
    dispatch(updateProfileDataRequest(data));
  };

  return (
    <div className='main-profile-panel'>
      <div className='panelMain'>
        <div className='main-detail'>
          <div ref={profile}>
            <ProfileBasicDetails
              profileData={profileData}
              onProfileUpdate={handleUpdate}
            />
          </div>

          <ProfileMenu
            activeSection={panelContainerActiveSection}
            onSectionClick={handleSectionClick}
            refs={{
              profile,
              profileDetails,
              bankDetails,
              emergencyContact,
              ProfileDocument,
            }}
          />

          {panelContainerActiveSection === 'profileDetails' && (
            <div ref={profileDetails} className='profile-container'>
              <ProfileDetailsComponent
                profileData={profileData}
                onDataSubmit={handleUpdate}
                loading={loading}
              />
            </div>
          )}
          {panelContainerActiveSection === 'bankDetails' && (
            <div ref={bankDetails} className='bank-details-container'>
              <ProfileBankDetail
                profileData={profileData}
                onDataSubmit={handleUpdate}
                loading={loading}
              />
            </div>
          )}
          {panelContainerActiveSection === 'emergencyContact' && (
            <div ref={emergencyContact} className='emergency-contact-container'>
              <ProfileEmergency
                profileData={profileData}
                onDataSubmit={handleUpdate}
                loading={loading}
              />
            </div>
          )}
          {panelContainerActiveSection === 'ProfileDocument' && (
            <div ref={ProfileDocument} className='profile-detail-main'>
              <ProfileDocumentDetails
                profileData={profileData}
                onDataSubmit={handleUpdate}
                loading={loading}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
