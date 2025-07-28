import React from 'react';

export const FilterMultiSelectInput: React.FC<{
    defaultValue?: string;
    onChange?: (value: string) => any;
}> = ({defaultValue, onChange}) => {
    return (
        <input
            type="text"
            value={defaultValue || ''}
            onChange={(e) => onChange && onChange(e.target.value)}
            placeholder="값 입력"
            className="border rounded text-14 py-1 px-2 min-w-[150px]"
        />
    );
};
