import React, {forwardRef} from 'react';

interface Props {
    defaultValue?: string;
    onChange?: (value: string) => any;
}

export const FilterNumberInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
    const {defaultValue, onChange} = props;
    return (
        <input
            ref={ref}
            type="number"
            value={defaultValue || ''}
            onChange={(e) => onChange && onChange(e.target.value)}
            placeholder="값 입력"
            className="border rounded text-14 py-1 px-2 min-w-[150px]"
        />
    );
});
