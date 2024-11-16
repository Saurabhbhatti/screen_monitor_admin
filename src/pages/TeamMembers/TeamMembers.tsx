import { useState, Fragment, useEffect, useRef } from 'react';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../redux/themeConfigSlice';
import IconUserPlus from '../../components/Icon/IconUserPlus';
import IconLayoutGrid from '../../components/Icon/IconLayoutGrid';
import IconListCheck from '../../components/Icon/IconListCheck';
import {
  addUserRequest,
  deleteUserRequest,
  getAllUserRoleRequest,
  updateUserRequest,
  userRequest,
} from '../../redux/user/action';
import { useFormik } from 'formik';
import { uservalidation } from '../../utils/validation';
import {
  checkUpdateObject,
  getUserRole,
  hasPermission,
  useDebouncedValue,
  UserRole,
} from '../../utils';
import { getAllProjectRequest } from '../../redux/project/action';
import Search from '../../components/SearchInput/SearchInput';
import SearchSelect from '../../components/CustomSelect/CustomSelect';
import Button from '../../components/CustomButton/CustomButton';
import {
  FilterByStatus,
  OptionType,
  ProjectOption,
  Projects,
  UserIntialState,
} from '../../utils/type';
import {
  statusOption,
  TeamMemberHead,
  TeamMemberHeadBase,
} from '../../utils/mockData';
import TeamMemberTable from './TeamMemberTable';
import TeamMemberGridCard from './TeamMemberGridCard';
import AddEditMemberModal from './AddEditMemberModal';
import AddProjectModal from './AddProjectModal';
import './TeamMembers.css';

const TeamMember = () => {
  const dispatch = useDispatch();
  let userRole = getUserRole();

  useEffect(() => {
    dispatch(setPageTitle('Contacts'));
  }, []);

  const [addContactModal, setAddContactModal] = useState<any>(false);
  const [addProjectModal, setAddProjectModal] = useState<any>(false);
  const [activePage, setActivePage] = useState<number>(1);
  const { userData, isSuccess, loading, isUserModifyLoading, userRoleData } =
    useSelector((state: any) => state?.user);
  const { projectData, allProjectData } = useSelector(
    (state: Projects) => state.projects
  );
  const [userUpdateData, setUserUpdateData] = useState<any>(null);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [search, setSearch] = useState<any>('');
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedAddProject, setSelectedAddProject] = useState([]);
  const [seletedUserId, setSelectedUserId] = useState('');
  const [selectedEditProject, setSelectedEditProject] = useState<any>();
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [selectedAddEditproject, setSelectedAddEditProject] = useState<
    OptionType[]
  >([]);
  const [selectedUserRoletOption, setSelectedUserRoletOption] =
    useState<any>(null);

  const [filterByStatus, setFilterByStatus] = useState<FilterByStatus>({
    value: 'all',
    label: 'All',
  });

  const handleChangeFilterByStatus = (selectedOption: any) => {
    setFilterByStatus(selectedOption);
  };

  const projectOptions: OptionType[] =
    allProjectData?.data?.map(({ projectName, _id }: any) => ({
      label: projectName,
      value: _id,
    })) || [];

  const userRoletOption: OptionType[] =
    userRoleData?.data?.map((item: any, _id: any) => ({
      label: item,
      value: item,
    })) || [];

  const [value, setValue] = useState<any>('list');
  const [defaultParams] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    role: '',
    location: '',
  });

  const itemsPerPage = 8;

  useEffect(() => {
    if (submissionSuccess) {
      resetForm();
      setSubmissionSuccess(false);
    }
  }, [submissionSuccess]);

  useEffect(() => {
    if (isSuccess) {
      setAddContactModal(false);
      setAddProjectModal(false);
      setSubmissionSuccess(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (userData?.total) {
      setTotalPageCount(Math.ceil(userData?.total / itemsPerPage));
    }
  }, [userData]);

  const debouncedSearchTerm = useDebouncedValue(search, 500);

  useEffect(() => {
    const statusParam =
      filterByStatus.value === 'all' ? '' : filterByStatus.value;
    if (debouncedSearchTerm) {
      dispatch(
        userRequest({
          rowsPerPage: itemsPerPage,
          searchTerm: debouncedSearchTerm,
          status: statusParam,
        })
      );
    } else {
      dispatch(
        userRequest({
          page: activePage,
          rowsPerPage: itemsPerPage,
          searchTerm: '',
          status: statusParam,
        })
      );
    }
  }, [itemsPerPage, debouncedSearchTerm, filterByStatus, activePage]);

  const prev = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  const onPageClick = (selectedPage: any) => {
    setActivePage(selectedPage);
  };

  const next = () => {
    if (activePage < totalPageCount) {
      setActivePage(activePage + 1);
    }
  };

  const initialValues: UserIntialState = {
    firstName: userUpdateData ? userUpdateData?.firstName : '',
    lastName: userUpdateData ? userUpdateData?.lastName : '',
    designation: userUpdateData ? userUpdateData?.designation : '',
    role: userUpdateData ? userUpdateData?.role : '',
    email: userUpdateData ? userUpdateData?.email : '',
    phone: userUpdateData ? userUpdateData?.phone : '',
    empCode: userUpdateData ? userUpdateData?.empCode : '',
    projects: userUpdateData?.projects || selectedProjects || '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: uservalidation,
    onSubmit: async (values, { setSubmitting }) => {
      const userData: any = {
        firstName: values.firstName,
        lastName: values.lastName,
        projectIds: values.projects,
        designation: values.designation,
        email: values.email,
        role: selectedUserRoletOption?.value,
        phone: values.phone,
        empCode: values.empCode,
      };
      if (userUpdateData?._id) {
        userData.userId = userUpdateData._id;
      }
      if (userUpdateData?._id) {
        dispatch(updateUserRequest(userData));
      } else {
        dispatch(addUserRequest(userData));
      }

      setSubmitting(false);
    },
  });

  const { getFieldProps, setFieldValue, values, resetForm } = formik;

  useEffect(() => {
    const isUpdateUser = checkUpdateObject(values, initialValues);
    setIsUpdate(isUpdateUser);
  }, [values, initialValues]);

  const resetFormValues = () => {
    if (userUpdateData !== null) {
      const newArray = userUpdateData?.projects?.map(
        (project: ProjectOption) => ({
          value: project?._id,
          label: project?.projectName,
        })
      );
      const roleOption = {
        label: userUpdateData?.role,
        value: userUpdateData?.role,
      };

      setSelectedAddEditProject(newArray);
      setSelectedUserRoletOption(roleOption);
      if (userUpdateData && userUpdateData?._id) {
        setFieldValue('firstName', userUpdateData?.firstName);
        setFieldValue('lastName', userUpdateData?.lastName);
        setFieldValue('email', userUpdateData?.email);
        setFieldValue('phone', userUpdateData?.phone);
        setFieldValue('designation', userUpdateData?.designation);
        setFieldValue('projects', userUpdateData?.projects);
        setFieldValue('empCode', userUpdateData?.empCode);
        setFieldValue('role', userUpdateData?.role);
      } else {
        resetForm();
      }
    }
  };

  useEffect(() => {
    resetFormValues();
  }, [userUpdateData]);

  useEffect(() => {
    if (values) {
      formik.setErrors({});
    }
  }, [values]);

  const customMemberStyles = {
    menu: (provided: any) => ({
      ...provided,
      maxHeight: '80px',
      overflowY: 'auto',
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: '80px',
      overflowY: 'auto',
    }),
  };

  const handleAddUser = () => {
    setAddContactModal(true);
    setUserUpdateData(null);
    setSelectedAddEditProject([]);
    setSelectedUserRoletOption(null);
  };

  const handleEditUser = (user: any = null) => {
    setUserUpdateData(user);
    setAddContactModal(true);
  };

  const showstatusAlert = async (action: string) => {
    const options: SweetAlertOptions = {
      icon: 'warning',
      title: `Are you sure you want to change status?`,
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

  const showAlert = async (type: number, user: any = null) => {
    if (type === 10) {
      const options: SweetAlertOptions = {
        icon: 'warning',
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: 'Delete',
        padding: '2em',
        customClass: {
          popup: 'sweet-alerts',
          confirmButton: 'btn btn-danger',
        },
      };

      Swal.fire(options).then((result) => {
        if (result.value) {
          const userId = { id: user?._id };
          dispatch(deleteUserRequest(userId));
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
            customClass: {
              popup: 'sweet-alerts',
              confirmButton: 'btn btn-success',
            },
          });
        }
      });
    }
  };

  const handleStatusChange = async (user: any, newStatus: any) => {
    let statusValue = newStatus ? 'active' : 'inactive';

    const result = await showstatusAlert(newStatus ? 'true' : 'false');

    if (result.isConfirmed) {
      let statusData = {
        userId: user._id,
        userStatus: statusValue,
        projectIds: user?.projects,
      };
      dispatch(updateUserRequest(statusData));
    } else {
      (
        document.getElementById(
          `custom_switch_checkbox${user._id}`
        ) as HTMLInputElement
      ).checked = !newStatus;
    }
  };

  const handleProjectChange = (selectedOptions: any) => {
    const values = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setSelectedAddEditProject(selectedOptions);
    formik.setFieldValue('projects', values);
  };

  const handleUserRoleChange = (selectedOptions: any) => {
    setSelectedUserRoletOption(selectedOptions);
    formik.setFieldValue('role', values);
  };

  const handleAddProject = (user: any) => {
    const projectIds = user?.projects?.map((user: any) => ({
      value: user._id,
      label: `${user.projectName}`,
    }));
    setSelectedUserId(user?._id);
    setSelectedEditProject(projectIds);
    setUserUpdateData(user);

    setAddProjectModal(true);
  };

  const handleEditProjectChange = (selectedOptions: any) => {
    const values = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setSelectedEditProject(selectedOptions);
  };

  const handleProjectSave = () => {
    const editProjectData = {
      userId: seletedUserId,
      projectIds: selectedEditProject?.map((project: any) => project.value),
    };
    dispatch(updateUserRequest(editProjectData));
  };

  const filteredTableHead =
    userRole === UserRole.PROJECT_MANAGER
      ? TeamMemberHead.filter(
          (header) => header.key !== 'status' && header.key !== 'action'
        )
      : TeamMemberHead;

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-3'>Team Members</h2>
      <div className='sub-div'>
        <div className='relative w-[200px]'>
          <Search
            placeholder='Search User'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className='table-handlers'>
          <span className='filter-label '>Filter by:</span>
          <div className='flex gap-3 items-center'>
            <SearchSelect
              placeholder='Select Status'
              value={filterByStatus}
              options={statusOption}
              className='w-40'
              isSearchable={true}
              onChange={handleChangeFilterByStatus}
            />
            <div>
              <Button
                type='button'
                className={` relative flex items-center justify-center rounded-md border px-5 py-2 text-sm font-semibold shadow-[0_10px_20px_-10px] outline-none transition duration-300 hover:shadow-none 
                  border-primary text-primary shadow-none hover:bg-primary hover:text-white
                  p-2 ${value === 'list' && 'bg-primary text-white'}`}
                onClick={() => setValue('list')}
              >
                <IconListCheck />
              </Button>
            </div>
            <div>
              <Button
                type='button'
                className={`relative flex items-center justify-center rounded-md border px-5 py-2 text-sm font-semibold shadow-[0_10px_20px_-10px] outline-none transition duration-300 hover:shadow-none 
                  border-primary text-primary shadow-none hover:bg-primary hover:text-white p-2 ${
                    value === 'grid' && 'bg-primary text-white'
                  }`}
                onClick={() => setValue('grid')}
              >
                <IconLayoutGrid />
              </Button>
            </div>
          </div>
          <div>
            {hasPermission(userRole, 'teamMember', 'write') && (
              <Button
                type='button'
                className='adduser-button-style'
                onClick={() => handleAddUser()}
              >
                <IconUserPlus className='userplus-icon' />
                Add User
              </Button>
            )}
          </div>
        </div>
      </div>

      {value === 'list' && (
        <TeamMemberTable
          userData={userData}
          userRoleData={userRoleData.data}
          activePage={activePage}
          tableHead={filteredTableHead}
          tableHeadeBase={TeamMemberHeadBase}
          totalPageCount={totalPageCount}
          setAddProjectModal={setAddProjectModal}
          handleStatusChange={handleStatusChange}
          handleEditUser={handleEditUser}
          showAlert={showAlert}
          prev={prev}
          next={next}
          onPageClick={onPageClick}
          isTableLoading={loading}
          handleAddProject={handleAddProject}
          setActivePage={setActivePage}
        />
      )}

      {value === 'grid' && (
        <>
          <TeamMemberGridCard
            userData={userData}
            activePage={activePage}
            totalPageCount={totalPageCount}
            setAddProjectModal={setAddProjectModal}
            handleEditUser={handleEditUser}
            showAlert={showAlert}
            prev={prev}
            next={next}
            onPageClick={onPageClick}
            setActivePage={setActivePage}
            isTableLoading={loading}
            handleAddProject={handleAddProject}
          />
        </>
      )}

      {/* Add/Edit Contact Modal */}
      <AddEditMemberModal
        addContactModal={addContactModal}
        setAddContactModal={setAddContactModal}
        userUpdateData={userUpdateData}
        addUserLoading={isUserModifyLoading}
        updateUserLoading={isUserModifyLoading}
        handleProjectChange={handleProjectChange}
        handleUserRoleChange={handleUserRoleChange}
        selectedProjectOption={selectedAddEditproject}
        selectedUserRoleOption={selectedUserRoletOption}
        formik={formik}
        projectOption={projectOptions}
        userRoletOption={userRoletOption}
        isDisable={isUpdate}
      />
      {/* Add project */}
      <AddProjectModal
        isUserModifyLoading={isUserModifyLoading}
        addProjectModal={addProjectModal}
        setAddProjectModal={setAddProjectModal}
        projectOption={projectOptions}
        customMemberStyles={customMemberStyles}
        selectedProject={selectedEditProject}
        onChange={handleEditProjectChange}
        handleProjectSave={handleProjectSave}
      />
    </div>
  );
};

export default TeamMember;
