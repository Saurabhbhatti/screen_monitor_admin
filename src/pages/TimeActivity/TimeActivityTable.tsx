import React from 'react';
import { Tooltip } from '@material-tailwind/react';
import './TimeActivity.css';
import { format } from 'date-fns';
import {
  TimeActivityTableType,
  TimeActivityTableProps,
  TimeActivityType,
  TimeActivities,
} from '../../utils/type';
import {
  getColorsForHours,
  itemsPerPage,
  shouldShowTooltip,
  zeroDailyHoursTracked,
} from '../../utils';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import Button from '../../components/CustomButton/CustomButton';
import IconCaretDown from '../../components/Icon/IconCaretDown';

const TimeActivityTable: React.FC<TimeActivityTableProps> = ({
  tableHeader,
  tableData,
  loading,
  activePage,
  setActivePage,
  prev,
  next,
  onPageClick,
  totalPageCount,
  handleTimeActivity,
}) => {
  return (
    <div className='table-container panel'>
      <div className='table-wrapper'>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th className='table-header-cell-first'>Name</th>

              {tableHeader?.map((activity: TimeActivities, index: number) => {
                return (
                  <th key={index} className='table-header-cell'>
                    {format(new Date(activity.date), 'dd EEE MMM')}
                  </th>
                );
              })}
              <th className='table-header-cell-last'>Total Work</th>
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
          ) : tableData?.data?.length > 0 ? (
            <tbody>
              <>
                {tableData?.data?.map((time: TimeActivityTableType) => {
                  const { firstName, lastName, totalHoursTracked, _id } = time;

                  return (
                    <tr key={`${_id}`}>
                      <td className='table-cell-sticky-left'>
                        {firstName} {lastName}
                      </td>
                      {time?.activities.map(
                        (activity: TimeActivities, index: number) =>
                          shouldShowTooltip(activity?.dailyHoursTracked) ? (
                            <>
                              <Tooltip
                                className='z-0'
                                placement='top'
                                content={
                                  <div>
                                    {activity.types.map(
                                      (
                                        type: TimeActivityType,
                                        index: number
                                      ) => (
                                        <div className='time-hours-Tracked'>
                                          <div key={index}>
                                            {type.type}: {type.hoursTracked}
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                }
                              >
                                <td
                                  onClick={() => {
                                    if (
                                      activity?.dailyHoursTracked !==
                                      zeroDailyHoursTracked
                                    ) {
                                      handleTimeActivity(activity, _id);
                                    }
                                  }}
                                  key={index}
                                  className='table-cell-sticky-left'
                                  style={{
                                    color: getColorsForHours(
                                      activity?.dailyHoursTracked
                                    ),
                                  }}
                                >
                                  {activity?.dailyHoursTracked}
                                </td>
                              </Tooltip>
                            </>
                          ) : (
                            <td key={index} className='wo-text'>
                              {activity?.dailyHoursTracked}
                            </td>
                          )
                      )}
                      <td className='table-cell-sticky-right'>
                        {totalHoursTracked}
                      </td>
                    </tr>
                  );
                })}
              </>
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
      {!loading && tableData?.total > itemsPerPage && (
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
    </div>
  );
};

export default TimeActivityTable;
