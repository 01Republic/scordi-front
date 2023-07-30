import React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import {MultiValue} from 'react-select';
// import { ColourOption, colourOptions } from '../data';
//
const colourOptions = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'},
];

const fetchData = () => {
    return new Promise((resolve) => {
        resolve([
            {value: 'chocolate', label: 'Chocolate'},
            {value: 'strawberry', label: 'Strawberry'},
            {value: 'vanilla', label: 'Vanilla'},
        ]);
    });
};

const filterColors = (inputValue: string) => {
    return colourOptions.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
};

const promiseOptions = (inputValue: string) => {
    return new Promise<any>((resolve) => {
        setTimeout(() => {
            resolve([
                {value: 'chocolate', label: 'Chocolate'},
                {value: 'strawberry', label: 'Strawberry'},
                {value: 'vanilla', label: 'Vanilla'},
            ]);
        }, 1000);
    });
};

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
