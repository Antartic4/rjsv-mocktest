import React from 'react';

interface ClientTypeSelectorProps {
  clientType: 'single' | 'multiple';
  onClientTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ClientTypeSelector: React.FC<ClientTypeSelectorProps> = ({
  clientType,
  onClientTypeChange,
}) => {
  const options = [
    { value: 'single', label: 'Single' },
    { value: 'multiple', label: 'Multiple' },
  ];

  return (
    <div className="flex items-center justify-start gap-1">
      {options.map((option) => (
        <div
          key={option.value}
          className="flex items-center justify-center gap-1"
        >
          <input
            type="radio"
            value={option.value}
            name="clientType"
            checked={clientType === option.value}
            onChange={onClientTypeChange}
            className="w-8 h-8"
          />
          <label className="w-full text-xs font-medium text-[#1f3f6c]">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ClientTypeSelector;
