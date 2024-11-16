import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../redux/themeConfigSlice';
import IconUserPlus from '../../components/Icon/IconUserPlus';
import AddCompanyModal from './AddCompanyModal';
import {
  addCompanyRequest,
  deleteCompanyRequest,
  getCompanyRequest,
  updateCompanyRequest,
} from '../../redux/company/action';
import {
  Company,
  CompanyRootState,
  CompanyUpdate,
  OptionType,
} from '../../utils/type';
import { useDebouncedValue } from '../../utils';
import Button from '../../components/CustomButton/CustomButton';
import Search from '../../components/SearchInput/SearchInput';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import CompanyTable from './CompanyTable';
import { CompanyHead } from '../../utils/mockData';
import './CompanyModule.css';
import { getAllUserRoleRequest } from '../../redux/user/action';

const CompanyModule = () => {
  const dispatch = useDispatch();
  const [addCompanyModal, setAddCompanyModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  const [companyUpdateData, setCompanyUpdateData] =
    useState<CompanyUpdate | null>(null);

  const itemsPerPage = 20;

  const { companyData, isSuccess, isModifyCompanyLoading, loading } =
    useSelector((state: CompanyRootState) => state.company);
  const { userRoleData } = useSelector((state: any) => state?.user);
  const debouncedSearchTerm = useDebouncedValue(search, 500);

  const userRoletOption: OptionType[] =
    userRoleData?.data?.map((item: any, _id: any) => ({
      label: item,
    })) || [];

  useEffect(() => {
    dispatch(setPageTitle('Project'));
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      setAddCompanyModal(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (companyData?.company) {
      setTotalPageCount(Math.ceil(companyData?.total / itemsPerPage));
    }
  }, [companyData?.company]);

  useEffect(() => {
    dispatch(getAllUserRoleRequest());
  }, []);

  // Fetch company data when search term, items per page, or active page changes
  useEffect(() => {
    fetchCompanyData();
  }, [debouncedSearchTerm, itemsPerPage, activePage]);

  const fetchCompanyData = useCallback(() => {
    const params = {
      rowsPerPage: itemsPerPage,
      searchTeam: debouncedSearchTerm,
      page: debouncedSearchTerm ? undefined : activePage,
    };
    dispatch(getCompanyRequest(params));
  }, [dispatch, debouncedSearchTerm, itemsPerPage, activePage]);

  const showDeleteAlert = async (type: number, company: any = null) => {
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

      const result = await Swal.fire(options);
      if (result.isConfirmed) {
        const companyId = { companyId: company?._id };

        try {
          await dispatch(deleteCompanyRequest(companyId));
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
            customClass: {
              popup: 'sweet-alerts',
              confirmButton: 'btn btn-success',
            },
          });
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete the company.',
            icon: 'error',
            customClass: {
              popup: 'sweet-alerts',
              confirmButton: 'btn btn-danger',
            },
          });
        }
      }
    }
  };

  const handleEditCompany = (company: CompanyUpdate) => {
    setCompanyUpdateData(company);
    setAddCompanyModal(true);
  };

  const handleAddCompany = () => {
    setCompanyUpdateData(null);
    setAddCompanyModal(true);
  };

  const prev = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  const next = () => {
    if (activePage < totalPageCount) {
      setActivePage(activePage + 1);
    }
  };

  const onPageClick = (selectedPage: number) => {
    setActivePage(selectedPage);
  };

  const handleCompanySubmit = (companyData: any) => {
    if (companyUpdateData?.company?._id) {
      dispatch(updateCompanyRequest(companyData));
    } else {
      dispatch(addCompanyRequest(companyData));
    }
  };

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-3'>Companies</h2>
      <div className='flex-container'>
        <div className='search-wrapper'>
          <Search
            placeholder='Search Company'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className='flex-inner-container'>
          <div className='search-container'>
            <Button
              type='button'
              className='button-primary'
              onClick={handleAddCompany}
              aria-label='Add a new company'
            >
              <IconUserPlus className='icon-spacing' />
              Add Company
            </Button>
          </div>
        </div>
      </div>
      <div className='company-table panel'>
        <CompanyTable
          companyData={companyData?.company}
          activePage={activePage}
          tableHead={CompanyHead}
          totalPageCount={totalPageCount}
          handleEditCompany={handleEditCompany}
          prev={prev}
          next={next}
          onPageClick={onPageClick}
          loading={loading}
          showDeleteAlert={showDeleteAlert}
        />
      </div>
      <AddCompanyModal
        isOpen={addCompanyModal}
        onClose={() => setAddCompanyModal(false)}
        companyUpdateData={companyUpdateData}
        isModifyLoading={isModifyCompanyLoading}
        userRoletOption={userRoletOption}
        onSubmit={handleCompanySubmit}
      />
    </div>
  );
};

export default CompanyModule;
