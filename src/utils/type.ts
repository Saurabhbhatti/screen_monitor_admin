import { ToastContent } from 'react-toastify';
import {
  ADD_COMPANY_BEGIN,
  ADD_PROJECT_BEGIN,
  APPLY_TIME_REQUEST_BEGIN,
  APPROVE_LEAVE_REQUEST,
  CANCEL_LEAVE_REQUEST,
  CHANGE_PASSWORD_BEGIN,
  CHANGE_TIME_REQUEST_STATUS_BEGIN,
  DELETE_PROJECT_BEGIN,
  FETCH_DSR_DATA_FAILURE,
  FETCH_DSR_DATA_REQUEST,
  FETCH_DSR_DATA_SUCCESS,
  FETCH_SCREENSHOT_DATA_SUCCESS,
  FORGOT_PASSWORD_BEGIN,
  GET_ATTENDANCE_BEGIN,
  GET_COMPANY_BEGIN,
  GET_PROJECT_BEGIN,
  GET_TIME_ACTIVITY_BEGIN,
  GET_TIME_REQUEST_BEGIN,
  LOGIN_REQUEST_BEGIN,
  REJECT_LEAVE_REQUEST,
  UPDATE_COMPANY_BEGIN,
  UPDATE_PROJECT_BEGIN,
  UPDATE_PROJECT_STATUS_BEGIN,
} from '../redux/constant';
import { Key } from 'readline';
import { ReactNode } from 'react';

export type LoginRequestAction = {
  type: typeof LOGIN_REQUEST_BEGIN;
  payload: any;
};

export type LoginApiResponse = {
  data: {
    data: any;
    userId: number;
    username: string;
    token: string;
  };
};
export type ForgotRequestAction = {
  type: typeof FORGOT_PASSWORD_BEGIN;
  payload: any;
};

export type ForgotApiResponse = {
  data: {
    message: ToastContent<unknown>;
    data: any;
    userId: number;
    username: string;
    token: string;
  };
};

export type ChangePasswordRequestAction = {
  type: typeof CHANGE_PASSWORD_BEGIN;
  payload: any;
};

export type ChangePassowrdApiResponse = {
  data: {
    message: ToastContent<unknown>;
    data: any;
    userId: number;
    username: string;
    token: string;
  };
};

export type AddMemberPopupProps = {
  onClose: () => void;
};

export type UserType = {
  createdAt: string;
  designation: string;
  email: string;
  empCode: string;
  firstName: string;
  isNewUser: boolean;
  lastName: string;
  phone: string;
  projects: ProjectOption[];
  status: string;
  _id: string;
};

export type User = {
  designation: string;
  companyId: string;
  companyName: string;
  totalHoursTracked: string;
  dailyTotalWorkingHour: string;
  email: string;
  firstName: string;
  isNewUser: boolean;
  lastName: string;
  empCode: string;
  phone: string;
  requiresPasswordReset: boolean;
  role: Role;
  status: string;
  token: string;
  weeklyTotalWorkingHour: string;
  _id: string;
};

export type UserResponse = {
  data: User;
};

export type RootState = {
  auth: {
    loading: boolean;
    isSuccess: boolean;
    isChangePassword: boolean;
    isForgotPasswordSuccess: boolean;
    user: UserResponse;
  };
};
export interface LeaveRootState {
  leaveHistory: LeaveHistoryState;
}

export type ModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  loading: boolean;
};
export type FilterByStatus = {
  value: string;
  label: string;
};

export type CustomSearchInputProps = {
  value: string;
  onChange: any;
  onClear: () => void;
  placeholder?: string;
  className: string;
};

export type Column = {
  accessor: string;
  title: string;
  render?: (row: any) => JSX.Element;
};

export type CustomTableProps = {
  data: any[];
  columns: Column[];
  totalRecords: number;
  pageSizeOptions?: number[];
  noRecordsText?: string;
  title?: string;
};
export type SelectDropdownOption = {
  value: string;
  label: string;
};

export type DatePickerProps = {
  value: Date | null | undefined;
  onChange: (
    dates: Date[] | Date | null,
    dateStr: string,
    instance: any
  ) => void;
};

export type AlertDefaultProps = {
  message: string;
};

export type ToastMessageProps = {
  message: string;
  position?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'center'
    | 'center-start'
    | 'center-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end';
};
export type TeamMemberItem = {
  member: string;
  memberType: string;
  companyName: string;
  mobileNumber: string;
  project: string;
  status: string;
};

export type CompanyRequestAction = {
  type: typeof GET_COMPANY_BEGIN;
  payload: any;
};

export type AddCompanyRequestAction = {
  type: typeof ADD_COMPANY_BEGIN;
  payload: any;
};

export type UpdateCompanyRequestAction = {
  type: typeof UPDATE_COMPANY_BEGIN;
  payload: any;
};

export type Company = {
  _id: string;
  userId: string;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  companyWebsite: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type CompanyApiResponse = {
  status: boolean;
  message: string;
  total: number;
  data: any;
};

export type ProjectRequestAction = {
  type: typeof GET_PROJECT_BEGIN;
  payload: any;
};

export type AddProjectRequestAction = {
  type: typeof ADD_PROJECT_BEGIN;
  payload: any;
};

export type DeleteProjectRequestAction = {
  type: typeof DELETE_PROJECT_BEGIN;
  payload: any;
};

export type UpdateProjectRequestAction = {
  type: typeof UPDATE_PROJECT_BEGIN;
  payload: any;
};

export type UpdateProjectStatusRequestAction = {
  type: typeof UPDATE_PROJECT_STATUS_BEGIN;
  payload: any;
};

export type ProjectApiResponse = {
  data: {
    status: any;
    message: string;
    data: any;
    total: number;
  };
};

export type MemberOptionType = {
  firstName: string;
  lastName: string;
  _id: string;
};

export type AllUserType = {
  data: MemberOptionType[];
};

export type UserState = {
  auth?: any;
  userData?: any;
  userRoleData?: any;
  error?: string | null;
  loading?: boolean;
  isUserModifyLoading?: boolean;
  isSuccess?: boolean;
  allUserData?: any;
  leaveHistory?: LeaveHistoryState;
};

export type TeamMember = {
  user: UserState;
};

export type ScreenShot = {
  loading: boolean;
  screenshots: ScreenShotResponse;
};

export type Member = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type Project = {
  _id: string;
  totalWorkingHours: number;
  status: string;
  projectName: string;
  createdAt: string;
  isScreenshot: boolean;
  members: Member[];
  notes: string;
};

type ProjectData = {
  data: ProjectOption[];
  projects: any;
};

export type AllProjectData = {
  _id: string;
  projectName: string;
  isScreenshot: boolean;
  members: MemberOption[];
};

export type ProjectState = {
  projectData: any;
  allProjectData: any;
  error: string | null;
  loading: boolean;
  isModifyingProject: boolean;
  isSuccess: boolean;
};

export type ProjectOption = {
  projectName: string;
  _id: string;
};

export type MemberOption = {
  firstName?: string;
  _id?: string;
  values?: string;
};

export type ProjectAction = {
  type: string;
  payload?: any;
};

export type AddEditProjectProps = {
  isProjectModal: boolean;
  setIsProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: any;
  projectData: any;
  onUpdate: any;
  isLoadingAddProject: boolean;
  isLoadingUpdateProject: boolean;
};

export type SwitchComponentProps = {
  value: boolean;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
};

export type ImageComponentProps = {
  height?: number;
  width?: number;
  children?: any;
  className?: any;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
};

export type TableHead = {
  label: string;
  key: string;
};

type TableData = {
  projectName?: string;
  isScreenshot?: boolean;
  [key: string]: any;
  _id: string;
  firstName: string;
  designation: string;
  projects: string[];
  status: boolean;
};

export type SelectedDate = {
  startDate: string;
  endDate: string;
};

export type CustomTableComponentProps = {
  userRoleData?: any;
  tableHead: TableHead[];
  tableHeadeBase?: TableHead[];
  companyData?: any;
  title?: string;
  prev: () => void;
  loading?: boolean;
  next: () => void;
  handleAddProject?: any;
  activePage: number;
  totalPageCount: number;
  onPageClick: (page: number) => void;
  showDeleteAlert?: any;
  handleEditCompany?: any;
  setActivePage?: any;
  isTableLoading?: any;
  handleStatusChange?: any;
  selectedDate?: SelectedDate;
  renderActions?: (row: any) => React.ReactNode;
  userData?: {
    users: any;
    company: Array<{
      id: string;
      companyName: string;
      companyEmail: string;
      companyPhone: string;
      companyAddress: string;
      companyWebsite: string;
    }>;
    total: number | undefined;
  };
  setAddProjectModal?: any; // we can't able to pass setstate from function so i will refactor component code and update this type
  handleEditUser?: (user: UserType) => void;
  showAlert?: (duration: number, user: UserType) => void;
};

export type TeamMemberGridCardProps = {
  userData: {
    total: number;
    users: Array<{
      _id: string;
      firstName: string;
      memberType: string;
      projects: Array<string>;
      project: string;
      phone: string;
    }>;
  };
  activePage: number;
  totalPageCount: number;
  setAddProjectModal: (value: boolean) => void;
  handleEditUser: (user: any) => void;
  showAlert: (duration: number, user: any) => void;
  prev: () => void;
  next: () => void;
  handleAddProject?: any;
  onPageClick: (page: number) => void;
  setActivePage: (page: number) => void;
  isTableLoading: boolean;
};

export type TableDataType = {
  total: number;
  status: boolean;
  message: string;
  data: TimeActivityRes;
};

export type TimeActivityTable = {
  total: number;
  data: TimeActivityTableType[];
};

export type TimeActivityTableProps = {
  tableHeader: TimeActivities[];
  tableData: TimeActivityTable;
  setActivePage: (page: number) => void;
  onPageClick: (page: number) => void;
  prev: () => void;
  next: () => void;
  activePage: number;
  totalPageCount: number;
  loading: boolean;
  handleTimeActivity: (activity: TimeActivities, _id: string) => void;
};

export type ProjectMemberModalProps = {
  setAddMemberModal: (value: boolean) => void;
  addMemberModal: boolean;
  memberOptions: { label: string; value: string }[];
  selectedEditMember: { label: string; value: string }[];
  handleEditSelectedMemberChange: (selected: any) => void;
  isModifyingProject: boolean;
  handleEditMember: () => void;
  customMemberStyles: any;
};

export type AddUpdateProjectModalProps = {
  isDisable: boolean;
  addProjectModal: boolean;
  setAddProjectModal: (value: boolean) => void;
  projectUpdateData: Project;
  formik: any;
  getFieldProps: (nameOrOptions: any) => any;
  values: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  memberOptions: any[];
  selectedAddMembers: any[];
  customStyles: any;
  handleAddSelectedMemberChange: (selectedMembers: any) => void;
  isModifyingProject: boolean;
};

export type AddEditMemberModalProps = {
  isDisable: boolean;
  addContactModal: boolean;
  projectOption: { value: string; label: string }[];
  userRoletOption: { value: string; label: string }[];
  setAddContactModal: (open: boolean) => void;
  userUpdateData?: any;
  addUserLoading: boolean;
  updateUserLoading: boolean;
  handleProjectChange: (selectedOptions: OptionType[]) => void;
  handleUserRoleChange: (selectedOptions: OptionType[]) => void;
  selectedProjectOption?: OptionType[];
  selectedUserRoleOption: OptionType[];
  formik: any;
};

export type ProjectTableProps = {
  loading: boolean;
  projectData: {
    data: Project[];
    total: number;
  };
  totalPageCount: number;
  activePage: number;
  setActivePage: (page: number) => void;
  onPageClick: (page: number) => void;
  addMember: (project: Project) => void;
  handleScreenshortChange: (project: Project, checked: boolean) => void;
  handleStatusChange: (project: Project, checked: boolean) => void;
  handleEditProject: (projects: Projects) => void;
  showDeleteAlert: (id: number, project: Project) => void;
  prev: () => void;
  next: () => void;
};
export type CompOffTable = {
  total: number;
  data: TimeActivityTableType[];
};
export type CompOffTableProps = {
  loading: boolean;
  leaveTotalPages: number;
  leaveActivePage: number;
  tableData: CompOffTable;
  prev: () => void;
  next: () => void;
  setLeaveActivePage: (page: number | ((prevPage: number) => number)) => void;
  userRole: string;
  totalPageCount: number;
  onPageClick: (page: number) => void;
  leaveIsSelf: boolean;
};

export type AttendanceTableProps = {
  tableHeader: any[];
  tableData: TimeActivityTable;
  setActivePage: (page: number) => void;
  onPageClick: (page: number) => void;
  prev: () => void;
  next: () => void;
  activePage: number;
  totalPageCount: number;
  loading: boolean;
  handleTimeActivity: (activity: TimeActivities, _id: string) => void;
};

export type AddProjectModalProps = {
  addProjectModal: boolean;
  isUserModifyLoading: boolean;
  handleProjectSave: () => void;
  setAddProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  projectOption: { label: string; value: string }[];
  customMemberStyles: any;
  selectedProject: { label: string; value: string }[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type TimeLineRootState = {
  data: TimeLineType[];
};

export type TimeLineModalProps = {
  openTimeActivityModal: boolean;
  setTimeActivityModal: React.Dispatch<React.SetStateAction<boolean>>;
  timeLineData: TimeLineType[];
  timeLineLoading: boolean;
  dsrData: DSR[];
  timeLineDate: string;
};

export type OptionType = {
  label: string;
  value: string;
};

export type IsSelfSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export type UserOptionType = {
  _id: string;
};

export type CustomSelectProps = {
  onClick?: (value: string | number) => void;
  label: string;
  value: any;
  onChange: any;
  options: OptionType[];
  className?: string;
  disabled?: boolean;
  defaultValue?: string;
};

export type TransitionComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export type EventParams = {
  id: number | null;
  title: string;
  start: string;
  end: string;
  description: string;
  type: string;
};

export type CompanyModule = {
  value: string;
  label: string;
};

export type CustomTextInputProps = {
  name: string;
  className?: string;
  labelProps?: object;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  type?: string;
  labelVisibility?: 'visible' | 'hidden';
  icon?: React.ReactNode;
};

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  label?: string;
  variant?: string;
};

export type SearchSelectProps = {
  placeholder: string;
  value: any;
  options: any[];
  className?: string;
  isSearchable?: boolean;
  isMulti?: boolean;
  onChange: (selectedOption: any) => void; // This is component props so we will check type later for this
  styles?: any;
  isDisabled?: boolean;
  isClearable?: boolean;
};
export interface SearchProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type CustomSwitchProps = {
  id: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type CompanyRootState = {
  company: {
    companyData: any;
    loading: boolean;
    isSuccess: boolean;
    isModifyCompanyLoading: boolean;
  };
};

export type CompanyState = {
  companyData: any;
  error: string | null;
  loading: boolean;
  isSuccess: boolean;
  isModifyCompanyLoading: boolean;
};

export type CompanyAction = {
  type: string;
  payload?: any;
};

export type AddEditCompany = {
  isOpen: boolean;
  onClose: () => void;
  companyUpdateData: any;
  isModifyLoading: boolean;
  userRoletOption: { value: string; label: string }[];
  onSubmit: (values: Company) => void;
};

export type UserAction = {
  type: string;
  payload?: any;
};

export type UserApiResponse = {
  status: boolean;
  message: string;
  total: number;
  data: any;
};

export type UserRequestAction = {
  type: string;
  payload: any; //I need to refactor code for this so will check later
};

export type Role = 'SA' | 'CA' | 'EMP' | 'HR' | 'PM';
export type Path =
  | '/company'
  | '/dashboard'
  | '/leave'
  | '/team-member'
  | '/time-activity'
  | '/projects'
  | '/screenshot'
  | '/dsr'
  | '/calendar'
  | '/profile'
  | '/change-password'
  | '/timeregulate'
  | '/attendance'
  | '/compoff'
  | '/holiday'
  | '/settings'
  | '/leavehistory';

export type RoleAccess = {
  [key in Role]: Path[];
};

type ActionPermission = {
  read: boolean;
  write: boolean;
  acceptDecline: boolean;
};

// Define available modules
export type ModuleName =
  | 'teamMember'
  | 'timeActivity'
  | 'project'
  | 'screenShot'
  | 'report'
  | 'leaveRequest'
  | 'regulariseRequest'
  | 'attendance'
  | 'holiday';

export type UsersRole = string;

export type Action = 'read' | 'write' | 'acceptDecline';

type ModulePermissions = Record<ModuleName, ActionPermission>;

export type RolePermissions = Record<UsersRole, ModulePermissions>;

export type Projects = {
  projects: ProjectState;
};

export type DeleteProjectType = {
  id: string;
};

export type AddEditProject = {
  projectName: string;
  memberIds: OptionType[];
  projectId?: string[];
  isScreenshot: boolean;
  notes: string;
  isMemberIdsChange?: boolean;
};
export type UserIntialState = {
  firstName: string;
  lastName: string;
  designation: string;
  email: string;
  empCode: string;
  role?: string;
  phone: string;
  projects: string[] | string;
};

export type ScreenshotApiResponse = {
  status: boolean;
  message: string;
  total: number;
  data: ScreenShotResponse;
};

export type ScreenshotRequestAction = {
  type: typeof FETCH_SCREENSHOT_DATA_SUCCESS;
  payload: ScreenShotPayload;
};

export type ScreenShotState = {
  screenshots: any;
  error: any;
  loading: boolean;
};

export type DeleteUserType = {
  id: string;
};

export type AddEditUserPayload = {
  firstName?: string;
  lastName?: string;
  projectIds?: string[];
  designation?: string;
  email?: string;
  phone?: string;
  userId?: string;
  userStatus?: string;
};

export type UserPayload = {
  page?: number;
  rowsPerPage?: number;
  searchTerm?: string;
  status?: string;
};

export type Application = {
  name: string;
  description: string;
  _id: string;
};

export type Activity = {
  applications: Application[];
  keyStrokes: number;
  mouseClicks: number;
  mouseScrolls: number;
  time: string;
  _id: string;
};

export type ScreenshotDetail = {
  activities: Activity[];
  createdAt: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
  projectId: string;
  projectName: string;
  totalKeyStrokes?: number;
  totalMinutes?: number;
  totalMouseClicks?: number;
  totalMouseScrolls?: number;
  _id?: string;
};

export type ScreenShotRes = {
  data: ScreenshotDetail[];
  message: string;
  status: boolean;
};

export type ScreenShotResponse = {
  screenshots: any;
  _id: Key | null | undefined;
  sort(arg0: (a: any, b: any) => number): unknown;
  count: number;
  time: string;
  loading: boolean;
  status: boolean;
};

export type ScreenShotAction = {
  type: string;
  payload?: ScreenShotPayload;
};

export type ScreenShotPayload = {
  userId: string | undefined;
  date: string;
  projectId: string | undefined;
};

export type TimeActivityType = {
  hoursTracked: string;
  type: string;
};

export type TimeActivities = {
  attendance: any;
  dailyHoursTracked: string;
  date: string;
  types: TimeActivityType[];
};

export type Attendance = {
  attendance: string;
  dailyHoursTracked: string;
  date: string;
  types: TimeActivityType[];
};

export type TimeActivityTableType = {
  total?: number;
  firstName: string;
  lastName: string;
  totalHoursTracked: string;
  totalLeaveDays?: number;
  _id: string;
  activities: TimeActivities[];
};

export type TimeLineActivities = {
  checkin?: string;
  checkout?: string;
  description?: string | undefined;
  hoursTracked?: string;
  isAutoCheckout: boolean;
  projectName: string;
  type: string;
};

export type TimeLineType = {
  firstCheckin?: string;
  firstName?: string;
  lastCheckout?: string;
  lastName?: string;
  totalActivityHours?: string | undefined;
  totalHoursTracked?: string | undefined;
  totalMeetingHours?: string | undefined;
  totalManualHours?: string | undefined;
  totalWorkHours?: string;
  userId?: string;
  activities: TimeLineActivities[];
  timelineActivity: TimeLineType[];
};

export type TimeActivityResType = {
  data: TimeActivityTableType[];
  message: string;
  total: number;
  status: boolean;
};

export type membersData = {
  firstName: string;
  lastName: string;
  userId: string;
  descriptions: any;
};

export type DSR = {
  length: number;
  date: string;
  members: membersData[];
};

export type DsrApiResponse = {
  status: boolean;
  ok: string;
  blob: any;
  data: {
    data: DsrData[];
  };
  error?: string;
};

export type DsrRequestAction = {
  type: string;
  payload: any;
};

export type DsrPayload = {
  startTime: number;
  endTime: number;
  fileFormat?: string;
  isFile?: string;
  memberId?: string[];
};

export interface DsrQueryParams {
  startTime: number;
  endTime: number;
  fileFormat: string;
  isFile: string;
  memberId?: string[];
}

export type DsrAction =
  | { type: typeof FETCH_DSR_DATA_REQUEST }
  | { type: typeof FETCH_DSR_DATA_SUCCESS; payload: DsrData[] }
  | { type: typeof FETCH_DSR_DATA_FAILURE; payload: string };

export type DsrState = {
  dsrs: DsrData[];
  loading: boolean;
  error: string | null;
  isFile?: boolean;
  format?: string;
};

export type StateDsr = {
  dsrs: Array<ReportItem>;
  loading: boolean;
  error: string | null;
};

export type RootStateDsr = {
  dsr: DsrState;
};

export type ReportItem = {
  id: string;
  date: string;
  dsrTask: string;
  totalHours: string;
};

export type FetchDsrDataPayload = {
  startTime: number;
  endTime: number;
  memberId: string[];
};

export type Dsr = {
  description: string;
  leave: string;
};

export type DsrActivity = {
  leave: any;
  date: string;
  dailyHoursTracked: number;
  dsr: Dsr;
};

export type DsrData = {
  memberId: string[];
  activities: DsrActivity[];
  date: string;
  totalHours: number;
  leave: string;
};

export type ReportState = {
  reportData: {
    data: ReportDataItem[];
  };
  loading: boolean;
  error: string | null;
};

export type ReportDataItem = {
  date: string;
  day: string;
  dsrTask: string;
  totalHours: number;
  leave: string;
};

export type FileFormat = {
  value: string;
  label: string;
};

export type ControlsProps = {
  userRole: string;
  memberOptions: OptionType[];
  handleMemberChange: (memberOption: OptionType | null) => void;
  selectedMember: OptionType | null;
  startTime: number;
  endTime: number;
  dateRange: Date[];
  isFile: boolean;
  setDateRange: (dates: Date[]) => void;
  fileFormat: FileFormat;
  onFormatChange: (selectedFormat: FileFormat) => void;
};

export interface ReportListProps {
  userRole: string;
  selectedMember: OptionType | null;
  data: DsrData[];
  expandedItem: number | null;
  onToggleExpand: (index: number) => void;
}

export type TimeLineResType = {
  data: {
    timelineActivity: TimeLineType[];
    dsr: DSR[];
  };
  message: string;
  total: number;
  status: boolean;
};

export type TimeActivityState = {
  timeActivityData: TimeActivityResType;
  loading: boolean;
  timeLineData: TimeLineResType;
  timeLineLoading: boolean;
};

export type TimeActivityRootState = {
  timeActivity: TimeActivityState;
};

export type TimeActivityRes = {
  total: number;
  length: number;
  map(
    arg0: (user: TimeActivityRes) => import('react/jsx-runtime').JSX.Element
  ): unknown;
  forEach(arg0: (user: TimeActivityRes) => void): unknown;
  timeActivityData: TimeActivities[];
  firstName: string;
  lastName: string;
  totalHoursTracked: string;
  _id: string;
  activities: TimeActivities[];
  timeLineData: TimeLineType[];
  loading: boolean;
  timeLineLoading: boolean;
  data: TimeActivities[];
  status: boolean;
};

export type TimeActivity = {
  timeLineData: TimeLineType[];
  timeLineLoading: boolean;
  timeActivityData: any[];
  error: string | null;
  loading: boolean;
};

export type AttendaceActivity = {
  timeLineData: TimeLineType[];
  timeLineLoading: boolean;
  attendaceData: any[];
  error: string | null;
  loading: boolean;
};

export type AttendanceReducer = {
  timeLineData: TimeLineType[];
  timeLineLoading: boolean;
  attendanceData: TimeActivityRes[];
  error: string | null;
  loading: boolean;
};

export type TimeActivityRequestAction = {
  type: typeof GET_TIME_ACTIVITY_BEGIN;
  payload: TimeActivityPayload;
};

export type AttendanceRequestAction = {
  type: typeof GET_ATTENDANCE_BEGIN;
  payload: AttendancePayload;
};

export type TimeActivityApiResponse = {
  status: boolean;
  message: string;
  total: number;
  data: TimeActivityRes;
};

export type AttendanceApiResponse = {
  status: boolean;
  message: string;
  total: number;
  data: TimeActivityRes;
};

export type TimeActivityData = {
  status: boolean;
  message: string;
  total: number;
  data: User[];
};

export type TableHeaderProps = {
  activities: Activity[];
};

export type TableBodyProps = {
  users: User[];
  columnTotals: number[];
  totalWorkData: number;
};

export type TimeActivityPayload = {
  page?: number;
  rowsPerPage?: number;
  startTime?: string | undefined | number;
  endTime?: string | undefined | number;
  searchText?: string;
  projectId?: string[];
  memberId?: string[];
};

interface Attendancedata {
  date: string;
  activities: string[];
}

interface TimeLineData {
  timelineActivity: any[];
  dsr: any;
}

export type AttendanceState = {
  attendance: any;
  attendanceData: {
    data: Attendancedata[];
    total: number;
  };
  loading: boolean;
  timeLineData: {
    data: TimeLineData;
  };
  timeLineLoading: boolean;
};

export type AttendancePayload = {
  page?: number;
  rowsPerPage?: number;
  startTime?: string | undefined | number;
  endTime?: string | undefined | number;
  searchText?: string;
  projectId?: string[];
  memberId?: string[];
  exportExcel?: string;
  selectedMemberId?: string | any[];
};

export type TimeLinePaylod = {
  startTime: string | number;
  endTime: string | number;
  userId: string;
};

export type TimeLineApiResponse = {
  status: boolean;
  message: string;
  total: number;
  data: TimeLineType[];
};

export type TimeLineRequestAction = {
  type: typeof GET_TIME_ACTIVITY_BEGIN;
  payload: TimeLinePaylod;
};

export type TimeActivityQueryParams = {
  offset?: number;
  limit?: number;
};

export type AttendanceQueryParams = {
  offset?: number;
  limit?: number;
};

export type DateRange = [string, string];

export type ChartComponentProps = {
  totalActivityMinutes: number;
  totalMeetingMinutes: number;
  totalWorkMinutes: number;
  totalManualMinutes: number;
};

export type RejectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
};

export type RejectionPopupProps = {
  isOpen: boolean;
  reason: string;
  onClose: () => void;
};

export type TimeRegulationRootState = {
  timeRequest: any;
};

export type TimeRegulatePayload = {
  page?: number;
  rowsPerPage?: number;
  status?: string;
  userFilterId?: string[];
  startDate?: string;
  endDate?: string;
  isSelf?: boolean;
};

interface TimeReqData {
  data: {
    userId: { firstName: string };
    applyDate: string;
    createdAt: string;
    timeSlot: string;
    projectId: { projectName: string };
    description: string;
    requestBy: { firstName: string };
  }[];
  total: number;
}

export type TimeRegulateTableProps = {
  tableHead: TableHead[];
  timeReqData: TimeReqData;
  userRole: string;
  onApprove: any;
  onReject: any;
  onCancel: any;
  loading: boolean;
  setActivePage: (page: number) => void;
  onPageClick: (page: number) => void;
  prev: () => void;
  next: () => void;
  activePage: number;
  totalPageCount: number;
};

export type GetTimeRequestAction = {
  type: typeof GET_TIME_REQUEST_BEGIN;
  payload: {
    page?: number;
    rowsPerPage?: number;
    userFilterId: string[] | undefined;
    status: string | undefined;
    startDate: any;
    endDate: any;
    isSelf: boolean;
  };
};

export type AddTimeRequestAction = {
  type: typeof APPLY_TIME_REQUEST_BEGIN;
  payload: {
    userId: string | undefined;
    projectId: string;
    applyDate: Date;
    startTime: number;
    endTime: number;
    description: string;
  };
};

export type ChangeStatusTimeRequestAction = {
  type: typeof CHANGE_TIME_REQUEST_STATUS_BEGIN;
  payload: {
    requestId: string;
    reason?: string;
    status: string;
  };
};

export type TimeRequest = {
  id: string;
  status: string;
};

export type TimeRegulationHeadProps = {
  userRole: string;
  handleSelfSwitch: () => void;
  isSelf: boolean;
  memberOptions: OptionType[];
  selectedMember: OptionType | null;
  handleMemberChange: any;
  statusFormat: OptionType | null;
  statusOptions: Array<{ label: string; value: string }>;
  onStatusChange: any;
  maxDate: string | Date;
  dateRange: Date[];
  setDateRange: (dates: Date[]) => void;
  handleButtonClick: any;
};

export type TimeRequestApiResponse = {
  data: {
    status: any;
    message: string;
    data: any;
    total: number;
  };
};

export type LeaveRequestApiResponse = {
  data: {
    status: any;
    message: string;
    data: any;
    total: number;
  };
};

export type CompOffApiResponse = {
  data: {
    status: any;
    message: string;
    data: any;
    total: number;
  };
};

export type ApplyTimeRequestPayload = {
  userId: string | undefined;
  projectId: string;
  applyDate: Date;
  startTime: number;
  endTime: number;
  description: string;
};

export type ApplyDate = {
  date: string | Date;
  period: string;
  count: number;
};

export type LeaveHeaderProps = {};

export type LeaveApplication = {
  leaveType: string;
  applyDate: ApplyDate[];
  leaveReason: string;
  leaveRemarks: string;
};
export interface LeaveDataPayload {
  leaveType: string;
  applyDate: { date: string; period: string; count: number }[];
  leaveReason: string;
  remarks: string;
}

export interface LeavePhase {
  phase: string;
  months: number;
  approved: number;
}

export interface LeaveBalanceProps {
  yearlyLeave: number;
  leavePhases: LeavePhase[];
}

export interface SmallLeaveBoxProps {
  used: number;
  total: number;
}
export interface Holiday {
  _id: string;
  date: string;
  day: string;
  name: string;
}

export type HolidayState = {
  holidayReducer: any;
};
export interface LeavePhase {
  phase: string;
  months: number;
  approved: number;
}

export interface EmployeeRowProps {
  name: string;
  leaveType: string;
  fromTo: string;
  days: number;
  status: string;
  statusColor: string;
  onInfoClick: () => void;
}
export interface LeaveSummaryBoxProps {
  title: string;
  count: number;
  description: string;
}

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (holiday: { date: string; name: string }) => void;
}
export interface LeaveInfoPopupProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}
export type LeaveRecordsPayload = {
  page?: any;
  status?: string;
  userFilterId?: string[];
  startDate?: string;
  endDate?: string;
  fileFormat?: string;
  isSelf?: boolean;
  limit?: number;
  offset?: any;
};

export type LeaveHistoryPayload = {
  userFilterId?: string[];
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
  isSelf?: boolean;
};

export type AttendanceData = {
  name: string;
  empCode: string;
  attendanceDetails: { date: string; status: string }[];
  totalPresent: number;
};
export interface LeaveRecord {
  id: string;
  employee: string;
  empCode: string;
  leaveType: string;
  period: string;
  numOfDays: number;
  status: string;
  statusText: string;
  avatar: string;
}

export interface LeaveRecordsState {
  loading: boolean;
  data: any;
  error: string | null;
  approvalError?: string | null;
  approvalLoading?: Boolean;
}

export interface LeaveHistoryState {
  loading: boolean;
  leaveReduxState: any;
  error: string | null;
  approvalError?: string | null;
  approvalLoading?: boolean;
}
export interface FetchLeaveRecordsResponse {
  data: LeaveRecord[];
}
export interface TimeRequestData {
  status?: string;
  userFilterId?: string | string[];
  startDate?: string;
  endDate?: string;
  isSelf?: boolean;
  limit?: number;
  offset?: number;
}

export type LeaveRecordType = 'PL' | 'CL' | 'UPL';
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}
export interface ApproveLeaveResponse {
  success: boolean;
  message: string;
}
export interface RejectLeaveResponse {
  success: boolean;
  message: string;
}
export interface CancelLeaveResponse {
  success: boolean;
  message: string;
}
export interface LeaveActionData {
  leaveId: string;
  userId: string;
  status?: string;
  comment?: string;
}
export interface compOffActionData {
  compoffId: string;
  eligibleCompoff: number;
  status?: string;
  comment?: string;
}
export const APPROVE_LEAVE_SUCCESS = 'APPROVE_LEAVE_SUCCESS';
export const APPROVE_LEAVE_FAILURE = 'APPROVE_LEAVE_FAILURE';
export const REJECT_LEAVE_SUCCESS = 'REJECT_LEAVE_SUCCESS';
export const REJECT_LEAVE_FAILURE = 'REJECT_LEAVE_FAILURE';
export const CANCEL_LEAVE_SUCCESS = 'CANCEL_LEAVE_SUCCESS';
export const CANCEL_LEAVE_FAILURE = 'CANCEL_LEAVE_FAILURE';

export interface ApproveLeaveRequestAction {
  type: typeof APPROVE_LEAVE_REQUEST;
}
export interface ApproveLeaveSuccessAction {
  type: typeof APPROVE_LEAVE_SUCCESS;
  payload: ApproveLeaveResponse;
}

export interface ApproveLeaveFailureAction {
  type: typeof APPROVE_LEAVE_FAILURE;
  payload: string;
}

export interface RejectLeaveRequestAction {
  type: typeof REJECT_LEAVE_REQUEST;
}
export interface RejectLeaveSuccessAction {
  type: typeof REJECT_LEAVE_SUCCESS;
  payload: RejectLeaveResponse;
}

export interface RejectLeaveFailureAction {
  type: typeof REJECT_LEAVE_FAILURE;
  payload: string;
}

export interface CancelLeaveRequestAction {
  type: typeof CANCEL_LEAVE_REQUEST;
}
export interface CancelLeaveSuccessAction {
  type: typeof CANCEL_LEAVE_SUCCESS;
  payload: CancelLeaveResponse;
}
export interface CancelLeaveFailureAction {
  type: typeof CANCEL_LEAVE_FAILURE;
  payload: string;
}

export type LeaveActionTypes =
  | ApproveLeaveRequestAction
  | ApproveLeaveSuccessAction
  | ApproveLeaveFailureAction
  | RejectLeaveRequestAction
  | RejectLeaveSuccessAction
  | RejectLeaveFailureAction
  | CancelLeaveRequestAction
  | CancelLeaveSuccessAction
  | CancelLeaveFailureAction;

export interface LeaveApprovalState {
  success: boolean;
  approveLoading: boolean;
  rejectLoading: boolean;
  cancelLoading: boolean;
  approvalData?: ApproveLeaveResponse | null;
  rejectionData?: RejectLeaveResponse | null;
  cancellationData?: CancelLeaveResponse | null;
  error?: string | null;
}
export interface LeavePotsAction<T = any> {
  type: string;
  payload: T;
}
export interface ApproveLeaveRequestPayload {
  leaveId: string;
  userId: string;
  status: string;
}
export interface RejectLeaveRequestPayload {
  leaveId: string;
  userId: string;
  status: string;
  comment?: string;
}
export interface CancelLeaveRequestPayload {
  leaveId: string;
  userId: string;
}
export interface ApproveLeaveRequestAction {
  type: typeof APPROVE_LEAVE_REQUEST;
  payload: ApproveLeaveRequestPayload;
}
export interface RejectLeaveRequestAction {
  type: typeof REJECT_LEAVE_REQUEST;
  payload: RejectLeaveRequestPayload;
}
export interface CancelLeaveRequestAction {
  type: typeof CANCEL_LEAVE_REQUEST;
  payload: CancelLeaveRequestPayload;
}
export type LeaveActionTypesPost =
  | ApproveLeaveRequestAction
  | RejectLeaveRequestAction
  | CancelLeaveRequestAction;

export interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}
export interface RejectLeavePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onReject: (comment: string) => void;
}

export type LeaveRecordStatus =
  | 'approved'
  | 'pending'
  | 'cancelled'
  | 'rejected';

export interface LeaveRecordsResponse {
  total: number;
  data: LeaveRecordsType[];
  message: string;
  status: string;
  counts: string;
}
export interface LeaveRecordUser {
  _id: string;
  firstName: string;
  lastName: string;
  empCode: string;
}

export interface LeaveTableProps {
  data: {
    data: any[];
    total: number;
  };
  userRole: string;
  loading: boolean;
  activePage: number;
  totalPageCount: number;
  itemsPerPage: number;
  onPageClick: (page: number) => void;
  prev: () => void;
  next: () => void;
  handleCancel: (leaveId: string, userId: string) => void;
  handleReject: (leaveId: string, userId: string, comment?: string) => void;
  handleApprove: (leaveId: string, userId: string) => void;
  leaveformatDate: (isoString: string) => string;
  leaveIsSelf: boolean;
}

export interface LeaveRecordsType {
  _id: string;
  userId: LeaveRecordUser;
  leaveType: LeaveRecordType;
  applyDate: {
    date: string;
    period: string;
  }[];
  totalDays: number;
  status: LeaveRecordStatus;
}

export interface UserTypes {
  firstName: string;
  empCode: string;
  lastName: string;
}

export interface LeaveType {
  leaveType: LeaveRecordType;
}

export interface LeaveHistoryType {
  _id: string;
  credited: number;
  debited: number;
  user: UserTypes;
  leave: LeaveType;
  description: string;
}

export type CompanyUpdate = {
  company: Company;
  user: User;
  _id: string;
};
export interface ModalPopup {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export interface TimeRegulationModalProps {
  memberOptions: OptionType[];
  addProjectModal: boolean;
  setAddProjectModal: (value: boolean) => void;
  dateTime: Date;
  selectedUser: OptionType | null;
  setDateTime: (date: Date) => void;
  userRole: string;
  handleChangeUser: (option: OptionType | null) => void;
  projectOption: OptionType[];
  selectedProjectOption: OptionType | null;
  regularizeStartTime: string;
  regularizeEndTime: string;
  error: string | null;
  description: string;
  handleStartTimeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndTimeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  isApplyEnabled: boolean;
  handleApplyButton: () => void;
  handleCancelButton: () => void;
  loading: boolean;
  allProjectOptions: OptionType[];
  handleChangeProject: (option: OptionType | null) => void;
}

export type OptionTypeYear = {
  label: string;
  value: number;
};
export type AttendanceStatus =
  | 'WO'
  | 'Half-Day'
  | 'Present'
  | 'Absent'
  | 'On Leave'
  | 'Holiday';
export interface LeaveOption {
  name: string;
  label: string;
  value: string;
  isDisabled?: boolean;
}

export type ProfileSessionStatus = 'Active' | 'Deactive';
export interface ProfilePanelButtonsProps {
  activeSection: string;
  onSectionClick: (section: string, ref: any) => void;
  refs: {
    profile: React.RefObject<HTMLDivElement>;
    profileDetails: React.RefObject<HTMLDivElement>;
    bankDetails: React.RefObject<HTMLDivElement>;
    emergencyContact: React.RefObject<HTMLDivElement>;
    ProfileDocument: React.RefObject<HTMLDivElement>;
    Notification: React.RefObject<HTMLDivElement>;
    Sessions: React.RefObject<HTMLDivElement>;
  };
}
export interface ButtonData {
  section: string;
  icon: ReactNode;
  label: string;
}
export type OptionTypeFilter = {
  value: string;
};

export type AddUpdateHolidayModalProps = {
  isOpen: boolean; // Boolean to control modal visibility
  loading: boolean;
  holidayName: string; // The name of the holiday (string)
  holidayDate: Date | null; // The date of the holiday (nullable Date)
  onClose: () => void; // Function to close the modal
  handleCancel: () => void; // Function to reset the form inputs
  setHolidayName: (name: string) => void; // Function to update holiday name
  setHolidayDate: (date: Date) => void; // Function to update holiday date
  editingHolidayId: string | null; // Nullable string for tracking if a holiday is being edited
  handleAddHoliday: () => void; // Function to handle adding or updating the holiday
};
export interface LeaveHoliday {
  _id: string;
  date: string;
  name: string;
  day: string | number;
}
export interface ApplyDateLeave {
  date: string;
  period: string;
  count: number;
  _id?: string;
}
export interface ExistingLeave {
  _id: string;
  totalDays: number;
  status: string;
  applyDate: ApplyDateLeave[];
}
export interface ProfilePanelButtonsProps {
  activeSection: string;
  onSectionClick: (section: string, ref: any) => void;
  refs: {
    profile: React.RefObject<HTMLDivElement>;
    profileDetails: React.RefObject<HTMLDivElement>;
    bankDetails: React.RefObject<HTMLDivElement>;
    emergencyContact: React.RefObject<HTMLDivElement>;
    ProfileDocument: React.RefObject<HTMLDivElement>;
    Notification: React.RefObject<HTMLDivElement>;
    Sessions: React.RefObject<HTMLDivElement>;
  };
}
export interface ButtonData {
  section: string;
  icon: ReactNode;
  label: string;
}
export interface settingsOptionType {
  id: number;
  title: string;
  description: string;
}
export interface AttendanceFormValues {
  totalWorkingHours: string;
  flexibleTotalHours: string;
  elegibleCompoff: string;
  halfLeave: string;
}

export interface LeaveColors {
  sickLeave: string;
  vacationLeave: string;
  personalLeave: string;
  onLeave: string;
  absent: string;
  present: string;
}

export interface Payload {
  leaveType: string;
  leaveValue: number | string;
  leaveColor: LeaveColors;
}

export interface LeavePayload {
  leave: Payload;
}

export interface ProductivityType {
  unproductiveColor: string;
  neutralColor: string;
  productiveColor: string;
}

export interface JiraSettings {
  jiraBaseUrl: string;
  jiraEmail: string;
  jiraApiToken: string;
}

export interface JiraPayload {
  jira: JiraSettings;
}

export type SettingPayload =
  | LeavePayload
  | { attendance: AttendanceFormValues }
  | { productivity: ProductivityType }
  | { jira: JiraSettings };

export interface SettingRequestApiResponse {
  status: boolean;
  message: string;
  data: SettingResponse;
}

export interface SettingResponse {
  leave: Payload;
  attendance: AttendanceFormValues;
  productivity: ProductivityType;
  jira: JiraSettings;
  _id: string;
  companyId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface SettingsData {
  jiraBaseUrl: string;
  jiraEmail: string;
  jiraApiToken: string;
  leave: Payload;
  attendance: AttendanceFormValues;
  productivity: ProductivityType;
  jira: JiraSettings;
}

export interface SettingRootState {
  settings: {
    data: SettingsData;
    loading: boolean;
  };
}
