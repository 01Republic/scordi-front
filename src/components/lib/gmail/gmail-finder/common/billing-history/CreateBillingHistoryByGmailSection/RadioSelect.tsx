import React from 'react';

interface RadioSelectProps<T> {
    name: string;
    defaultValue: T;
    onChange: (value: T) => any;
    values: T[];
    toLabel: (value: T) => string;
}

export const RadioSelect = <T,>(props: RadioSelectProps<T>) => {
    const {name, defaultValue, values, toLabel, onChange} = props;

    return (
        <div className="flex items-center gap-3">
            {values.map((value, i) => (
                <label key={i} className="flex items-center gap-1.5">
                    <input
                        type="radio"
                        className="radio radio-xs radio-primary"
                        name={name}
                        defaultChecked={value === defaultValue}
                        onChange={() => onChange(value)}
                    />
                    <span>{toLabel(value)}</span>
                </label>
            ))}
        </div>
    );
};
