import React from 'react';
import { Tooltip } from '@material-tailwind/react';
import { dashboardProjectTable } from '../../../utils/mockData';
import './DashboardProjectTable.css';

const DashboardProjectTable: React.FC = () => {

  return (
    <div className="main-wrap-styling">
      <div className="table-container">
        <table className="min-w-full">
          <thead className="table-head">
            <tr className="table-row-styling">
              <th className="name-column-styles">Project Name</th>
              <th className="member-column-styles">Members</th>
              <th className="working-hr-styles">Total Working Hrs</th>
            </tr>
          </thead>
        </table>
        <div className="table-body-wrap">
          <table className="min-w-full">
            <tbody>
              {dashboardProjectTable.map((data) => (
                <tr key={data.id}>
                  <td className="px-4 py-2">{data.name}</td>
                  <td className="px-4 py-2">
                    <div className="member-section gap-1">
                      <div className="flex -space-x-1">
                        {data.members.slice(0, 2).map((member, index) => (
                          <Tooltip
                            key={index}
                            placement="bottom"
                            content={`${member.firstName} ${member.lastName}`}
                          >
                            <div className="member-tooltip">
                              {member.firstName.charAt(0)}
                              {member.lastName.charAt(0)}
                            </div>
                          </Tooltip>
                        ))}
                        {data.members.length > 2 && (
                          <Tooltip
                            placement="bottom"
                            content={
                              <div className="flex flex-col">
                                {data.members.slice(2).map((member, index) => (
                                  <span key={index} className="text-white">
                                    {member.firstName}
                                  </span>
                                ))}
                              </div>
                            }
                          >
                            <div className="member-tiling">
                              <h6>+{data.members.length - 2}</h6>
                            </div>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">{data.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardProjectTable;
