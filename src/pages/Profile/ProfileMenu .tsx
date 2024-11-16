import React from 'react';
import './Profile.css';

interface ProfileMenuProps {
  activeSection: string;
  onSectionClick: (section: string, ref: React.RefObject<HTMLElement>) => void;
  refs?: Record<string, React.RefObject<HTMLElement>>;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  activeSection,
  onSectionClick,
  refs = {},
}) => {
  const menuItems = [
    { section: 'profileDetails', label: 'About' },
    { section: 'emergencyContact', label: 'Emergency' },
    { section: 'bankDetails', label: 'Bank Details' },
    { section: 'ProfileDocument', label: 'Documents' },
  ];

  const handleMenuItemClick = (section: string) => {
    const sectionRef = refs?.[section];
    if (sectionRef) {
      onSectionClick(section, sectionRef);
    }
  };

  return (
    <div className='profile-menu'>
      <ul>
        {menuItems.map(({ section, label }) => (
          <li
            key={section}
            className={activeSection === section ? 'active' : ''}
            onClick={() => handleMenuItemClick(section)}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileMenu;
