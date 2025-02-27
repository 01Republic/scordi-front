import React from 'react';

interface PlainSelectProps<T extends string | number> {
    defaultValue: T;
    onChange: (value: T) => any;
    values: T[];
    toLabel: (value: T) => string;
}

export const PlainSelect = <T extends string | number>(props: PlainSelectProps<T>) => {
    const {defaultValue, onChange, values, toLabel} = props;

    return (
        <select
            className="select select-sm select-bordered w-full min-w-[142px]"
            defaultValue={defaultValue}
            onChange={(e) => {
                onChange(e.target.value as T);
            }}
        >
            {values.map((value, i) => (
                <option key={i} value={value} selected={value === defaultValue}>
                    {toLabel(value)}
                </option>
            ))}
        </select>
    );
};
