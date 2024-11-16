import React from 'react';
import { Tooltip } from '@material-tailwind/react';
import { TeamMemberGridCardProps } from '../../utils/type';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import Button from '../../components/CustomButton/CustomButton';
import './TeamMemberGridCard.css';
import { IconMail, IconPhone } from '../../assets';
import IconUser from '../../components/Icon/IconUser';
import { toast } from 'react-toastify';
import { itemsPerPage } from '../../utils';
import CustomLoader from '../../components/CustomLoader/CustomLoader';

const TeamMemberGridCard: React.FC<TeamMemberGridCardProps> = ({
  userData,
  activePage,
  totalPageCount,
  setAddProjectModal,
  handleEditUser,
  showAlert,
  prev,
  next,
  onPageClick,
  setActivePage,
  handleAddProject,
  isTableLoading,
}) => {
  const handleEmailClick = (email: string) => {
    if (email) {
      navigator.clipboard
        .writeText(email)
        .then(() => {
          toast.success('copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy email: ', err);
        });
    }
  };

  return (
    <div>
      {isTableLoading ? (
        <div className='custom-loader-div'>
          <CustomLoader />
        </div>
      ) : (
        <div>
          <div className='main-wrapper'>
            {userData?.users?.map((user: any) => (
              <div className='sub-wrapper' key={user._id}>
                <div className='image-wrapper'>
                  <div
                    className='bg-white/40 rounded-t-md bg-center bg-cover p-6 pb-0 bg-'
                    style={{
                      backgroundImage: `url('/assets/images/notification-bg.png')`,
                      backgroundRepeat: 'no-repeat',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <img
                      className='object-contain w-4/5 max-h-40 mx-auto'
                      src={user?.profilePic || '/assets/images/profile-35.png'}
                      alt='contact_image'
                    />
                  </div>
                  <div className='content-wrapper'>
                    <div className='content-sub-wrapper'>
                      <div className='text-xl'>
                        <span className='pt-10'>
                          {user?.firstName} {user?.lastName}
                        </span>
                        <span className='text-base'> ({user.role})</span>
                      </div>
                      <div className='text-sm'>{user?.designation}</div>

                      <div>
                        <div>
                          <div className='buttons-group'>
                            <Button
                              onClick={() => handleAddProject(user)}
                              className='add-project-button'
                            >
                              <span className='plus-icon-style'>+</span>
                            </Button>

                            <div className='main-tooltip-wrap'>
                              {user?.projects
                                ?.slice(0, 2)
                                .map((project: any, index: number) => (
                                  <Tooltip
                                    key={index}
                                    placement='bottom'
                                    content={`${project.projectName}`}
                                  >
                                    <div className='name-tooltip-styling'>
                                      {project?.projectName
                                        .split(' ')
                                        .map((word: string) => word.charAt(0))
                                        .join('')}
                                    </div>
                                  </Tooltip>
                                ))}

                              {user.projects?.length > 2 && (
                                <Tooltip
                                  placement='bottom'
                                  content={
                                    <div className='flex flex-col'>
                                      {user?.projects
                                        .slice(2, user.projects.length)
                                        .map((project: any, index: number) => (
                                          <span
                                            key={index}
                                            className='text-white'
                                          >
                                            {project.projectName}
                                          </span>
                                        ))}
                                    </div>
                                  }
                                >
                                  <div className='length-tooltip-styling'>
                                    <h6>+{user?.projects?.length - 2}</h6>
                                  </div>
                                </Tooltip>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='details-wrap'>
                      <div className='flex items-center'>
                        <div className='flex items-center'>
                          <div className='flex-none ltr:mr-2 rtl:ml-2'>
                            <IconUser className='w-5 h-5' />
                          </div>
                          <div className='text-white-dark'>
                            {user?.empCode || 'N/A'}
                          </div>
                        </div>
                      </div>

                      <div className='flex items-center'>
                        <Tooltip placement='bottom' content={user?.email}>
                          <div
                            className='truncate flex items-center cursor-pointer'
                            onClick={() => handleEmailClick(user?.email)}
                          >
                            <div className='flex-none ltr:mr-2 rtl:ml-2'>
                              <IconMail />
                            </div>
                            <div className='truncate text-white-dark'>
                              {user?.email}
                            </div>
                          </div>
                        </Tooltip>
                      </div>
                      <div className='sub-info-wrap'>
                        <a
                          href={`tel:${user?.phone}`}
                          className='flex items-center'
                        >
                          <div className='phone-title-wrap'>
                            <IconPhone />
                          </div>
                          <div className='value-wrap'>{user?.phone}</div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className='buttongroup-wrap'>
                    <Button
                      type='button'
                      className='user-edit-button'
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      type='button'
                      className='user-delete-button btn-outline-danger'
                      onClick={() => showAlert(10, user)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!isTableLoading && (userData?.total ?? 0) > itemsPerPage && (
        <div className='pagination-wrap'>
          <ul className='sub-paginate-wrap'>
            <li>
              <Button
                type='button'
                className={`flex justify-center font-semibold p-2 rounded-full transition ${
                  activePage === 1
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-white-light text-dark hover:text-white hover:bg-primary'
                } dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary`}
                onClick={prev}
                disabled={activePage === 1}
              >
                <IconCaretDown className='w-5 h-5 rotate-90 rtl:-rotate-90' />
              </Button>
            </li>
            {[...Array(totalPageCount)].map((_, index) => (
              <li key={index}>
                <Button
                  type='button'
                  className={`flex justify-center font-semibold px-3.5 py-2 rounded-full transition ${
                    activePage === index + 1
                      ? 'bg-primary text-white'
                      : 'bg-white-light text-dark hover:text-white hover:bg-primary'
                  } dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary`}
                  onClick={() => {
                    if (totalPageCount > 1) {
                      setActivePage(index + 1);
                      onPageClick(index + 1);
                    }
                  }}
                >
                  {index + 1}
                </Button>
              </li>
            ))}
            <li>
              <Button
                type='button'
                className={`flex justify-center font-semibold p-2 rounded-full transition ${
                  activePage === totalPageCount
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-white-light text-dark hover:text-white hover:bg-primary'
                } dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary`}
                onClick={next}
                disabled={activePage === totalPageCount}
              >
                <IconCaretDown className='caret-down-icon' />
              </Button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeamMemberGridCard;
