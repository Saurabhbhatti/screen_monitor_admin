import React from 'react';
import './leavepage.css';
import { LeaveRecords } from './Leaverecords/Leaverecords';
import { LeaveHistory } from './LeaveHistory/Leavehistory';

const leavepage: React.FC = () => {
  return (
    <>
      <LeaveRecords />
    </>

    // {/* <div className='leave-page-section'>
    //   <div className='leave-page-flex-column'>
    //     <div className='leave-page-card-main'>
    //       <div className='card-red h-30'>
    //         <div className='PrivilegeLeave'>
    //           <div className='text-gray'>Paid Leave</div>
    //         </div>
    //         <div className='LeaveMainCard'>
    //           <div className='text-red'>15</div>
    //           <div className='text-gray-sm'>This Month</div>
    //         </div>
    //       </div>
    //       <div className='card-teal h-30'>
    //         <div className='cardMain px-4'>
    //           <div className='text-gray'>Compoff Leaves</div>
    //         </div>
    //         <div className='LeaveMainCard'>
    //           <div className='text-teal'>11</div>
    //           <div className='text-gray-sm'>This Month</div>
    //         </div>
    //       </div>
    //       <div className='card-indigo h-30'>
    //         <div className='cardMain'>
    //           <div className='text-gray'>Unpaid Leave</div>
    //         </div>
    //         <div className='LeaveMainCard'>
    //           <div className='text-indigo'>6</div>
    //           <div className='text-gray-sm'>This Month</div>
    //         </div>
    //       </div>
    //       <div className='card-purple h-30'>
    //         <div className='cardMain'>
    //           <div className='text-gray'>Pending Leave</div>
    //         </div>
    //         <div className='LeaveMainCard'>
    //           <div className='text-purple'>5</div>
    //           <div className='text-gray-sm'>This Month</div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div> */}
    // {/* <div className='UpcommingLeave'>
    //   <div className='upcoming-leaves-container'>
    //     <div className='upcoming-leaves-container-main'>
    //       <div className='upcoming-leaves-container-detail'>
    //         <div className='text-container'>Leaves history</div>
    //       </div>
    //       <div className='LeaveDataMain'>
    //         <LeaveHistory />
    //       </div>
    //     </div>
    //   </div>
    // </div> */}
  );
};

export default leavepage;
