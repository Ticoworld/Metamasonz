import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <span className="text-4xl font-bold text-gray-900 dark:text-gray-100 relative">
        METAMASONZ
        <span className="absolute left-0 top-0 w-full h-full text-gray-300 dark:text-gray-600 animate-text-reveal">
          METAMASONZ
        </span>
      </span>

      <style>
        {`
          @keyframes text-reveal {
            0% { height: 100%; }
            100% { height: 0%; }
          }

          .animate-text-reveal {
            text-shadow: 0 0 2px currentColor, 
                          0 0 1px currentColor, 
                          0 0 1px currentColor;
            overflow: hidden;
            box-sizing: border-box;
            animation: text-reveal 3s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;