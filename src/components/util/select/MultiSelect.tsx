import React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import {MultiValue, ActionMeta} from 'react-select';

export interface Option {
    value: any;
    label: any;
    __isNew__?: boolean;
}

interface MultiSelectProps {
    value: Option[];
    loadOptions: (inputValue: string) => Promise<Option[]>;
    onChange: (options: MultiValue<Option>, action?: ActionMeta<Option>) => any;
}

export const MultiSelect = ({value, loadOptions, onChange}: MultiSelectProps) => {
    return (
        <AsyncCreatableSelect
            isMulti
            cacheOptions
            defaultOptions
            // getOptionLabel={getOptionLabel}
            value={value}
            loadOptions={loadOptions}
            onChange={(newValue, actionMeta) => onChange(newValue, actionMeta)}
            isClearable={true}
            backspaceRemovesValue={true}
        />
    );
};
