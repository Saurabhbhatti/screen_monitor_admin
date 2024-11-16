import React from 'react';
import { Tooltip } from '@material-tailwind/react';
import IconTrashLines from '../../assets/Icon/IconTrashLines';
import IconEdit from '../../assets/Icon/IconEdit';
import './TeamMemberTable.css';
import { CustomTableComponentProps } from '../../utils/type';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import CustomSwitch from '../../components/SwitchComponent/SwitchComponent';
import Button from '../../components/CustomButton/CustomButton';

import CustomLoader from '../../components/CustomLoader/CustomLoader';
import {
  getUserRole,
  itemsPerPage,
  hasPermission,
  UserRole,
} from '../../utils';

const TeamMemberTable: React.FC<CustomTableComponentProps> = ({
  userData,
  userRoleData,
  activePage,
  totalPageCount,
  tableHead,
  tableHeadeBase,
  setAddProjectModal,
  handleStatusChange,
  handleEditUser = () => {},
  showAlert = () => {},
  prev,
  next,
  onPageClick,
  setActivePage,
  handleAddProject,
  isTableLoading,
}) => {
  const userRole = getUserRole();
  return (
    <div className='mt-5 panel p-0 border-0 overflow-hidden flex flex-col'>
      <div className='table-responsive'>
        <table className='table-striped table-hover'>
          <thead>
            <tr>
              {tableHead.map((header) => (
                <th key={header.key} className='bg-gray-300 font-extrabold'>
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          {isTableLoading ? (
            <tbody>
              <tr>
                <td colSpan={tableHead.length}>
                  <div className='custom-loader-div'>
                    <CustomLoader />
                  </div>
                </td>
              </tr>
            </tbody>
          ) : userData?.users?.length > 0 ? (
            <tbody>
              {userData?.users?.map((user: any, index: number) => (
                <tr key={user._id}>
                  <td>
                    <div className='flex items-center w-max'>
                      <img
                        src={
                          user?.profilePic || '/assets/images/profile-35.png'
                        }
                        className='h-8 w-8 rounded-full object-cover ltr:mr-2 rtl:ml-2'
                        alt='avatar'
                      />
                      <div className='flex flex-col'>
                        <div>
                          {user?.firstName} {user?.lastName}
                        </div>
                        <div>{user?.empCode}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='flex flex-col'>
                      <span>{user.designation}</span>
                      <span>{user.role}</span>
                    </div>
                  </td>
                  <td className='whitespace-nowrap'>
                    <div>
                      <div className='add-icon-styling'>
                        {hasPermission(userRole, 'teamMember', 'write') && (
                          <Button
                            onClick={() => handleAddProject(user)}
                            className='add-member-btn'
                          >
                            <span className='plus-icon'>+</span>
                          </Button>
                        )}

                        <div className='parent-tooltip-wrap'>
                          {user?.projects
                            ?.slice(0, 2)
                            .map((project: any, index: number) => (
                              <Tooltip
                                key={index}
                                placement='bottom'
                                content={`${project.projectName}`}
                              >
                                <div className='child-tooltip-wrape'>
                                  {project?.projectName
                                    .split(' ')
                                    .map((word: string) => word.charAt(0))
                                    .join('')}
                                </div>
                              </Tooltip>
                            ))}
                          {user.projects?.length > 2 && (
                            <div>
                              <Tooltip
                                placement='bottom'
                                content={
                                  <div className='flex flex-col'>
                                    {user?.projects
                                      .slice(2, user.projects.length)
                                      .map((project: any, index: any) => (
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
                                <div className='project-length-wrap'>
                                  <h6>+{user?.projects?.length - 2}</h6>
                                </div>
                              </Tooltip>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {userRole != UserRole.PROJECT_MANAGER && (
                    <td className='whitespace-nowrap'>
                      {hasPermission(userRole, 'teamMember', 'write') && (
                        <CustomSwitch
                          id={`custom_switch_checkbox${user._id}`}
                          isSelected={user.status === 'active'}
                          onChange={(event: any) =>
                            handleStatusChange(user, event.target.checked)
                          }
                        />
                      )}
                    </td>
                  )}
                  {userRole != UserRole.PROJECT_MANAGER && (
                    <td className='whitespace-nowrap'>
                      <div className='flex gap-4 items-center'>
                        {hasPermission(userRole, 'teamMember', 'write') && (
                          <>
                            <Button
                              type='button'
                              onClick={() => handleEditUser(user)}
                              className=''
                            >
                              <IconEdit className='w-6 h-6 text-warning' />
                            </Button>
                            <Button
                              type='button'
                              onClick={() => showAlert(10, user)}
                              className=''
                            >
                              <IconTrashLines className='text-danger w-6 h-6' />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={tableHead.length}>
                  <div className='no-data-message-wrapper'>
                    No Data Available !
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      {!isTableLoading && (userData?.total ?? 0) > itemsPerPage && (
        <div className='mt-5 flex self-end mr-8'>
          <ul className='list-ul'>
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
                <IconCaretDown className='w-5 h-5 -rotate-90 rtl:rotate-90' />
              </Button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeamMemberTable;
