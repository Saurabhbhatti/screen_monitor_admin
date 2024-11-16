import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import {
  userActivityChart,
  simpleColumnStacked,
} from '../../utils/mockData';
import { IRootState } from '../../redux/rootReducer';
import { setPageTitle } from '../../redux/themeConfigSlice';
import './DashBoard.css';
import CodeHighlight from '../../components/Highlight';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import Flatpickr from 'react-flatpickr';
import {
  currentWeekData,
  fetchDataBasedOnFilterCustomData,
  getButtonClassName,
  getEndOfCurrentWeek,
} from '../../utils';
import { OptionTypeFilter } from '../../utils/type';
import Button from '../../components/CustomButton/CustomButton';
import { getUserRole, hasPermission, UserRole } from '../../utils';
import WorkingTimeCard from './Cards/WorkingTimeCard';
import AttendanceCard from './Cards/AttendanceCard';
import LeaveDetailsCard from './Cards/LeaveDetailsCard';
import TotalRequestCard from './Cards/TotalRequestCard';
import ActiveProjectAndMembers from './Cards/ActiveProjectAndMembers';
import DashboardEmpTable from './Tables/DashboardEmpTable';
import DashboardProjectTable from './Tables/DashboardProjectTable';
import TimeSheetTable from './Tables/TimeSheetTable';

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Dashboard'));
  }, [dispatch]);
  const initialRange = currentWeekData();

  const [codeArr, setCodeArr] = useState<string[]>([]);
  const [maxDate, setMaxDate] = useState<any>(getEndOfCurrentWeek());
  const [dateRange, setDateRange] = useState<any>(initialRange);
  const [chartData, setChartData] = useState<any>({});
  const [filter, setFilter] = useState<OptionTypeFilter>({
    value: 'Weekly',
  });
  const [isWeekPickerOpen, setIsWeekPickerOpen] = useState(false);

  const [loading] = useState(false);

  const userRole = getUserRole();

  const isDark = useSelector(
    (state: IRootState) =>
      state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode
  );

  const options: any = simpleColumnStacked.options;

  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl'
      ? true
      : false;

  const adjustedUserActivityChart = {
    ...userActivityChart,
    options: {
      ...userActivityChart.options,
      colors: isDark ? ['#4CAF50'] : ['#1E90FF'],
      yaxis: {
        ...(userActivityChart.options.yaxis ?? {}),
        opposite: isRtl ? true : false,
      },
      grid: {
        ...(userActivityChart.options.grid ?? {}),
        borderColor: isDark ? '#191E3A' : '#E0E6ED',
      },
      fill: {
        ...(userActivityChart.options.fill ?? {}),
        gradient: {
          ...(userActivityChart.options.fill?.gradient ?? {}),
          opacityFrom: isDark ? 0.19 : 0.28,
          stops: isDark ? [100, 100] : [45, 100],
        },
      },
    },
  };

  const salesByCategory: any = {
    series: [29, 8, 3],
    options: {
      chart: {
        type: 'donut',
        height: 460,
        fontFamily: 'Nunito, sans-serif',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 25,
        colors: isDark ? '#0e1726' : '#fff',
      },
      colors: isDark
        ? ['#5c1ac3', '#e2a03f', '#e7515a', '#e2a03f']
        : ['#e2a03f', '#5c1ac3', '#e7515a'],
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '14px',
        markers: {
          width: 10,
          height: 10,
          offsetX: -2,
        },
        height: 50,
        offsetY: 20,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            background: 'transparent',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '29px',
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: '26px',
                color: isDark ? '#bfc9d4' : undefined,
                offsetY: 16,
                formatter: (val: any) => {
                  return val;
                },
              },
              total: {
                show: true,
                label: 'Total',
                color: '#888ea8',
                fontSize: '29px',
                formatter: (w: any) => {
                  return w.globals.seriesTotals.reduce(function (
                    a: any,
                    b: any
                  ) {
                    return a + b;
                  },
                    0);
                },
              },
            },
          },
        },
      },
      labels: ['Working', 'Meeting', 'Activity'],
      states: {
        hover: {
          filter: {
            type: 'none',
            value: 0.15,
          },
        },
        active: {
          filter: {
            type: 'none',
            value: 0.15,
          },
        },
      },
    },
  };

  const updateChartsBasedOnFilter = (
    filter: 'Custom' | 'Weekly' | 'Monthly'
  ) => {
    const updatedData = fetchDataBasedOnFilterCustomData(filter);
    setChartData(updatedData);
  };

  const getStartOfMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  };

  const getEndOfMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0);
  };

  const getStartOfWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);
    return startOfWeek;
  };

  const getEndOfWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - dayOfWeek));
    return endOfWeek;
  };

  const handleFilterChange = (newFilter: 'Custom' | 'Weekly' | 'Monthly') => {
    setFilter({ value: newFilter });

    if (newFilter === 'Custom') {
      setIsWeekPickerOpen(true);
    } else if (newFilter === 'Weekly') {
      setIsWeekPickerOpen(true);
      const startOfWeek = getStartOfWeek();
      const endOfWeek = getEndOfWeek();
      setDateRange([startOfWeek, endOfWeek]);
    } else if (newFilter === 'Monthly') {
      setIsWeekPickerOpen(true);
      const startOfMonth = getStartOfMonth();
      const today = new Date();
      const lastDayOfMonth = getEndOfMonth();
      const endOfMonth =
        today.getDate() === lastDayOfMonth.getDate() ? lastDayOfMonth : today;
      setDateRange([startOfMonth, endOfMonth]);
    } else {
      setIsWeekPickerOpen(false);
      updateChartsBasedOnFilter(newFilter);
    }
  };


  return (
    <div className='pt-5'>

      {userRole === UserRole.HR && (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
          <WorkingTimeCard />
          <AttendanceCard />
          <LeaveDetailsCard />
        </div>
      )}

      {(userRole === UserRole.PROJECT_MANAGER || userRole === UserRole.COMPANY_ADMIN) && (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
          <AttendanceCard />
          <LeaveDetailsCard />
          <TotalRequestCard />
        </div>
      )}

      {userRole === UserRole.EMPLOYEE && (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
          <ActiveProjectAndMembers />
          <TotalRequestCard />
          <LeaveDetailsCard />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardEmpTable />
        <DashboardProjectTable />
      </div>

      {userRole === UserRole.EMPLOYEE && (
        <div >
          <TimeSheetTable />
        </div>
      )}

      <div className='component-header-styling'>Charts Analytics</div>
      <div className='panel mb-8'>
        <div className='filter-wrap-styling '>
          <div className='inline-flex-data-selecter'>
            <div className='dropdown'>
              <div className='flex gap-2'>
                <div className='dash-board-button-main'>
                  <Button
                    type='button'
                    className={getButtonClassName(filter.value, 'Weekly', 'dash-board-button dash-board-button-weekly bg-primary', 'dash-board-button-weekly-second', 'dash-board-button-weekly-transparent')}
                    onClick={() => handleFilterChange('Weekly')}
                  >
                    Week
                  </Button>
                  <Button
                    type='button'
                    className={getButtonClassName(filter.value, 'Monthly', 'dash-board-button dash-board-button-monthly bg-primary', 'dash-board-button-weekly-second', 'dash-board-button-weekly-transparent')}
                    onClick={() => handleFilterChange('Monthly')}
                  >
                    Month
                  </Button>
                  <Button
                    type='button'
                    className={getButtonClassName(filter.value, 'Custom', 'dash-board-button dash-board-button-custom bg-primary', 'dash-board-button-weekly-second', 'dash-board-button-weekly-transparent')}
                    onClick={() => handleFilterChange('Custom')}
                  >
                    Custom
                  </Button>
                </div>
              </div>
            </div>

            {filter.value === 'Custom' && (
              <div className='ml-3'>
                <Flatpickr
                  options={{
                    mode: 'range',
                    dateFormat: 'Y-m-d',
                    maxDate: maxDate,
                  }}
                  value={dateRange}
                  onChange={(dates: Date[]) => {
                    setDateRange(dates);
                  }}
                  className='date-picker h-[2rem] rounded-[4px]'
                  placeholder='Select date range'
                />
              </div>
            )}
          </div>
        </div>
        <div className='user-timeline-main-wrap'>
          <div className='dash-board-main-time-chart'>
            <div className='user-timeline-sub-wrap'>
              <div className='user-timeline-content'>
                <h5 className='user-timeline-header'>User's Timeline Chart</h5>
              </div>
              <div className='user-timeline-chart-main'>
                <ReactApexChart
                  series={simpleColumnStacked.series}
                  options={options}
                  type='bar'
                  height={300}
                  width={'100%'}
                />
              </div>
              {codeArr.includes('code4') && <CodeHighlight></CodeHighlight>}
            </div>
            <div className='total-timing-main-detail'>
              <div className='total-timing-main-wrap'>
                <h5 className='content-heading-style'>Total Timing</h5>
              </div>
              <div>
                <div className='graph-main-wrap'>
                  {loading ? (
                    <div className='timing-graph-wrap'>
                      <span className='timing-spin-wrap'></span>
                    </div>
                  ) : (
                    <ReactApexChart
                      series={salesByCategory.series}
                      options={salesByCategory.options}
                      type='donut'
                      height={460}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='main-progress-div'>
            <div className='progress-sub-div'>
              <h5 className='progress-chart-header'>User Activity Chart</h5>
            </div>
            <div className='relative'>
              <div className='activity-chart-wrap'>
                {loading ? (
                  <div className='activity-chart-sub-wrap'>
                    <span className='activity-span-style'></span>
                  </div>
                ) : (
                  <ReactApexChart
                    series={adjustedUserActivityChart.series}
                    options={adjustedUserActivityChart.options}
                    type='area'
                    height={325}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='calender-header-style'>Holidays & Events</div>
      <div className='panel mb-5'>
        <div className='calender-main-wrap'>
          <div className='calender-sub-wrap'>
            <div className='title-styling'>Calendar</div>
          </div>
        </div>
        <div className='calendar-wrapper flex flex-row gap-2'>
          <div className='w-full'>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView='dayGridMonth'
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth',
              }}
              editable={true}
              dayMaxEvents={true}
              selectable={true}
              droppable={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;