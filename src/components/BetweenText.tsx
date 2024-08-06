import React from 'react';

interface BetweenTextProps {
    label: string;
    number: number;
    className?: string;
}

export const BetweenText: React.FC<BetweenTextProps> = ({label, number, className}) => {
    return (
        <div className={`flex items-center justify-between text-sm text-gray-600 ${className}`}>
            <p>{label}</p>
            <p>{number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>
        </div>
    );
};
