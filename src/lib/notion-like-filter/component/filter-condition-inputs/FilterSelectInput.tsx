import React from 'react';

export const FilterSelectInput: React.FC<{
    defaultValue?: string;
    onChange?: (value: string) => any;
    options?: string[];
}> = ({defaultValue, onChange, options = []}) => {
    return (
        <select
            defaultValue={defaultValue || ''}
            onChange={(e) => onChange && onChange(e.target.value)}
            placeholder="값 입력"
            className="border rounded text-14 py-1 px-2 min-w-[150px]"
        >
            <option value="" disabled>
                값 선택
            </option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};
