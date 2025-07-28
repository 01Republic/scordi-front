import React, {forwardRef} from 'react';

interface Props {
    defaultValue?: string;
    onChange?: (value: string) => any;
    options?: string[];
}
export const FilterSelectInput = forwardRef<HTMLSelectElement, Props>((props, ref) => {
    const {defaultValue, onChange, options = []} = props;
    return (
        <select
            ref={ref}
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
});
