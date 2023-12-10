import React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import {MultiValue, ActionMeta, StylesConfig} from 'react-select';
import {Option} from '^components/util/react-select/Option';

interface MultiSelectProps {
    value: Option[];
    defaultOptions?: Option[];
    defaultValue?: Option;
    loadOptions: (inputValue: string) => Promise<Option[]>;
    onChange: (options: MultiValue<Option>, action?: ActionMeta<Option>) => any;
    style?: StylesConfig<Option>;
}

export const MultiSelect = ({value, defaultOptions, defaultValue, loadOptions, onChange, style}: MultiSelectProps) => {
    return (
        <AsyncCreatableSelect
            isMulti
            cacheOptions
            defaultOptions={defaultOptions ?? true}
            // getOptionLabel={getOptionLabel}
            defaultValue={defaultValue}
            value={value}
            loadOptions={loadOptions}
            onChange={(newValue, actionMeta) => {
                onChange(newValue, actionMeta);
            }}
            isClearable={true}
            backspaceRemovesValue={true}
            styles={style}
        />
    );
};
