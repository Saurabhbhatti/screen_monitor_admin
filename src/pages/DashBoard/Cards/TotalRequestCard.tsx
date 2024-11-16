import React from 'react';
import './TotalRequestCard.css';

const TotalRequestCard: React.FC = () => {
  return (
    <>
      <div className="panel h-48">
        <div className="total-req-main-wrap">
          <h5 className="total-req-header">
            <span className="req-spn-value">Total Request</span>
            20
          </h5>
        </div>

        <div className="req-bar-main-wrapes">
          {/* First Circular Progress Bar */}
          <div className="req-bar-sub-wrapes">
            <div className="req-bar-custom-styles">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="2"></circle>
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-blue-600 dark:text-blue-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="65" strokeLinecap="round"></circle>
              </svg>
              <div className="req-bar-val-wrap">
                <span className="regulate-bar-val-wrap">18</span>
              </div>
            </div>
            <div className="leaves-bar-bottom-heading">Regulation</div>
          </div>

          {/* Second Circular Progress Bar */}
          <div className="req-bar-sub-wrapes">
            <div className="req-bar-custom-styles">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="2"></circle>
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-green-600 dark:text-green-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="45" strokeLinecap="round"></circle>
              </svg>
              <div className="req-bar-val-wrap">
                <span className="compoff-bar-val-wrap">2</span>
              </div>
            </div>
            <div className="leaves-bar-bottom-heading">CompOff</div>
          </div>

          {/* Third Circular Progress Bar */}
          <div className="req-bar-sub-wrapes">
            <div className="req-bar-custom-styles">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="2"></circle>
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-red-600 dark:text-red-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="85" strokeLinecap="round"></circle>
              </svg>
              <div className="req-bar-val-wrap">
                <span className="leave-bar-val-wrapes">5</span>
              </div>
            </div>
            <div className="leaves-bar-bottom-heading">Leave</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalRequestCard;
