import React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import {MultiValue} from 'react-select';

interface Option {
    value: string;
    label: string;
}

interface MultiSelectProps {
    value: Option[];
    loadOptions: (inputValue: string) => Promise<Option[]>;
    onChange: (options: MultiValue<Option>) => any;
}

export const MultiSelect = ({value, loadOptions, onChange}: MultiSelectProps) => (
    <AsyncCreatableSelect
        isMulti
        cacheOptions
        defaultOptions
        // getOptionLabel={getOptionLabel}
        value={value}
        loadOptions={loadOptions}
        onChange={(newValue) => onChange(newValue)}
    />
);
