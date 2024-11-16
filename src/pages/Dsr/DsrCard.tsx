import React from 'react';
import { format, parseISO } from 'date-fns';
import { ReportListProps } from '../../utils/type';
import { UserRole } from '../../utils';
import './DsrPage.css';

const DsrCard: React.FC<ReportListProps> = React.memo(
  ({ userRole, selectedMember, data }) => {
    const NO_DATA_FOUND = 'No Data Found!';
    const NO_DSR_SUBMITTED = 'No DSR Submitted!';
    const WEEK_OFF = 'Week-Off!';
    const HOLIDAY = 'Holiday!';

    const getTaskMessage = (
      activity: ReportListProps['data'][number]['activities'][number]
    ) => {
      const hoursTracked = activity.dailyHoursTracked as string | number;
      const taskContent = activity?.dsr?.description || '';
      const leaveStatus = activity.leave;

      if (
        hoursTracked === 'Holiday' ||
        taskContent === 'Holiday' ||
        leaveStatus === 'Holiday'
      ) {
        return HOLIDAY;
      }

      const hoursTrackedStr = hoursTracked.toString();

      if (
        hoursTrackedStr === '-' &&
        Object.keys(activity.dsr || {}).length === 0
      ) {
        return NO_DATA_FOUND;
      } else if (
        hoursTrackedStr !== '-' &&
        Object.keys(activity.dsr || {}).length === 0
      ) {
        return NO_DSR_SUBMITTED;
      } else if (hoursTrackedStr === 'WO') {
        return WEEK_OFF;
      }

      return taskContent;
    };

    const getStyle = (message: string): React.CSSProperties => {
      const textStyleChange = [
        NO_DATA_FOUND,
        NO_DSR_SUBMITTED,
        WEEK_OFF,
        HOLIDAY,
      ].includes(message);
      return textStyleChange
        ? {
            fontSize: '20px',
            textAlign: 'center',
            marginTop: '100px',
          }
        : {
            maxHeight: '350px',
          };
    };

    const formatDate = (dateString: string) => {
      return format(parseISO(dateString), 'EEE, dd MMM');
    };

    const renderTaskContent = (
      activity: ReportListProps['data'][number]['activities'][number]
    ) => {
      const message = getTaskMessage(activity);
      const style = getStyle(message);

      return (
        <div
          className='dsr-task'
          style={style}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      );
    };

    const renderCards = () => {
      return data?.map((item, index) =>
        item?.activities?.map((activity: any, activityIndex: any) => {
          const hoursTracked =
            activity.dailyHoursTracked === '-'
              ? '0'
              : activity.dailyHoursTracked;
          const cardClass = 'dsr-card';

          return (
            <div className={cardClass} key={`${index}-${activityIndex}`}>
              <div className='card-header'>
                <div className='date-day-block'>
                  <h3 className='date'>{formatDate(activity?.date)}</h3>
                  <h3 className='day'>
                    {hoursTracked}
                    {hoursTracked !== 'WO' &&
                      hoursTracked !== 'Holiday' &&
                      ' Hrs'}
                  </h3>
                </div>
              </div>
              <div className='card-body'>
                <div className='task-content'>
                  {renderTaskContent(activity)}
                </div>
              </div>
            </div>
          );
        })
      );
    };

    if (!data || data.length === 0) {
      return <div className='panel'>No data available</div>;
    }

    return userRole === UserRole.COMPANY_ADMIN &&
      (!selectedMember || selectedMember.value === '') ? (
      <div className='panel'>No data available</div>
    ) : (
      <div className='report-cards'>{renderCards()}</div>
    );
  }
);

export default DsrCard;
