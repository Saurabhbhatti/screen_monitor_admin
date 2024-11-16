import React from 'react';
import { CustomTableComponentProps } from '../../utils/type';
import IconEdit from '../../assets/Icon/IconEdit';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import Button from '../../components/CustomButton/CustomButton';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import './CompanyModule.css';
import { IconTrashLines } from '../../assets';

const CompanyTable: React.FC<CustomTableComponentProps> = ({
  companyData,
  activePage,
  totalPageCount,
  tableHead,
  handleEditCompany,
  showDeleteAlert,
  next,
  prev,
  loading,
  onPageClick,
}) => {
  return (
    <div className='panel main-table-container'>
      <div className='table-responsive'>
        <table className='table-striped table-hover'>
          <thead>
            <tr>
              {tableHead.map((header) => (
                <th key={header.key} className='table-header'>
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan={tableHead.length}>
                  <div className='loading-container'>
                    <CustomLoader />
                  </div>
                </td>
              </tr>
            </tbody>
          ) : companyData?.length > 0 ? (
            <tbody>
              {companyData?.map((companyInfo: any) => (
                <tr key={companyInfo?.company.id}>
                  <td>
                    <div className='company-name-container'>
                      <div>{companyInfo?.company.companyName}</div>
                    </div>
                  </td>
                  <td className='whitespace-nowrap'>
                    {companyInfo?.company.companyEmail}
                  </td>
                  <td className='whitespace-nowrap'>
                    {companyInfo?.company.companyPhone}
                  </td>
                  <td className='whitespace-nowrap'>
                    {companyInfo?.company.companyAddress}
                  </td>
                  <td className='whitespace-nowrap'>
                    {companyInfo?.company.companyWebsite}
                  </td>
                  <td>
                    <div className='action-buttons-container'>
                      <Button
                        type='button'
                        onClick={() => handleEditCompany(companyInfo)}
                      >
                        <IconEdit className='iconedit' />
                      </Button>
                      <Button
                        type='button'
                        onClick={() => showDeleteAlert(10, companyInfo)}
                        className=''
                      >
                        <IconTrashLines className='text-danger w-6 h-6' />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={tableHead.length}>
                  <div className='loading-container'>No Data Available !</div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      {!loading && companyData?.length > 0 && (
        <div className='mt-3'>
          <div className='pagination-container'>
            <ul className='pagelist-data'>
              <li>
                <Button
                  type='button'
                  className={`pagination-data ${
                    activePage === 1
                      ? 'pagination-button-disabled'
                      : 'pagination-button-inactive'
                  } dark-mode`}
                  onClick={prev}
                  disabled={activePage === 1}
                >
                  <IconCaretDown className='pageIcon' />
                </Button>
              </li>
              {[...Array(totalPageCount)].map((_, index) => (
                <li key={index}>
                  <Button
                    type='button'
                    className={`page-number transitions ${
                      activePage === index + 1
                        ? 'pagination-button-active'
                        : 'pagination-button-inactive'
                    } dark-mode`}
                    onClick={() => onPageClick(index + 1)}
                  >
                    {index + 1}
                  </Button>
                </li>
              ))}
              <li>
                <Button
                  type='button'
                  className={`pagination-data ${
                    activePage === totalPageCount
                      ? 'pagination-button-disabled'
                      : 'pagination-button-inactive'
                  } dark-mode`}
                  onClick={next}
                  disabled={activePage === totalPageCount}
                >
                  <IconCaretDown className='pageIconRight' />
                </Button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyTable;
