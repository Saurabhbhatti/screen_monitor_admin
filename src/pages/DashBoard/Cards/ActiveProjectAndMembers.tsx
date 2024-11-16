import React from 'react';
import './ActiveProjectsAndMembers.css';

const ActiveProjectAndMembers: React.FC = () => {
  return (
    <>
      <div className="panel h-48">
        <div className="active-main-wrap">
          <h5 className="box-heding-wrap">Active Project & Users</h5>
        </div>
        <div className="project-user-main-wrap">
          {/* First Circular Progress Bar */}
          <div className="project-user-bars-main-wrap">
            <div className="custom-project-user-bar">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="2"></circle>
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-blue-600 dark:text-blue-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="65" strokeLinecap="round"></circle>
              </svg>
              <div className="project-user-bars-val-wrap">
                <span className="time-regulate-val">18</span>
              </div>
            </div>
            <div className="project-user-bottom-heading">Time Regulation</div>
          </div>

          {/* Second Circular Progress Bar */}
          <div className="project-user-bars-main-wrap">
            <div className="custom-project-user-bar">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="2"></circle>
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-green-600 dark:text-green-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="45" strokeLinecap="round"></circle>
              </svg>
              <div className="project-user-bars-val-wrap">
                <span className="compoff-bar-val">2</span>
              </div>
            </div>
            <div className="project-user-bottom-heading">Comp Off</div>
          </div>

          {/* Third Circular Progress Bar */}
          <div className="project-user-bars-main-wrap">
            <div className="custom-project-user-bar">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="2"></circle>
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-red-600 dark:text-red-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="85" strokeLinecap="round"></circle>
              </svg>
              <div className="project-user-bars-val-wrap">
                <span className="leave-bar-val-wrapes">5</span>
              </div>
            </div>
            <div className="project-user-bottom-heading">Leave</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveProjectAndMembers;
