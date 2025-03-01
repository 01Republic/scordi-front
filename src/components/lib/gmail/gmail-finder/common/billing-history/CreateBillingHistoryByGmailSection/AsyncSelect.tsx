import React, {ForwardedRef, forwardRef, memo} from 'react';
import {customStyle2} from '^clients/private/_components/inputs/select/CreatableSelect/customStyle';
import {ActionMeta, CSSObjectWithLabel, SingleValue} from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';

export type AsyncSelectOption = {
    label: JSX.Element;
    value: number;
};

interface AsyncSelectProps {
    placeholder: string;
    onChange: (value?: number) => any;
    defaultOptions?: AsyncSelectOption[];
    loadOptions: (keyword?: string) => Promise<AsyncSelectOption[]>;
}

// 이메일에서 결제내역 생성하는 폼에서만 사용하는 Select 인풋
export const AsyncSelect = forwardRef((props: AsyncSelectProps, ref) => {
    const {placeholder, defaultOptions, loadOptions, onChange} = props;

    return (
        <AsyncCreatableSelect<any, false>
            ref={ref}
            isClearable
            className="select select-bordered select-sm w-full"
            placeholder={placeholder}
            styles={{
                ...customStyle2,
                menu: (base: CSSObjectWithLabel) => ({...base, width: 'auto', minWidth: '100%', right: 0}),
            }}
            defaultOptions={defaultOptions}
            loadOptions={loadOptions}
            loadingMessage={(props: {inputValue: string}) => <span>'{props.inputValue}'를 찾는 중</span>}
            noOptionsMessage={(props: {inputValue: string}) => <span>'{props.inputValue}'는 없네요</span>}
            onChange={(option: SingleValue<AsyncSelectOption>, actionMeta: ActionMeta<AsyncSelectOption>) => {
                onChange(option?.value || undefined);
            }}
        />
    );
});
AsyncSelect.displayName = 'AsyncSelect';
