import React from 'react';

interface GrowthTextProps {
  number: number;
  label?: string;
  className?: string;
  hasPlusIcon?: boolean;
}

export const GrowthText: React.FC<GrowthTextProps> = ({
  number,
  label,
  className,
  hasPlusIcon = false,
}) => {
  return (
    <div
      className={`flex space-x-1 ${className} ${
        number > 0 ? 'text-[#FA5252]' : number < 0 ? 'text-[#2272EB]' : ''
      }`}
    >
      {label && <p>{label}</p>}
      {hasPlusIcon && <p>{number > 0 ? '+' : ''}</p>}
      <p>{number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}%</p>
      <p>{number > 0 ? '↑' : number < 0 ? '↓' : ''}</p>
    </div>
  );
};
