import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../utils/type';
import { IconMail, IconPhone, IconPencilPaper } from '../../assets';
import { toast } from 'react-toastify';

const ProfileBasicDetails: React.FC<{
  profileData: any;
  onProfileUpdate: (file: File) => void;
}> = ({ profileData, onProfileUpdate }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const profileCardData = profileData?.data || {};

  const handleEmailClick = (email: string) => {
    if (email) {
      navigator.clipboard
        .writeText(email)
        .then(() => {
          toast.success('Copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy email: ', err);
        });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setSelectedImage(file);
      updateProfilePicture(file);
    }
  };

  const updateProfilePicture = (file: File) => {
    const formData = new FormData();
    formData.append('profilePic', file);
    onProfileUpdate(formData);
  };

  const profilePicSrc = selectedImage
    ? URL.createObjectURL(selectedImage)
    : profileCardData?.personalDetail?.profilePic?.fileUrl ||
      '/assets/images/profile-34.jpeg';

  return (
    <div className='w-full'>
      <div className='panel-header-profile'>
        <div className='profile-header'>
          <div className='profile-image-div relative group'>
            <img
              src={profilePicSrc}
              alt='Profile'
              className='profile-image-main-div'
            />
            <label htmlFor='profile-pic-upload' className='edit-icon-label'>
              <IconPencilPaper className='w-5 h-5 text-white' />
            </label>
            <input
              type='file'
              id='profile-pic-upload'
              className='hidden'
              accept='image/*'
              onChange={handleImageUpload}
            />
          </div>
          <div className='profile-user-details'>
            <div className='profile-info'>
              <div className='profile-name-designation'>
                <span className='profile-name'>
                  {profileCardData?.userId?.firstName}{' '}
                  {profileCardData?.userId?.lastName}
                </span>

                <div className='flex items-center gap-12 pl-5 p-5'>
                  <div className='flex items-center'>
                    <IconMail className='w-5 h-5 shrink-0' />
                    <span
                      onClick={() =>
                        handleEmailClick(profileCardData?.userId?.email)
                      }
                      className='text-primary pl-2 truncate cursor-pointer'
                    >
                      {profileCardData?.userId?.email}
                    </span>
                  </div>
                  <div className='profile-info-item'>
                    <IconPhone />
                    <span>{profileCardData?.userId?.phone}</span>
                  </div>
                </div>

                <hr className='border-gray-400' />

                <div className='flex items-center gap-20 pl-5 pt-5'>
                  <span className='profile-info-item'>
                    <strong>Designation:</strong>{' '}
                    {profileCardData?.userId?.designation}
                  </span>
                  <span className='profile-info-item'>
                    <strong>Role:</strong> {profileCardData?.userId?.role}
                  </span>
                  <span className='profile-info-item'>
                    <strong>Employee No:</strong>{' '}
                    {profileCardData?.userId?.empCode}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBasicDetails;
