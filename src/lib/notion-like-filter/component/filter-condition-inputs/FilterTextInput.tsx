import React, {forwardRef, memo, useCallback, useState} from 'react';

interface Props {
    defaultValue?: string;
    onChange?: (value: string) => any;
}

export const FilterTextInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
    const {defaultValue, onChange} = props;
    const [val, setVal] = useState(defaultValue || '');

    const change = useCallback((v: string) => {
        setVal(v);
        onChange && onChange(v);
    }, []);

    return (
        <input
            ref={ref}
            type="text"
            defaultValue={val || ''}
            onChange={(e) => {
                if (e.target.value === val) return;
                change(e.target.value);
            }}
            placeholder="값 입력"
            className="border rounded text-14 py-1 px-2 min-w-[150px]"
        />
    );
});
