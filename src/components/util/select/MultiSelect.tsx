import React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import {MultiValue, ActionMeta, StylesConfig} from 'react-select';

export interface Option {
    value: any;
    label: any;
    __isNew__?: boolean;
}

interface MultiSelectProps {
    value: Option[];
    defaultOptions?: Option[];
    loadOptions: (inputValue: string) => Promise<Option[]>;
    onChange: (options: MultiValue<Option>, action?: ActionMeta<Option>) => any;
    style?: StylesConfig<Option>;
}

export const MultiSelect = ({value, defaultOptions, loadOptions, onChange, style}: MultiSelectProps) => {
    return (
        <AsyncCreatableSelect
            isMulti
            cacheOptions
            defaultOptions={defaultOptions ?? true}
            // getOptionLabel={getOptionLabel}
            value={value}
            loadOptions={loadOptions}
            onChange={(newValue, actionMeta) => onChange(newValue, actionMeta)}
            isClearable={true}
            backspaceRemovesValue={true}
            styles={style}
        />
    );
};
