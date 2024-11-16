import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import Button from '../../components/CustomButton/CustomButton';
import { IconX } from '../../assets';
import {
  membersData,
  TimeLineActivities,
  TimeLineModalProps,
  TimeLineType,
} from '../../utils/type';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import { Tooltip } from '@material-tailwind/react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './TimeActivity.css';
import dayjs from 'dayjs';
import { activityClasses, parseTimeToMinutes } from '../../utils';
import ChartComponent from '../../components/ChartComponent/ChartComponent';

const TimeLineModal: React.FC<TimeLineModalProps> = ({
  openTimeActivityModal,
  setTimeActivityModal,
  timeLineData,
  dsrData,
  timeLineLoading,
  timeLineDate,
}) => {
  return (
    <Transition appear show={openTimeActivityModal} as={Fragment}>
      <Dialog
        as='div'
        open={openTimeActivityModal}
        onClose={() => setTimeActivityModal(false)}
        className='relative z-[51]'
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-[black]/60' />
        </Transition.Child>
        <div className='main-model-wrap'>
          <div className='sub-model-wrap'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='panel time-activity-main-div'>
                {timeLineLoading ? (
                  <div className='loder '>
                    <CustomLoader />
                  </div>
                ) : (
                  <>
                    <Button
                      type='button'
                      className='add-modal-button'
                      onClick={() => setTimeActivityModal(false)}
                    >
                      <IconX />
                    </Button>
                    {timeLineData?.map((item: TimeLineType, index: number) => {
                      const totalActivityMinutes = parseTimeToMinutes(
                        item?.totalActivityHours
                      );
                      const totalMeetingMinutes = parseTimeToMinutes(
                        item?.totalMeetingHours
                      );
                      const totalWorkMinutes = parseTimeToMinutes(
                        item?.totalWorkHours
                      );
                      const totalManualMinutes = parseTimeToMinutes(
                        item?.totalManualHours
                      );
                      return (
                        <div
                          className='grid grid-cols-1 md:grid-cols-1'
                          key={index}
                        >
                          <div className='header-content'>
                            <div className='time-line-header'>Timeline</div>
                            <div className='flex space-x-2'>
                              <div className='timeline-user font-semibold italic'>
                                {item?.firstName} ({' '}
                                {dayjs(timeLineDate).format('DD-MM-YYYY')} )
                              </div>
                            </div>
                          </div>
                          <div className='time-activity-main'>
                            <div className='time-activity-item '>
                              <div className='timeline-container'>
                                <div className='timeline-activity'>
                                  <div className='flex flex-col'>
                                    {(() => {
                                      let lastCheckoutTime: string | null =
                                        null;

                                      const activities = item?.activities.map(
                                        (
                                          activity: TimeLineActivities,
                                          index: number
                                        ) => {
                                          if (
                                            index ===
                                            item.activities.length - 1
                                          ) {
                                            lastCheckoutTime =
                                              activity?.checkout ?? null;
                                          }

                                          const activityType = activity?.type;
                                          const activityClass =
                                            activityClasses[activityType] ||
                                            'before:bg-gray-500 after:border-gray-500';

                                          return (
                                            <div key={index} className='flex'>
                                              <p className='time-activity-time'>
                                                {activity?.checkin}
                                              </p>
                                              <div
                                                className={`time-activity-dot time-activity-dot-secondary ${activityClass}`}
                                              />
                                              <div className='time-activity-details'>
                                                <p className='time-activity-text'>
                                                  <Tippy
                                                    trigger='click'
                                                    content={
                                                      activity?.description
                                                    }
                                                  >
                                                    <p className='line-clamp-2 overflow-hidden'>
                                                      {activity?.description}
                                                    </p>
                                                  </Tippy>
                                                </p>
                                                <p className='time-activity-duration'>
                                                  {activity?.projectName}
                                                  <span
                                                    style={{
                                                      fontWeight: 'italic',
                                                    }}
                                                  >
                                                    ({activity?.hoursTracked})
                                                    {activity?.isAutoCheckout && (
                                                      <Tooltip
                                                        placement='bottom'
                                                        content='Auto checkout'
                                                      >
                                                        <span className='auto-checkout-dot' />
                                                      </Tooltip>
                                                    )}
                                                  </span>
                                                </p>
                                              </div>
                                            </div>
                                          );
                                        }
                                      );

                                      return (
                                        <>
                                          {activities}
                                          {lastCheckoutTime &&
                                            dsrData.length > 0 && (
                                              <div className='flex'>
                                                <p className='time-activity-time'>
                                                  {lastCheckoutTime}
                                                </p>
                                                <div
                                                  className={`time-activity-dot before:bg-red-500 after:none`}
                                                />
                                                <div className='time-activity-details'>
                                                  <p className='time-activity-text'>
                                                    <Tippy
                                                      trigger='click'
                                                      content='Logout'
                                                    >
                                                      <p className='line-clamp-2 overflow-hidden'>
                                                        Logout
                                                      </p>
                                                    </Tippy>
                                                  </p>
                                                </div>
                                              </div>
                                            )}
                                        </>
                                      );
                                    })()}
                                  </div>
                                </div>
                              </div>
                              <div className='chart-container-dsr'>
                                <div className='chart-container'>
                                  {timeLineLoading ? (
                                    <div className='sub-chart'>
                                      <span className='chart-loading'></span>
                                    </div>
                                  ) : (
                                    <ChartComponent
                                      totalActivityMinutes={
                                        totalActivityMinutes
                                      }
                                      totalMeetingMinutes={totalMeetingMinutes}
                                      totalWorkMinutes={totalWorkMinutes}
                                      totalManualMinutes={totalManualMinutes}
                                    />
                                  )}
                                </div>
                                <div className='dsr-details'>
                                  <p className='title-head'>{'DSR'}</p>
                                  <ul>
                                    {dsrData[0]?.members ? (
                                      dsrData[0].members.map(
                                        (item: membersData, index: number) => (
                                          <li
                                            key={index}
                                            className='dsr-content list-disc'
                                          >
                                            <div
                                              dangerouslySetInnerHTML={{
                                                __html: item?.descriptions,
                                              }}
                                            />
                                          </li>
                                        )
                                      )
                                    ) : (
                                      <li className='time-line-dsr'>
                                        No data available
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default TimeLineModal;
