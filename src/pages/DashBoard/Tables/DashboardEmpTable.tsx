import React from 'react';
import './DashboardEmpTable.css';
import { employeeDatas } from '../../../utils/mockData';
import { getCategoryColor, getStatusClass } from '../../../utils';

const DashboardEmpTable: React.FC = () => {
  return (
    <div className="main-table-wrap">
      <div className="table-container">
        <table className="min-w-full table-striped table-hover">
          <thead className="table-head">
            <tr className="table-row-styling">
              <th className="name-clm-styling">Employee Name</th>
              <th className="work-hour-styling">Today's Work Hours</th>
              <th className="descripency-styling">Discrepancy</th>
            </tr>
          </thead>
        </table>
        <div className="table-body-wrap">
          <table className="min-w-full">
            <tbody>
              {employeeDatas.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100 dark:hover:bg-gray-800 group">
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <img
                        className="w-8 h-8 rounded-md object-cover ltr:mr-3 rtl:ml-3"
                        src={item.imageUrl}
                        alt={`${item.name} image`}
                      />
                      <div>
                        <p className="font-semibold text-black dark:text-white">{item.name}</p>
                        <span className={`block text-xs ${getCategoryColor(item.designation)}`}>
                          {item.designation}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-4 py-2 whitespace-nowrap">
                    <div className="status-columns-wrap">
                      <div
                        className={`h-1.5 rounded-full ${getStatusClass(item.status)}`}
                        style={{ width: item.progress }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <span className="status-viewer-columns">Online</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardEmpTable;
