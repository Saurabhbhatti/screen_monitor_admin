import React from 'react';
import './WorkingTimeCard.css';

const WorkingTimeCard: React.FC = () => {
  return (
    <>
      <div className="panel h-48">
        <div className="main-heading-custom-wrap">
          <h5 className="heading-styling">
            <span className="spn-styling">Total Time Worked</span>
            6 Hr 18 Min
          </h5>
        </div>

        <div className="bars-main-wraps">
          {/* First Circular Progress Bar */}
          <div className="bars-sub-wrap">
            <div className="bar-circular-wrape">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="2"></circle>
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-blue-600 dark:text-blue-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="65" strokeLinecap="round"></circle>
              </svg>
              <div className="bar-circular-value">
                <span className="meeting-indicator">1</span>
              </div>
            </div>
            <div className="bar-bottom-labeling">Meetings</div>
          </div>

          {/* Second Circular Progress Bar */}
          <div className="bars-sub-wrap">
            <div className="bar-circular-wrape">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="2"></circle>
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-green-600 dark:text-green-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="45" strokeLinecap="round"></circle>
              </svg>
              <div className="bar-circular-value">
                <span className="work-indicator">5</span>
              </div>
            </div>
            <div className="bar-bottom-labeling">Work</div>
          </div>

          {/* Third Circular Progress Bar */}
          <div className="bars-sub-wrap">
            <div className="bar-circular-wrape">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="2"></circle>
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-red-600 dark:text-red-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="85" strokeLinecap="round"></circle>
              </svg>
              <div className="bar-circular-value">
                <span className="others-indicator">0.18</span>
              </div>
            </div>
            <div className="bar-bottom-labeling">Others</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkingTimeCard;
