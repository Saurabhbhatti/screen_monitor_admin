import React from 'react';

const TimeSheetTable: React.FC = () => {

  const tableData = [
    {
      id: 1,
      project: 'John Doe',
      date: '10/08/2020',
      start_time: 120,
      end_time: 130,
      duration: '10',
    },
    {
      id: 2,
      project: 'John Doe',
      date: '10/08/2020',
      start_time: 120,
      end_time: 130,
      duration: '10',
    },
  ];

  return (
    <div className="panel mt-6">
      <div className="flex items-center justify-between mb-5">
        <h5 className="font-semibold text-lg dark:text-white-light">Time Sheet</h5>
        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600">
          <span className="flex items-center">
            {/* DropDown Place here */}
          </span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-hover">
          <thead>
            <tr className="text-center">
              <th>Project</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data) => (
              <tr key={data.id} className="text-center">
                <td className="whitespace-nowrap">{data.project}</td>
                <td>{data.date}</td>
                <td>{data.start_time}</td>
                <td>{data.end_time}</td>
                <td>{data.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeSheetTable;