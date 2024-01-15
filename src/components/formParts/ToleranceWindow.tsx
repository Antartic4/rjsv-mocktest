import React, { FC, useState } from 'react';

interface ToleranceWindowProps {
  isChecked: boolean;
}

const ToleranceWindow: FC<ToleranceWindowProps> = ({ isChecked }) => {
  const [toggleState, setToggleState] = useState(isChecked);

  const handleToggle = () => {
    setToggleState((prevState) => !prevState);
  };

  return (
    <div className="pb-2 text-left">
      <h1 className="pt-2 text-sm font-bold text-[#1f3f6c]">
        Tolerance Window:
      </h1>
      <div className="flex justify-start gap-3 pt-2">
        <div>
          <h1 className="text-base font-semibold">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={toggleState}
                onChange={handleToggle}
              />
              <div
                className={`w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 ${
                  toggleState ? 'peer-checked:after:translate-x-full' : ''
                } rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1f3f6c]`}
              />
              <span className="text-xs font-medium text-[#1f3f6c] ms-3">
                {toggleState ? 'Toggle ON' : 'Toggle OFF'}
              </span>
            </label>
          </h1>
        </div>
        <div className="border-l border-r border-gray-300"></div>
        <div className="flex gap-1 accent-indigo-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#1f3f6c"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h1 className="text-[#1f3f6c] text-xs">Select Tolerance Level</h1>
        </div>
      </div>
    </div>
  );
};

export default ToleranceWindow;
