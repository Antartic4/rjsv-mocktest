import React, { useState } from 'react';

const SocialDistancingSchedule: React.FC = () => {
  const [socialDistancing, setSocialDistancing] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSocialDistancing(event.target.value);
  };

  return (
    <div>
      <h1 className="pb-1 text-sm font-bold text-[#1f3f6c]">
        Split schedule using social distancing?
      </h1>
      <div className="flex items-center justify-start gap-2 pb-2">
        <div className="flex items-center justify-center gap-2">
          <input
            id="radio-yes"
            type="radio"
            value="yes"
            name="social-distancing"
            className="w-10 h-10"
            onChange={handleChange}
            checked={socialDistancing === 'yes'}
          />
          <label
            htmlFor="radio-yes"
            className="w-full text-sm font-medium text-[#1f3f6c]"
          >
            Yes
          </label>
        </div>
        <div className="flex items-center justify-center gap-2">
          <input
            id="radio-no"
            type="radio"
            value="no"
            name="social-distancing"
            className="w-10 h-10"
            onChange={handleChange}
            checked={socialDistancing === 'no'}
          />
          <label
            htmlFor="radio-no"
            className="w-full text-sm font-medium text-[#1f3f6c]"
          >
            No
          </label>
        </div>
      </div>
    </div>
  );
};

export default SocialDistancingSchedule;
