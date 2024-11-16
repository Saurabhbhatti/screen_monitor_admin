import React from 'react';
import './LeaveDetailsCard.css';

const LeaveDetailsCard: React.FC = () => {
  return (
    <>
      <div className="panel h-48">
        <div className="leave-detail-main-wrap">
          <h5 className="leave-bar-header">Leave Details</h5>
        </div>

        <div className="leave-circular-main-wrap">
          {/* First Circular Progress Bar */}
          <div className="leave-bars-main-wrapes">
            <div className="circular-bar-main"> {/* Match size */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="2"></circle>
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-blue-600 dark:text-blue-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="65" strokeLinecap="round"></circle>
              </svg>
              <div className="leave-bars-value-main-wrap">
                <span className="taken-leave-val">5</span>
              </div>
            </div>
            <div className="leave-bar-bottom-title">Leave Taken</div>
          </div>

          {/* Second Circular Progress Bar */}
          <div className="leave-bars-main-wrapes">
            <div className="circular-bar-main"> {/* Match size */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="2"></circle>
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-green-600 dark:text-green-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="45" strokeLinecap="round"></circle>
              </svg>
              <div className="leave-bars-value-main-wrap">
                <span className="available-pl-val">7</span>
              </div>
            </div>
            <div className="leave-bar-bottom-title">Available. PL</div>
          </div>

          {/* Third Circular Progress Bar */}
          <div className="leave-bars-main-wrapes">
            <div className="circular-bar-main"> {/* Match size */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="2"></circle>
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-red-600 dark:text-red-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="85" strokeLinecap="round"></circle>
              </svg>
              <div className="leave-bars-value-main-wrap">
                <span className="avail-compoff-val">2</span>
              </div>
            </div>
            <div className="leave-bar-bottom-title">Avail. CompOff</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveDetailsCard;
