import React from 'react';
import './AttendanceCard.css';

const AttendanceCard: React.FC = () => {
  return (
    <>
      <div className="panel h-48">
        <div className="attandence-bar-main-wrape">
          <h5 className="attamdence-bar-label">
            <span className="attandence-label-styling">Attendance</span>
            25
          </h5>
        </div>

        <div className="attand-bars-box">
          {/* First Circular Progress Bar */}
          <div className="attnd-bar-sub-wrapes">
            <div className='attand-circular-styling'>
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="2"></circle>
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-blue-600 dark:text-blue-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="65" strokeLinecap="round"></circle>
              </svg>
              <div className="attand-bar-value-main-wrap">
                <span className="present-bar-value-wrap">18</span>
              </div>
            </div>
            <div className="attand-bars-bottom-label">Present</div>
          </div>

          {/* Second Circular Progress Bar */}
          <div className="attnd-bar-sub-wrapes">
            <div className="attand-circular-styling"> {/* Match size */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="2"></circle>
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-green-600 dark:text-green-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="45" strokeLinecap="round"></circle>
              </svg>
              <div className="attand-bar-value-main-wrap">
                <span className="absent-bar-value-wrap">2</span>
              </div>
            </div>
            <div className="attand-bars-bottom-label">Absent</div>
          </div>

          {/* Third Circular Progress Bar */}
          <div className="attnd-bar-sub-wrapes">
            <div className="attand-circular-styling"> {/* Match size */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="2"></circle>
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-red-600 dark:text-red-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="85" strokeLinecap="round"></circle>
              </svg>
              <div className="attand-bar-value-main-wrap">
                <span className="late-bar-value-wrap">5</span>
              </div>
            </div>
            <div className="attand-bars-bottom-label">Late</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendanceCard;
