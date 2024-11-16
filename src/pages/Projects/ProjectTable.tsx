import React from 'react';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import Button from '../../components/CustomButton/CustomButton';
import { Tooltip } from '@material-tailwind/react';
import CustomSwitch from '../../components/SwitchComponent/SwitchComponent';
import { IconEdit, IconTrashLines } from '../../assets';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import dayjs from 'dayjs';
import { ProjectTableProps } from '../../utils/type';
import './ProjectTable.css';
import { getUserRole, hasPermission, itemsPerPage } from '../../utils';

const ProjectTable: React.FC<ProjectTableProps> = ({
  loading,
  projectData,
  totalPageCount,
  activePage,
  setActivePage,
  onPageClick,
  addMember,
  handleScreenshortChange,
  handleStatusChange,
  handleEditProject,
  showDeleteAlert,
  prev,
  next,
}) => {
  let userRole = getUserRole();
  return (
    <>
      <div className='table-responsive'>
        <table className='table-striped table-hover'>
          <thead>
            <tr>
              <th className='table-header'>Project Name</th>
              <th className='table-header'>Member</th>
              <th className='table-header'>Date</th>
              <th className='table-header'>Notes</th>
              <th className='table-header'>Total working hours</th>

              {hasPermission(userRole, 'project', 'write') && (
                <>
                  <th className='table-header'>Screenshot</th>
                  <th className='table-header'>Status</th>
                  <th className='!text-center table-header'>Actions</th>
                </>
              )}
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan={8}>
                  <div className='flex justify-center items-center w-full h-32'>
                    <CustomLoader />
                  </div>
                </td>
              </tr>
            </tbody>
          ) : projectData.data?.length > 0 ? (
            <tbody>
              {projectData?.data?.map((project: any, index: number) => (
                <tr key={project.id}>
                  <td>
                    <div className='project-name'>
                      <div>{project.projectName}</div>
                    </div>
                  </td>
                  <td>
                    <div className='member-section gap-1'>
                      {hasPermission(userRole, 'project', 'write') && (
                        <Button
                          onClick={() => addMember(project)}
                          className='add-member-btn'
                        >
                          <span className='plus-icon'>+</span>
                        </Button>
                      )}

                      <div className='flex -space-x-1'>
                        {project?.members
                          ?.slice(0, 2)
                          .map((member: any, index: number) => (
                            <Tooltip
                              placement='bottom'
                              content={`${member.firstName} ${member.lastName}`}
                            >
                              <div className='member-tooltip'>
                                {member.firstName.charAt(0)}
                                {member.lastName.charAt(0)}
                              </div>
                            </Tooltip>
                          ))}
                        <div>
                          {project.members?.length > 2 && (
                            <div>
                              <Tooltip
                                placement='bottom'
                                content={
                                  <div className='flex flex-col'>
                                    {project.members
                                      .slice(2, project.members.length)
                                      .map((member: any, index: any) => (
                                        <span
                                          key={index}
                                          className='text-white'
                                        >
                                          {member.firstName}
                                        </span>
                                      ))}
                                  </div>
                                }
                              >
                                <div className='member-tiling'>
                                  <h6>+{project?.members?.length - 2}</h6>
                                </div>
                              </Tooltip>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{dayjs(project.createdAt).format('DD-MM-YYYY')}</td>
                  <td className='whitespace-normal break-words max-w-[200px]'>
                    {project.notes ? project.notes : <span>-</span>}
                  </td>
                  <td className='whitespace-nowrap'>
                    {project.totalWorkingHours}
                  </td>
                  {hasPermission(userRole, 'project', 'write') && (
                    <td>
                      <CustomSwitch
                        id={`custom_switch_checkbox${project._id}`}
                        isSelected={project.isScreenshot}
                        onChange={(event: any) =>
                          handleScreenshortChange(project, event.target.checked)
                        }
                      />
                    </td>
                  )}
                  {hasPermission(userRole, 'project', 'write') && (
                    <td>
                      <CustomSwitch
                        id={`custom_switch_checkbox${project._id}`}
                        isSelected={project.status === 'active'}
                        onChange={(event: any) =>
                          handleStatusChange(project, event.target.checked)
                        }
                      />
                    </td>
                  )}
                  {hasPermission(userRole, 'project', 'write') && (
                    <td>
                      <div className='edit-button'>
                        <Button
                          type='button'
                          onClick={() => handleEditProject(project)}
                        >
                          {/* Edit */}
                          <IconEdit className='edit-icon' />
                        </Button>
                        <Button
                          type='button'
                          onClick={() => showDeleteAlert(10, project)}
                          className=''
                        >
                          <IconTrashLines className='delete-icon' />
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={8}>
                  <div className='no-data-alert'>No Data Available!</div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

      {/* Pagination */}
      {!loading && projectData?.total > itemsPerPage && (
        <div className='page-data-container'>
          <ul className='ul-list'>
            <li>
              <Button
                type='button'
                className={`prev-btn ${
                  activePage === 1
                    ? 'page-number-enable'
                    : 'page-number-disable'
                } btn-dark`}
                onClick={prev}
                disabled={activePage === 1}
              >
                <IconCaretDown className='prev-icon' />
              </Button>
            </li>
            {[...Array(totalPageCount)].map((_, index) => (
              <li key={index}>
                <Button
                  type='button'
                  className={`number-activePage  ${
                    activePage === index + 1
                      ? 'active-number'
                      : 'page-number-disable'
                  } btn-dark`}
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
                className={`prev-btn ${
                  activePage === totalPageCount
                    ? 'page-number-enable'
                    : 'page-number-disable'
                } btn-dark`}
                onClick={next}
                disabled={activePage === totalPageCount}
              >
                <IconCaretDown className='next-btn' />
              </Button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default ProjectTable;