import { useEffect, useState, Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../redux/themeConfigSlice';
import IconUserPlus from '../../components/Icon/IconUserPlus';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import SearchSelect from '../../components/CustomSelect/CustomSelect';
import {
  AddEditProject,
  AllUserType,
  FilterByStatus,
  MemberOption,
  MemberOptionType,
  OptionType,
  ProjectOption,
  Projects,
  TeamMember,
} from '../../utils/type';
import Button from '../../components/CustomButton/CustomButton';
import { getAllUserRequest } from '../../redux/user/action';
import {
  addProjectRequest,
  deleteProjectRequest,
  getAllProjectRequest,
  projectRequest,
  updateProjectRequest,
} from '../../redux/project/action';
import { statusOption } from '../../utils/mockData';
import Search from '../../components/SearchInput/SearchInput';
import {
  checkIfMembersChanged,
  checkUpdateObject,
  findProjectsByMembers,
  getUserRole,
  hasPermission,
  useDebouncedValue,
} from '../../utils';
import { useFormik } from 'formik';
import { addEditProjectValidation } from '../../utils/validation';
import './Projects.css';
import ProjectMemberModal from './ProjectMemberModal';
import AddUpdateProjectModal from './AddUpdateProjectModal';
import ProjectTable from './ProjectTable';

const Project = () => {
  const [selectedMembers, setSelectedMembers] = useState<OptionType[]>([]);
  const [selectedAddMembers, setSelectedAddMembers] = useState<OptionType[]>(
    []
  );
  const [isMemberChange, setIsMemberChange] = useState<boolean>(false);
  const [selectedEditMember, setSelectedEditMember] = useState<any>();
  const [selectedProjects, setSelectedProjects] = useState<OptionType[]>([]);
  const { allUserData } = useSelector((state: TeamMember) => state?.user);
  const {
    projectData,
    isSuccess,
    isModifyingProject,
    allProjectData,
    loading,
  } = useSelector((state: Projects) => state.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle('Project'));
  }, []);

  useEffect(() => {
    if (hasPermission(userRole, 'project', 'read')) {
      dispatch(getAllUserRequest());
    }
    dispatch(getAllProjectRequest());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setAddProjectModal(false);
      setAddMemberModal(false);
      setSubmissionSuccess(true);
    }
  }, [isSuccess]);

  const memberOptions: OptionType[] =
    allUserData?.data?.map(({ firstName, _id }: MemberOption) => ({
      label: firstName,
      value: _id,
    })) || [];

  let userRole = getUserRole();

  const allProjectOptions: OptionType[] =
    allProjectData?.data?.map(({ projectName, _id }: ProjectOption) => ({
      label: projectName,
      value: _id,
    })) || [];

  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [search, setSearch] = useState<string>('');
  const [addProjectModal, setAddProjectModal] = useState<any>(false);
  const [projectUpdateData, setProjectUpdateData] = useState<any>(null);
  const [addMemberModal, setAddMemberModal] = useState<any>(false);
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [submissionSuccess, setSubmissionSuccess] = useState<Boolean>(false);
  const [seletedProjectId, setSelectedProjectId] = useState('');
  const [filterByStatus, setFilterByStatus] = useState<FilterByStatus>({
    value: 'all',
    label: 'All',
  });
  const [projectOption, setProjectOption] = useState<OptionType[]>([]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const itemsPerPage = 10;

  useEffect(() => {
    if (projectData?.total) {
      setTotalPageCount(Math.ceil(projectData?.total / itemsPerPage));
    }
  }, [projectData]);

  useEffect(() => {
    if (submissionSuccess) {
      resetForm();
      setSubmissionSuccess(false);
      setSelectedAddMembers([]);
      setSelectedEditMember([]);
    }
  }, [submissionSuccess]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const handleEditProject = (project: Projects) => {
    setIsMemberChange(false);
    setProjectUpdateData(project);
    setAddProjectModal(true);
  };

  const handleAddProject = () => {
    setProjectUpdateData(null);
    setAddProjectModal(true);
  };

  const handleEditMember = () => {
    const editMemberData = {
      projectId: seletedProjectId,
      memberIds: selectedEditMember?.map((member: any) => member.value),
      ...(isMemberChange ? { isMemberIdsChange: true } : {}),
    };
    dispatch(updateProjectRequest(editMemberData));
  };

  const initialValues: AddEditProject = {
    projectName: projectUpdateData ? projectUpdateData?.projectName : '',
    memberIds: projectUpdateData ? selectedAddMembers : [],
    isScreenshot: projectUpdateData ? projectUpdateData?.isScreenshot : false,
    notes: projectUpdateData ? projectUpdateData?.notes : '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addEditProjectValidation,
    onSubmit: async (values, { setSubmitting }) => {
      const projectData: AddEditProject = {
        projectName: values.projectName,
        memberIds: values.memberIds,
        isScreenshot: values.isScreenshot,
        notes: values.notes,
      };
      if (projectUpdateData?._id) {
        projectData.projectId = projectUpdateData._id;
        if (isMemberChange) {
          projectData.memberIds = values.memberIds;
          projectData.isMemberIdsChange = true;
        } else {
          projectData.memberIds = values.memberIds.map(
            (member: any) => member.value
          );
        }
      }
      if (projectUpdateData?._id) {
        dispatch(updateProjectRequest(projectData));
      } else {
        dispatch(addProjectRequest(projectData));
      }
    },
  });

  const { getFieldProps, values, setFieldValue, resetForm } = formik;
  useEffect(() => {
    if (values) {
      formik.setErrors({});
    }
  }, [values]);

  useEffect(() => {
    const isUpdateProject = checkUpdateObject(values, initialValues);
    setIsUpdate(isUpdateProject);
  }, [values, initialValues]);

  const resetFormValues = () => {
    const newArray = projectUpdateData?.members?.map(
      (member: MemberOptionType) => ({
        value: member._id,
        label: member.firstName,
      })
    );
    setSelectedAddMembers(newArray);
    if (projectUpdateData && projectUpdateData?._id) {
      setFieldValue('projectName', projectUpdateData?.projectName);
      setFieldValue('memberIds', newArray);
      setFieldValue('isScreenshot', projectUpdateData?.isScreenshot);
      setFieldValue('notes', projectUpdateData?.notes);
    } else {
      resetForm();
    }
  };

  useEffect(() => {
    resetFormValues();
  }, [projectUpdateData]);

  const debouncedSearchTerm = useDebouncedValue(search, 500);

  const handleAddSelectedMemberChange = (selectedOptions: OptionType[]) => {
    const isMembersChanged = checkIfMembersChanged(
      projectUpdateData,
      selectedOptions
    );
    if (isMembersChanged) {
      setIsMemberChange(isMembersChanged);
    }
    const values = selectedOptions
      ? selectedOptions.map((option: OptionType) => option.value)
      : [];
    setSelectedAddMembers(selectedOptions);
    formik.setFieldValue('memberIds', values);
  };

  const handleEditSelectedMemberChange = (selectedOptions: any) => {
    const isMembersChanged = checkIfMembersChanged(
      projectUpdateData,
      selectedOptions
    );
    if (isMembersChanged) {
      setIsMemberChange(isMembersChanged);
    }
    const values = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setSelectedEditMember(selectedOptions);
  };

  useEffect(() => {
    const statusParam =
      filterByStatus.value === 'all' ? '' : filterByStatus.value;

    if (
      statusParam === 'active' ||
      statusParam === 'inactive' ||
      debouncedSearchTerm ||
      selectedMembers.length ||
      selectedProjects.length
    ) {
      dispatch(
        projectRequest({
          search: debouncedSearchTerm,
          status: statusParam,
          memberIds: selectedMembers?.map((item) => item.value),
          projectIds: selectedProjects?.map((item) => item.value),
        })
      );
    } else {
      dispatch(
        projectRequest({
          rowsPerPage: itemsPerPage,
          page: activePage,
          status: statusParam,
        })
      );
    }
  }, [
    selectedProjects,
    selectedMembers,
    filterByStatus,
    debouncedSearchTerm,
    activePage,
    itemsPerPage,
  ]);

  useEffect(() => {
    const selectedUserValues =
      selectedMembers?.map((member: OptionType) => member.value) || [];

    const memberInProject = findProjectsByMembers(
      selectedUserValues,
      allProjectData?.data || []
    );
    setProjectOption(memberInProject);
  }, [selectedMembers, allProjectData]);

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

  const handleMemberFilter = (selectedOptions: any) => {
    setSelectedMembers(selectedOptions);
  };

  const handleProjectFilter = (selectedOptions: any) => {
    setSelectedProjects(selectedOptions);
  };

  const handleChangeFilterByStatus = (selectedOption: any) => {
    setFilterByStatus(selectedOption);
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

  const handleStatusChange = async (project: any, newStatus: any) => {
    let statusValue = newStatus ? 'active' : 'inactive';
    const result = await showstatusAlert(newStatus ? 'true' : 'false');

    if (result.isConfirmed) {
      let statusData = {
        projectId: project._id,
        status: statusValue,
        isMemberIdsChange: false,
        memberIds: project?.members,
      };
      dispatch(updateProjectRequest(statusData));
    } else {
      (
        document.getElementById(
          `custom_switch_checkbox${project._id}`
        ) as HTMLInputElement
      ).checked = !newStatus;
    }
  };

  const handleScreenshortChange = async (project: any, newStatus: any) => {
    const result = await showstatusAlert(newStatus ? 'true' : 'false');
    if (result.isConfirmed) {
      let statusData = {
        projectId: project._id,
        isScreenshot: newStatus,
        isMemberIdsChange: false,
        memberIds: project?.members,
      };
      dispatch(updateProjectRequest(statusData));
    } else {
      (
        document.getElementById(
          `custom_switch_checkbox${project._id}`
        ) as HTMLInputElement
      ).checked = !newStatus;
    }
  };

  const addMember = (project: any) => {
    const memberIds = project?.members?.map((member: any) => ({
      value: member._id,
      label: `${member.firstName}`,
    }));
    setSelectedProjectId(project?._id);
    setSelectedEditMember(memberIds);
    setProjectUpdateData(project);
    setAddMemberModal(true);
    setIsMemberChange(false);
  };

  const customStyles = {
    menu: (provided: any) => ({
      ...provided,
      maxHeight: '200px',
      overflowY: 'auto',
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: '200px',
      overflowY: 'auto',
    }),
  };

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

  const showDeleteAlert = async (type: number, project: any = null) => {
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
          const projectId = { id: project?._id };
          dispatch(deleteProjectRequest(projectId));
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

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-3'>Projects</h2>
      <div className='flex-container'>
        <div className='w-[200px]'>
          <Search
            placeholder='Search Project'
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
          />
        </div>
        <div className='search-container'>
          <div className='flex gap-3 justify-center items-center'>
            <span className='filter-label '>Filter by:</span>

            <SearchSelect
              placeholder='Select Status'
              value={filterByStatus}
              options={statusOption}
              className='w-40'
              isSearchable={true}
              onChange={handleChangeFilterByStatus}
            />

            {hasPermission(userRole, 'project', 'read') && (
              <SearchSelect
                placeholder='Select Member'
                options={memberOptions}
                isMulti
                isSearchable={true}
                value={selectedMembers}
                onChange={handleMemberFilter}
              />
            )}
            <SearchSelect
              placeholder='Select Project'
              options={
                hasPermission(userRole, 'project', 'read')
                  ? projectOption
                  : allProjectOptions
              }
              isDisabled={
                hasPermission(userRole, 'project', 'read')
                  ? selectedMembers.length
                    ? false
                    : true
                  : false
              }
              isMulti
              isSearchable={true}
              value={selectedProjects}
              onChange={handleProjectFilter}
            />
            {hasPermission(userRole, 'project', 'write') && (
              <Button
                type='button'
                className='project-button'
                onClick={() => handleAddProject()}
              >
                <IconUserPlus className='icon-user-plus' />
                Add Project
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className='table-containt panel'>
        <ProjectTable
          loading={loading}
          projectData={projectData}
          totalPageCount={totalPageCount}
          activePage={activePage}
          setActivePage={setActivePage}
          onPageClick={onPageClick}
          addMember={addMember}
          handleScreenshortChange={handleScreenshortChange}
          handleStatusChange={handleStatusChange}
          handleEditProject={handleEditProject}
          showDeleteAlert={showDeleteAlert}
          prev={prev}
          next={next}
        />
      </div>

      {/* Add Update project Modal */}
      <AddUpdateProjectModal
        addProjectModal={addProjectModal}
        setAddProjectModal={setAddProjectModal}
        projectUpdateData={projectUpdateData}
        formik={formik}
        getFieldProps={formik.getFieldProps}
        values={formik.values}
        setFieldValue={formik.setFieldValue}
        memberOptions={memberOptions}
        selectedAddMembers={selectedAddMembers}
        customStyles={customStyles}
        handleAddSelectedMemberChange={handleAddSelectedMemberChange}
        isModifyingProject={isModifyingProject}
        isDisable={isUpdate}
      />

      {/* Add Project Member Modal */}
      <ProjectMemberModal
        addMemberModal={addMemberModal}
        setAddMemberModal={setAddMemberModal}
        memberOptions={memberOptions}
        selectedEditMember={selectedEditMember}
        handleEditSelectedMemberChange={handleEditSelectedMemberChange}
        isModifyingProject={isModifyingProject}
        handleEditMember={handleEditMember}
        customMemberStyles={customMemberStyles}
      />
    </div>
  );
};

export default Project;
