import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../redux/themeConfigSlice';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { Dialog, Transition } from '@headlessui/react';
import { Tab } from '@headlessui/react';
import './ScreenShot.css';
import 'react-18-image-lightbox/style.css';
import Lightbox from 'react-18-image-lightbox';
import { useLocation } from 'react-router-dom';
import { Card } from '@material-tailwind/react';
import { Tooltip } from '@material-tailwind/react';
import SearchSelect from '../../components/CustomSelect/CustomSelect';
import CustomButton from '../../components/CustomButton/CustomButton';
import Button from '../../components/CustomButton/CustomButton';
import {
  calculateAverageProductivity,
  calculateProductivity,
  findProjectsByMember,
  getUserRole,
  hasPermission,
  screenshotSorting,
  UserRole,
} from '../../utils';
import { fetchScreenshotDataRequest } from '../../redux/screenshot/action';
import {
  Activity,
  Application,
  MemberOption,
  OptionType,
  ProjectOption,
  Projects,
  ScreenshotDetail,
  ScreenShotResponse,
  TeamMember,
  UserState,
} from '../../utils/type';
import dayjs from 'dayjs';
import { getAllUserRequest } from '../../redux/user/action';
import {
  getAllProjectRequest,
  projectRequest,
} from '../../redux/project/action';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import Placeholder from '../../assets/PlaceholderImage.png';
import IconX from '../../components/Icon/IconX';

const Screenshot = () => {
  const dispatch = useDispatch();

  const { screenshots, loading } = useSelector(
    (state: any) => state?.screenshot
  );
  const { user } = useSelector((state: UserState) => state?.auth);
  const location = useLocation();
  const { item, index } = location.state || {};
  const [lightboxImage, setLightboxImage] = useState<string>('');

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(index || 0);

  useEffect(() => {
    dispatch(setPageTitle('Details'));
  }, [dispatch]);

  useEffect(() => {
    if (item) {
      setPhotoIndex(index || 0);
    }
  }, [item, index]);

  let userRole = getUserRole();

  const { allProjectData } = useSelector((state: Projects) => state.projects);

  useEffect(() => {
    dispatch(setPageTitle('Screenshot'));
  }, [dispatch]);
  const [date, setDate] = useState<Date[]>(() => {
    const now = new Date();
    return [new Date(now.setHours(0, 0, 0, 0))];
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<OptionType | null>(
    null
  );
  const [selectedUser, setSelectedUser] = useState<OptionType>();
  const [projectOption, setSelectedProjectOption] = useState<OptionType[]>([]);
  const [selectedScreenshotDetail, setSelectedScreenshotDetail] =
    useState<ScreenshotDetail>();
  const { allUserData } = useSelector((state: TeamMember) => state?.user);

  useEffect(() => {
    const userId =
      userRole === UserRole.EMPLOYEE ? user?.data?._id : selectedUser?.value;

    if (date.length > 0 && selectedProject) {
      dispatch(
        fetchScreenshotDataRequest({
          userId: userId,
          date: date.length > 0 ? dayjs(date[0]).format('DD-MM-YYYY') : '',
          projectId: selectedProject?.value || undefined,
        })
      );
    }
  }, [date, selectedProject, selectedUser]);

  useEffect(() => {
    window['global'] = window as never;
  }, []);

  useEffect(() => {
    if (hasPermission(userRole, 'screenShot', 'read')) {
      dispatch(getAllUserRequest());
    }
    dispatch(getAllProjectRequest());
  }, []);

  const memberOptions: OptionType[] =
    allUserData?.data?.map(({ firstName, _id }: MemberOption) => ({
      label: firstName,
      value: _id,
    })) || [];

  const userProjectOption: OptionType[] =
    allProjectData?.data?.map(({ projectName, _id }: ProjectOption) => ({
      label: projectName,
      value: _id,
    })) || [];

  useEffect(() => {
    if (hasPermission(userRole, 'screenShot', 'read')) {
      console.log('Selected User');
      let selectedUserValue = selectedUser?.value;
      const memberInProject = findProjectsByMember(
        selectedUserValue,
        allProjectData?.data || []
      );
      setSelectedProjectOption(memberInProject);
      const allProjectsOption = {
        value: '',
        label: 'All Projects',
      };
      setSelectedProject(allProjectsOption);
    }
  }, [selectedUser, userRole]);

  const handleImageClick = (item: ScreenshotDetail) => {
    setSelectedScreenshotDetail(item);
    setModalOpen(true);
  };

  const handleChangeProject = (selectedOption: OptionType) => {
    setSelectedProject(selectedOption);
  };

  const handleChangeUser = (selectedOption: OptionType) => {
    setSelectedUser(selectedOption);
    setSelectedProject(null);
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage < 30) return '#C7253E';
    if (percentage < 60) return '#1F316F';
    return '#0D7C66';
  };

  const {
    totalMouseClicks = 0,
    totalKeyStrokes = 0,
    totalMouseScrolls = 0,
    totalMinutes = 0,
  } = selectedScreenshotDetail || {};

  const currentProductivity = calculateProductivity(
    totalMouseClicks,
    totalKeyStrokes,
    totalMouseScrolls,
    totalMinutes
  );

  const averageProductivity = calculateAverageProductivity(
    totalMouseClicks,
    totalKeyStrokes,
    totalMouseScrolls
  );
  return (
    <div>
      <h2 className='text-2xl font-semibold mb-3'>Screenshots</h2>
      <div className='font-div'>
        <div className='screnshort-select-main'>
          {screenshots?.data?.hourlyScreenshots.length && (
            <div className='screnshort-select-data'>
              <div className='screnshort-select-data-main'>
                <div className='data-label'>Total Hours</div>
                <div className='data-value'>
                  {screenshots?.data?.totalHours}
                </div>
              </div>
              <div className='filter-lable'></div>
            </div>
          )}
          {hasPermission(userRole, 'screenShot', 'read') && (
            <div className='screenShort-select-user'>
              <span className='filter-label '>Filter by:</span>
              <SearchSelect
                placeholder='Select User'
                options={memberOptions}
                isSearchable={true}
                value={selectedUser}
                isClearable={true}
                className='screenShort-select-user-sub'
                onChange={handleChangeUser}
                styles={{
                  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
                }}
              />
            </div>
          )}
        </div>
        <div className='screenShort-select-main'>
          <div className='screenShort-select-main-sub'>
            <SearchSelect
              placeholder='Select Project'
              options={
                hasPermission(userRole, 'screenShot', 'read')
                  ? projectOption
                  : userProjectOption
              }
              isSearchable={true}
              value={selectedProject}
              className='screen-short-select-project'
              isDisabled={
                hasPermission(userRole, 'screenShot', 'read')
                  ? selectedUser
                    ? false
                    : true
                  : false
              }
              onChange={handleChangeProject}
              styles={{
                menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
              }}
            />
          </div>
          <div>
            <Flatpickr
              value={date}
              options={{
                dateFormat: 'd-m-Y',
                position: 'auto right',
                allowInput: true,
                maxDate: 'today',
              }}
              className='flatpickr form-input'
              onChange={(date: Date[]) => setDate(date)}
              placeholder='Select Date'
            />
          </div>
        </div>
      </div>
      {loading ? (
        <div className='centered-container'>
          <CustomLoader />
        </div>
      ) : (
        <>
          {screenshots && screenshots?.data?.hourlyScreenshots?.length > 0 ? (
            <div className='panel'>
              <div className='mb-5'>
                {screenshotSorting(screenshots?.data?.hourlyScreenshots).map(
                  (item: ScreenShotResponse) => (
                    <Fragment key={item.time}>
                      <div className='text-lg mt-1 ml-1'>{item.time}</div>
                      <div className='img-layout'>
                        {item?.screenshots.map(
                          (image: ScreenshotDetail, index: number) => {
                            const {
                              totalMouseClicks = 0,
                              totalKeyStrokes = 0,
                              totalMouseScrolls = 0,
                              totalMinutes = 0,
                            } = image;
                            const currentProductivity = calculateProductivity(
                              totalMouseClicks,
                              totalKeyStrokes,
                              totalMouseScrolls,
                              totalMinutes
                            );
                            const progressBarColor =
                              getProgressBarColor(currentProductivity);

                            return (
                              <Button
                                key={index}
                                type='button'
                                onClick={() => handleImageClick(image)}
                                className='screen-short-button'
                              >
                                <div className='relative-img'>
                                  <img
                                    src={
                                      image?.fileUrl
                                        ? image?.fileUrl
                                        : Placeholder
                                    }
                                    alt='gallery'
                                    className='img-rounded mb-1'
                                  />
                                  <div className='overlay'>
                                    <span className='font-bold'>
                                      {image?.projectName}
                                    </span>
                                    <span className='text-xs'>
                                      {dayjs(image?.createdAt).format('HH:mm')}
                                    </span>
                                  </div>
                                  <div className='progressbar-wrap pt-2 pb-2 border-solid'>
                                    <Tooltip
                                      content={`Percentage : ${currentProductivity}% , Keyboard : ${totalKeyStrokes} , Mouse : ${totalMouseClicks} , Scroll : ${totalMouseScrolls}`}
                                      placement='bottom'
                                    >
                                      <div className='progress-sub-wrap'>
                                        <div
                                          className='progress-line'
                                          style={{
                                            width: `${currentProductivity}%`,
                                            backgroundColor: progressBarColor,
                                          }}
                                        ></div>
                                      </div>
                                    </Tooltip>
                                    <div className='progress-text'>
                                      {currentProductivity}%
                                    </div>
                                  </div>
                                </div>
                              </Button>
                            );
                          }
                        )}
                      </div>
                    </Fragment>
                  )
                )}
              </div>
            </div>
          ) : (
            <div className='panel'> No Data Available !</div>
          )}
        </>
      )}
      <Transition appear show={modalOpen} as={Fragment}>
        <Dialog as='div' open={modalOpen} onClose={() => setModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0' />
          </Transition.Child>
          <div className='transition-ss'>
            <div className='sub-ss-transition'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel as='div' className='panel dialog-data'>
                  <div className='div-dialog'>
                    <div className='dailog-info'>
                      <h2 className='font-bold'>
                        {selectedScreenshotDetail?.projectName || 'N/A'}
                      </h2>
                      <h2 className='font-semibold italic'>
                        (
                        {dayjs(selectedScreenshotDetail?.createdAt).format(
                          'MMM DD, YYYY HH:mm ddd'
                        )}
                        )
                      </h2>
                    </div>
                    <h5 className='font-bold text-lg'></h5>
                    <CustomButton
                      type='button'
                      onClick={() => setModalOpen(false)}
                      className='absolute top-4 right-4 text-gray-400'
                    >
                      <IconX />
                    </CustomButton>
                  </div>
                  <div className='container-styles'>
                    <Tab.Group>
                      <Tab.Panels
                        className='tab-panels'
                        style={{ maxHeight: 'calc(100vh - 150px)' }}
                      >
                        <div className='tab-list-container'>
                          <div className='sub-tab '>
                            <Tab.List className='tab-list'>
                              <Tab
                                className={({ selected }) =>
                                  `tab-item ${
                                    selected
                                      ? 'tab-item-selected'
                                      : 'tab-item-unselected'
                                  }`
                                }
                              >
                                Screenshots
                              </Tab>
                              <Tab
                                className={({ selected }) =>
                                  `tab-item ${
                                    selected
                                      ? 'tab-item-selected'
                                      : 'tab-item-unselected'
                                  }`
                                }
                              >
                                Activity Table
                              </Tab>
                            </Tab.List>
                          </div>
                        </div>

                        <Tab.Panel>
                          <div className='flex flex-col'>
                            <Card
                              className='card-styles'
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                            >
                              <div className='card-content'>
                                <div className='flex items-center'>
                                  <div className='percentage'>
                                    {currentProductivity}%
                                  </div>
                                  <div className='list-container'></div>
                                  <div>
                                    <div className='card-column'>Mouse</div>
                                    <div className='text-sm'>
                                      {
                                        selectedScreenshotDetail?.totalMouseClicks
                                      }
                                    </div>
                                  </div>
                                  <div className='list-container'></div>
                                  <div>
                                    <div className='card-column'>Keyboard</div>
                                    <div className='text-sm'>
                                      {
                                        selectedScreenshotDetail?.totalKeyStrokes
                                      }
                                    </div>
                                  </div>
                                  <div className='list-container'></div>
                                  <div>
                                    <div className='card-column'>Scroll</div>
                                    <div className='text-sm'>
                                      {
                                        selectedScreenshotDetail?.totalMouseScrolls
                                      }
                                    </div>
                                  </div>
                                  <div className='list-container'></div>
                                  <div>
                                    <div className='card-column'>AVG</div>
                                    <div className='text-sm'>
                                      {averageProductivity}
                                    </div>
                                  </div>
                                  <div className='list-container'></div>
                                  <div>
                                    <div className='card-column'>Minutes</div>
                                    <div className='text-sm'>
                                      {selectedScreenshotDetail?.totalMinutes}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Card>

                            <div className='flex justify-center'>
                              {selectedScreenshotDetail && (
                                <img
                                  src={
                                    selectedScreenshotDetail?.fileUrl
                                      ? selectedScreenshotDetail?.fileUrl
                                      : Placeholder
                                  }
                                  alt='Selected'
                                  className='w-4/5 h-auto object-cover mt-3 cursor-pointer'
                                  onClick={() => {
                                    setLightboxImage(
                                      selectedScreenshotDetail?.fileUrl
                                        ? selectedScreenshotDetail?.fileUrl
                                        : Placeholder
                                    );
                                    setIsOpen(true);
                                  }}
                                />
                              )}
                              {isOpen && (
                                <Lightbox
                                  mainSrc={lightboxImage}
                                  onCloseRequest={() => setIsOpen(false)}
                                />
                              )}
                            </div>
                          </div>
                        </Tab.Panel>

                        <Tab.Panel>
                          <div>
                            <div className='activity-tab panel'>
                              <div className='table-responsive'>
                                <table className='table-striped table-hover'>
                                  <thead>
                                    <tr>
                                      <th className='table-head'>Time</th>
                                      <th className='table-head'>
                                        <Tooltip
                                          placement='top'
                                          content={'Mouse'}
                                        >
                                          <img
                                            src='https://www.webwork-tracker.com/images/mouse-icon.svg'
                                            alt='mouse icon'
                                          />
                                        </Tooltip>
                                      </th>
                                      <th className='table-head'>
                                        <Tooltip
                                          placement='top'
                                          content={'Keyboard'}
                                        >
                                          <img
                                            src='https://www.webwork-tracker.com/images/keyboard-icon.svg'
                                            alt='keyboard icon'
                                          />
                                        </Tooltip>
                                      </th>
                                      <th className='table-head'>
                                        <Tooltip
                                          placement='top'
                                          content={'Scroll'}
                                        >
                                          <img
                                            src='https://www.webwork-tracker.com/images/scroll-icon.svg'
                                            alt='scroll icon'
                                          />
                                        </Tooltip>
                                      </th>

                                      <th className='table-head'>Details</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {selectedScreenshotDetail?.activities?.map(
                                      (activity: Activity) => {
                                        return (
                                          <tr>
                                            <td className='detail-activity-styling'>
                                              {activity?.time}
                                            </td>
                                            <td className='detail-activity-styling'>
                                              {activity?.mouseClicks}
                                            </td>
                                            <td className='detail-activity-styling'>
                                              {activity?.keyStrokes}
                                            </td>
                                            <td className='detail-activity-styling'>
                                              {activity?.mouseScrolls}
                                            </td>

                                            {activity?.applications.map(
                                              (
                                                detail: Application,
                                                index: number
                                              ) => (
                                                <div className='flex'>
                                                  <td className='whitespace-nowrap p-1'>
                                                    <div>{detail.name}</div>
                                                    <div className='text-xs'>
                                                      {detail.description}
                                                    </div>
                                                  </td>
                                                </div>
                                              )
                                            )}
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Screenshot;
