import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import {
  AllProjectData,
  DateRange,
  MemberOption,
  Path,
  Project,
  Role,
  RoleAccess,
  RolePermissions,
  ScreenShotResponse,
  UsersRole,
  ModuleName,
  Action,
  LeaveRecordType,
  LeaveRecordStatus,
  OptionType,
  ProfileSessionStatus,
} from './type';
import styles from '../pages/Leave/Leaverecords/LeaveRecord.module.css';
import {
  leaveTypeMapping,
  leaveTypeStatus,
  ProfileSessionStatustype,
} from './mockData';

export const isLogin = () => {
  const token = localStorage.getItem('userToken');
  if (token) {
    return true;
  }
  return false;
};

export const handleApiError = (error: any) => {
  let errorMessage = 'An unexpected error occurred. Please try again later.';
  if (error.response) {
    const { status, data } = error.response;
    if (status === 404) {
      errorMessage =
        data?.message ||
        data?.error ||
        'Resource not found. Please check the URL and try again.';
    } else if (status === 500) {
      errorMessage =
        data?.message ||
        data?.error ||
        'Internal server error. Please try again later.';
    } else if (status === 400) {
      errorMessage = data?.message || data?.error;
    } else {
      errorMessage = data?.message || errorMessage;
    }
  }
  toast.error(errorMessage);
  return error?.response ? error?.response?.data : error;
};

export const useDebouncedValue = (inputValue: any, delay: any) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};

const sharedAdminAndHrRoutes: Path[] = [
  '/dashboard',
  '/team-member',
  '/time-activity',
  '/projects',
  '/screenshot',
  '/calendar',
  '/profile',
  '/change-password',
  '/leave',
  '/leavehistory',
  '/compoff',
  '/dsr',
  '/timeregulate',
  '/attendance',
  '/holiday',
  '/settings',
];

export const roleAccess: RoleAccess = {
  SA: ['/company', '/change-password', '/profile'],
  HR: sharedAdminAndHrRoutes,
  CA: sharedAdminAndHrRoutes,
  PM: sharedAdminAndHrRoutes,
  EMP: [
    '/dashboard',
    '/time-activity',
    '/projects',
    '/screenshot',
    '/calendar',
    '/profile',
    '/change-password',
    '/leave',
    '/leavehistory',
    '/dsr',
    '/timeregulate',
    '/attendance',
    '/holiday',
    '/settings',
  ],
};

const isValidRole = (role: string): role is Role => {
  return ['SA', 'CA', 'EMP', 'HR', 'PM'].includes(role);
};

export const isAllowed = (role: string, path: any): boolean => {
  if (!isValidRole(role)) {
    return false;
  }
  return roleAccess[role].includes(path);
};

export const setLocalStorageData = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getLocalStorageData = (key: string) => {
  return localStorage.getItem(key);
};

export const removeLocalStorageData = (key: string, value: string) => {
  localStorage.removeItem(key);
};

export const removeAllLocalStorage = () => {
  localStorage.clear();
};

export const getToken = () => {
  return getLocalStorageData('userToken') || '';
};

export const getUserRole = () => {
  return getLocalStorageData('userRole') || '';
};

export const checkIfMembersChanged = (
  projectData: Project,
  initialMembers: any
) => {
  const currentMemberIds = projectData?.members?.map(
    (member: MemberOption) => member?._id
  );
  const initialMemberIds = initialMembers?.map(
    (member: MemberOption) => member?.values
  );

  const isMembersChanged =
    initialMemberIds?.length !== currentMemberIds?.length ||
    initialMemberIds?.some(
      (id: string, index: number) => id !== currentMemberIds[index]
    );

  return isMembersChanged;
};

// export const currentWeekData = (): [Date, Date] => {
//   const today = new Date();
//   const dayOfWeek = today.getDay();
//   const firstDay = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
//   const lastDay = firstDay + 6;

//   const startDate = new Date(today.setDate(firstDay));
//   const endDate = new Date(today.setDate(lastDay));

//   return [startDate, endDate];
// };

export const currentWeekData = (): [Date, Date] => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const firstDay = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);

  const startDate = new Date(today);
  startDate.setDate(firstDay);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  return [startDate, endDate];
};

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const getColorsForHours = (hours: string) => {
  const time630 = timeToMinutes('06:30');
  const time8 = timeToMinutes('08:00');
  const time9 = timeToMinutes('09:00');

  const inputTime = timeToMinutes(hours);

  if (inputTime < time630) {
    return 'red';
  } else if (inputTime >= time630 && inputTime < time8) {
    return 'Brown';
  } else if (inputTime >= time8 && inputTime < time9) {
    return 'green';
  } else if (inputTime >= time9) {
    return 'blue';
  }

  return 'transparent';
};

export const getColorsForAttendance = (attendance: string) => {
  switch (attendance) {
    case 'Present':
      return 'green';
    case 'Half-Day':
      return 'orange';
    case 'On Leave':
      return 'blue';
    case 'Absent':
      return 'red';
    case 'Holiday':
      return 'gray';
    default:
      return 'transparent';
  }
};

export const screenshotSorting = (hourlyScreenshots: ScreenShotResponse[]) => {
  const sortedScreenshots = hourlyScreenshots?.sort((a: any, b: any) => {
    const [aStartHour, aEndHour] = a.time
      .split('-')
      .map((time: any) => parseInt(time.split(':')[0], 10));
    const [bStartHour, bEndHour] = b.time
      .split('-')
      .map((time: any) => parseInt(time.split(':')[0], 10));
    if (aStartHour !== bStartHour) {
      return bStartHour - aStartHour;
    } else {
      return bEndHour - aEndHour;
    }
  });
  return sortedScreenshots || [];
};

export const UserRole = {
  EMPLOYEE: 'EMP',
  COMPANY_ADMIN: 'CA',
  SUPER_ADMIN: 'SA',
  PROJECT_MANAGER: 'PM',
  HR: 'HR',
};

export function getUnixTimestamps(dateRange: DateRange) {
  if (!Array.isArray(dateRange) || dateRange.length !== 2) {
    throw new Error('dateRange should be an array of two date strings.');
  }

  const [startDate, endDate] = dateRange;

  const startUnixTime = dayjs(startDate).startOf('day').unix();
  const endUnixTime = dayjs(endDate).endOf('day').unix();
  return [startUnixTime, endUnixTime];
}

export const getUnixTimestampsSingleDate = (date: string) => {
  const startOfDay = dayjs(date).startOf('day');
  const startUnixTimestamp = startOfDay.unix();

  const endOfDay = dayjs(date).endOf('day');
  const endUnixTimestamp = endOfDay.unix();

  return {
    startUnixTimestamp,
    endUnixTimestamp,
  };
};

export const shouldShowTooltip = (dailyHoursTracked: string): boolean => {
  return dailyHoursTracked !== '-' && dailyHoursTracked !== 'WO';
};

export const activityClasses: any = {
  // TODO: activity class is key of string
  work: 'before:bg-success after:border-success',
  activity: 'before:bg-danger after:border-danger',
  meeting: 'before:bg-info after:border-info',
  manual: 'before:bg-warning after:border-warning',
};

export const itemsPerPage = 10;

export const zeroDailyHoursTracked = '0:00';

export const findProjectsByMember = (
  memberId: string | undefined,
  projects: AllProjectData[]
) => {
  const filteredProjects = projects
    ?.filter((project: AllProjectData) =>
      project?.members?.some((member: MemberOption) => member._id === memberId)
    )
    .map((project) => ({
      value: project._id,
      label: project.projectName,
    }));

  const allProjectsOption = {
    value: '',
    label: 'All Projects',
  };

  return [allProjectsOption, ...filteredProjects];
};

export const parseTimeToMinutes = (timeStr: string | undefined): number => {
  if (!timeStr) {
    return 0;
  }
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

export const formatMinutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}:${mins < 10 ? '0' : ''}${mins}`;
};

export const getEndOfCurrentWeek = (): Date => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const endOfWeek = new Date(today);

  if (dayOfWeek === 0) {
    endOfWeek.setHours(23, 59, 59, 999);
  } else {
    endOfWeek.setDate(today.getDate() + (7 - dayOfWeek));
    endOfWeek.setHours(23, 59, 59, 999);
  }

  return endOfWeek;
};

export const getPreviosSevenDays = (): string[] => {
  const today = new Date();
  const last7Days = [];

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 7);
  const endDate = new Date(today);
  endDate.setDate(today.getDate() - 1);

  last7Days.push(startDate.toISOString().split('T')[0]);
  last7Days.push(endDate.toISOString().split('T')[0]);

  return last7Days;
};

export const findProjectsByMembers = (
  memberIds: string[],
  projects: AllProjectData[]
) => {
  const filteredProjects = projects
    .filter((project: AllProjectData) =>
      project?.members?.some(
        (member: MemberOption) =>
          member._id !== undefined && memberIds.includes(member._id)
      )
    )
    .map((project) => ({
      value: project?._id,
      label: project?.projectName,
    }));

  return filteredProjects;
};

export const checkUpdateObject = (obj1: any, obj2: any) => {
  // This function we are using every update button
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

// Base max values per minute (for 1 minute)
const BASE_MAX_KEYSTROKES = 9.75;
const BASE_MAX_MOUSE_SCROLLS = 24.75;
const BASE_MAX_MOUSE_CLICKS = 18.5;

const MIN_KEYSTROKES = 0;
const MIN_MOUSE_SCROLLS = 0;
const MIN_MOUSE_CLICKS = 0;

function getMaxValues(minutes: number) {
  switch (minutes) {
    case 3:
      return {
        maxKeystrokes: Math.round(BASE_MAX_KEYSTROKES * 3),
        maxMouseScrolls: Math.round(BASE_MAX_MOUSE_SCROLLS * 3),
        maxMouseClicks: Math.round(BASE_MAX_MOUSE_CLICKS * 3),
      };
    case 4:
      return {
        maxKeystrokes: Math.round(BASE_MAX_KEYSTROKES * 4),
        maxMouseScrolls: Math.round(BASE_MAX_MOUSE_SCROLLS * 4),
        maxMouseClicks: Math.round(BASE_MAX_MOUSE_CLICKS * 4),
      };
    case 5:
      return {
        maxKeystrokes: Math.round(BASE_MAX_KEYSTROKES * 5),
        maxMouseScrolls: Math.round(BASE_MAX_MOUSE_SCROLLS * 5),
        maxMouseClicks: Math.round(BASE_MAX_MOUSE_CLICKS * 5),
      };
    case 6:
      return {
        maxKeystrokes: Math.round(BASE_MAX_KEYSTROKES * 6),
        maxMouseScrolls: Math.round(BASE_MAX_MOUSE_SCROLLS * 6),
        maxMouseClicks: Math.round(BASE_MAX_MOUSE_CLICKS * 6),
      };
    case 7:
      return {
        maxKeystrokes: Math.round(BASE_MAX_KEYSTROKES * 7),
        maxMouseScrolls: Math.round(BASE_MAX_MOUSE_SCROLLS * 7),
        maxMouseClicks: Math.round(BASE_MAX_MOUSE_CLICKS * 7),
      };
    default:
      return {
        maxKeystrokes: Math.round(BASE_MAX_KEYSTROKES * 7),
        maxMouseScrolls: Math.round(BASE_MAX_MOUSE_SCROLLS * 7),
        maxMouseClicks: Math.round(BASE_MAX_MOUSE_CLICKS * 7),
      };
  }
}

export function calculateProductivity(
  keyStrokes: number,
  mouseScrolls: number,
  mouseClicks: number,
  minutes: number
) {
  const { maxKeystrokes, maxMouseScrolls, maxMouseClicks } =
    getMaxValues(minutes);

  const normalizedKeyStrokes =
    (keyStrokes - MIN_KEYSTROKES) / (maxKeystrokes - MIN_KEYSTROKES);
  const normalizedMouseScrolls =
    (mouseScrolls - MIN_MOUSE_SCROLLS) / (maxMouseScrolls - MIN_MOUSE_SCROLLS);
  const normalizedMouseClicks =
    (mouseClicks - MIN_MOUSE_CLICKS) / (maxMouseClicks - MIN_MOUSE_CLICKS);

  const WEIGHT_KEYSTROKES = 1;
  const WEIGHT_SCROLLS = 0.5;
  const WEIGHT_CLICKS = 1.5;

  const weightedProductivity =
    (normalizedKeyStrokes * WEIGHT_KEYSTROKES +
      normalizedMouseScrolls * WEIGHT_SCROLLS +
      normalizedMouseClicks * WEIGHT_CLICKS) /
    (WEIGHT_KEYSTROKES + WEIGHT_SCROLLS + WEIGHT_CLICKS);

  const productivityPercentage = Math.min(
    Math.round(weightedProductivity * 100),
    100
  );

  return productivityPercentage;
}

export function calculateAverageProductivity(
  totalMouseClicks: number,
  totalKeyStrokes: number,
  totalMouseScrolls: number
) {
  const sum = totalMouseClicks + totalKeyStrokes + totalMouseScrolls;
  const average = sum / 3;

  return parseFloat(average.toFixed(2));
}
const permissionsByRole: RolePermissions = {
  CA: {
    teamMember: { read: true, write: true, acceptDecline: false },
    timeActivity: { read: true, write: false, acceptDecline: false },
    regulariseRequest: { read: true, write: true, acceptDecline: true },
    project: { read: true, write: true, acceptDecline: false },
    screenShot: { read: true, write: true, acceptDecline: false },
    report: { read: true, write: true, acceptDecline: false },
    leaveRequest: { read: true, write: false, acceptDecline: true },
    attendance: { read: true, write: true, acceptDecline: false },
    holiday: { read: true, write: true, acceptDecline: false },
  },
  HR: {
    teamMember: { read: true, write: true, acceptDecline: false },
    timeActivity: { read: true, write: false, acceptDecline: false },
    regulariseRequest: { read: true, write: true, acceptDecline: false },
    project: { read: true, write: false, acceptDecline: false },
    screenShot: { read: true, write: true, acceptDecline: false },
    report: { read: true, write: true, acceptDecline: false },
    leaveRequest: { read: true, write: true, acceptDecline: false },
    attendance: { read: true, write: true, acceptDecline: false },
    holiday: { read: true, write: true, acceptDecline: false },
  },
  EMP: {
    teamMember: { read: false, write: false, acceptDecline: false },
    timeActivity: { read: false, write: false, acceptDecline: false },
    regulariseRequest: { read: false, write: true, acceptDecline: false },
    project: { read: false, write: false, acceptDecline: false },
    screenShot: { read: false, write: false, acceptDecline: false },
    report: { read: false, write: true, acceptDecline: false },
    leaveRequest: { read: true, write: true, acceptDecline: false },
    attendance: { read: false, write: false, acceptDecline: false },
    holiday: { read: true, write: false, acceptDecline: false },
  },
  PM: {
    teamMember: { read: true, write: false, acceptDecline: false },
    timeActivity: { read: true, write: false, acceptDecline: false },
    regulariseRequest: { read: true, write: true, acceptDecline: true },
    project: { read: true, write: true, acceptDecline: false },
    screenShot: { read: true, write: true, acceptDecline: false },
    report: { read: true, write: true, acceptDecline: false },
    leaveRequest: { read: true, write: false, acceptDecline: true },
    attendance: { read: true, write: true, acceptDecline: false },
    holiday: { read: true, write: false, acceptDecline: false },
  },
};

// Function to check permissions
export const hasPermission = (
  role: UsersRole,
  module: ModuleName,
  action: Action | Action[]
): boolean => {
  const actions = Array.isArray(action) ? action : [action];
  return actions.every(
    (act) => permissionsByRole[role]?.[module]?.[act] ?? false
  );
};

// generateCalendarDays
export const generateCalendarDays = (year: number, month: number) => {
  const startDate = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = startDate.getDay();
  const calendarDays = Array(startDay).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(year, month, day));
  }

  return calendarDays;
};

// getEventClass
export const getEventClass = (status: string): string => {
  switch (status) {
    case 'Present':
      return 'attendance-present';
    case 'Absent':
      return 'attendance-absent';
    case 'Leave':
      return 'attendance-leave';
    case 'Week-Off':
      return 'attendance-weekOff';
    default:
      return '';
  }
};

export const fetchDataBasedOnFilter = (
  filter: 'weekly' | 'monthly' | 'yearly'
) => {
  switch (filter) {
    case 'weekly':
      return {};
    case 'monthly':
      return {};
    case 'yearly':
      return {};
    default:
      return {};
  }
};
export const leaveGetStatusClass = (status: any) => {
  switch (status) {
    case 'approved':
      return styles.LeaveRecordStatusApproved;
    case 'pending':
      return styles.LeaveRecordStatusPending;
    case 'cancelled':
      return styles.LeaveRecordStatusNotApproved;
    case 'rejected':
      return styles.LeaveRecordStatusRejected;
    default:
      return '';
  }
};

export const leaveGetCountForPeriod = (period: string): number => {
  switch (period) {
    case 'second-half':
      return 0.5;
    case 'first-half':
      return 0.5;
    case 'full-day':
      return 1;
    default:
      return 1;
  }
};

export const getLeaveTypeLabel = (leaveType: LeaveRecordType): string =>
  leaveTypeMapping[leaveType] || leaveType;

export const getLeaveTypeStatus = (leaveType: LeaveRecordStatus): string =>
  leaveTypeStatus[leaveType] || leaveType;
export const timeStringToMinutes = (timeString: any) => {
  const [hours = 0, minutes = 0] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

export const calculateTotalDuration = (
  date: string | number | Date,
  startTime: any,
  endTime: any
) => {
  const startDate = new Date(date);
  const startTimeInMinutes = timeStringToMinutes(startTime);
  const endTimeInMinutes = timeStringToMinutes(endTime);

  startDate.setMinutes(startDate.getMinutes() + startTimeInMinutes);
  const endDate = new Date(startDate);
  endDate.setMinutes(
    startDate.getMinutes() + (endTimeInMinutes - startTimeInMinutes)
  );

  return (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
};

export const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const getDateRangeArray = (startDate: Date, endDate: Date) => {
  const dateArray = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateArray;
};

export const formatOptions: OptionType[] = [
  { value: 'approved', label: 'Approved' },
  { value: 'pending', label: 'Pending' },
  { value: 'rejected', label: 'Rejected' },
];

export const fetchDataBasedOnFilterCustomData = (
  filter: 'Custom' | 'Monthly' | 'Weekly'
) => {
  if (filter === 'Custom') {
    return {};
  } else if (filter === 'Monthly') {
    return {};
  } else if (filter === 'Weekly') {
    return {};
  } else {
    return {};
  }
};

export const filterOptionsCustomData = [
  { value: 'Weekly', label: 'Select Week' },
  { value: 'Monthly', label: 'Select Month' },
  { value: 'Yearly', label: 'Select Year' },
  { value: 'Custom', label: 'Select Custom Data' },
];
export const ProfileSessionAction = (status: any) => {
  switch (status) {
    case 'Active':
      return styles.LeaveRecordStatusApproved;
    case 'Deactive':
      return styles.LeaveRecordStatusNotApproved;
    default:
      return '';
  }
};
export const getProfileSeesionStatus = (
  SessionType: ProfileSessionStatus
): string => ProfileSessionStatustype[SessionType] || SessionType;

export const MIN_DATE = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
export const MAX_DATE = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

export const getPreviosSevenDate = (): string[] => {
  const today = new Date();
  const last7Days = [];

  const dayOfWeek = today.getDay();
  const prevMonday = new Date(today);
  prevMonday.setDate(today.getDate() - ((dayOfWeek + 6) % 7) - 7);

  const prevSunday = new Date(prevMonday);
  prevSunday.setDate(prevMonday.getDate() + 6);

  last7Days.push(prevMonday.toISOString().split('T')[0]);
  last7Days.push(prevSunday.toISOString().split('T')[0]);

  return last7Days;
};
// Your existing isWeekend function
export const isWeekend = (date: any) => {
  const parsedDate = new Date(date);
  const day = parsedDate.getDay();
  return day === 6 || day === 0;
};

// Function to show a confirmation alert for approving or rejecting an action
export const showConfirmationAlert = async (action: string) => {
  const options: SweetAlertOptions = {
    icon: 'warning',
    title: `Are you sure you want to ${action}?`,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    customClass: {
      popup: 'sweet-alerts',
      confirmButton: 'btn btn-danger',
    },
  };
  return Swal.fire(options);
};

export const showRejectReasonAlert = async (): Promise<any> => {
  const options: SweetAlertOptions = {
    icon: 'warning',
    title: 'Reject Request',
    text: 'Please provide a reason for rejection:',
    input: 'textarea',
    inputPlaceholder: 'Enter reason...',
    showCancelButton: true,
    confirmButtonText: 'Reject',
    cancelButtonText: 'Cancel',
    customClass: {
      popup: 'sweet-alerts',
      confirmButton: 'btn btn-danger',
    },
    inputValidator: (value) => {
      if (!value) {
        return 'You need to enter a reason!';
      }
    },
  };

  return await Swal.fire(options);
};

export const formatDateRange = (dates: Date[]): DateRange => {
  return [
    dates[0] ? format(dates[0], 'yyyy-MM-dd') : '',
    dates[1] ? format(dates[1], 'yyyy-MM-dd') : '',
  ];
};
export const leaveDateFormat = (date: string | number | Date) => {
  const dateValue = new Date(date);
  return format(dateValue, 'MM-dd-yyyy');
};

// Helper function to check if an item is valid based on its period
export const isValidLeavePeriod = (item: {
  count?: number;
  date: any;
  period: any;
}) => {
  return (
    item?.period === 'full-day' ||
    (item?.period === 'half-day' && !isWeekend(item.date))
  );
};

// Helper function to check if the date is in the existing leave filter
export const isDateInExistingLeaves = (
  date: string | number | Date,
  existingLeaves: string | string[]
) => {
  return existingLeaves.includes(leaveDateFormat(date));
};

export const getStatusClass = (status: string): string => {
  const statusClassMap: { [key: string]: string } = {
    Complete: 'bg-success',
    Pending: 'bg-secondary',
    'In Progress': 'bg-info',
    Canceled: 'bg-danger',
  };

  return statusClassMap[status] || 'bg-gray-200';
};

export const getCategoryColor = (category: string): string => {
  const categoryColorMap: { [key: string]: string } = {
    Digital: 'text-primary',
    Fashion: 'text-warning',
    Accessories: 'text-danger',
  };

  return categoryColorMap[category] || 'text-gray-500';
};

export const getButtonClassName = (
  filterValue: string,
  currentValue: string,
  baseClass: string,
  activeClass: string,
  inactiveClass: string
): string => {
  return `${baseClass} ${
    filterValue === currentValue ? activeClass : inactiveClass
  }`;
};

export const SettingModule = {
  LEAVE: 'Leave',
  PRODUCTIVITY: 'Productivity',
  ATTENDANCE: 'Attendance',
  JIRASETUP: 'Jira setup',
};
