import React, {FormEventHandler, memo} from 'react';
import {UseFormHandleSubmit, UseFormRegisterReturn} from 'react-hook-form/dist/types/form';
import {TextInput} from '^components/TextInput';
import {Search} from 'lucide-react';

export interface SearchInputProps<T> {
    onSubmit?: (value: string) => any | undefined;
    register?: UseFormRegisterReturn<string>;
    defaultValue?: string;
    autoComplete?: boolean;
    autoFocus?: boolean;
}

export const SearchInput = memo(<T,>(props: SearchInputProps<T>) => {
    const {onSubmit, register, defaultValue, autoComplete = true, autoFocus = false} = props;
    return (
        <div className="relative">
            <TextInput
                onKeyUp={(e) => e.key === 'Enter' && onSubmit && onSubmit(e.target.value)}
                placeholder="Search .."
                autoComplete={autoComplete ? 'on' : 'off'}
                autoFocus={autoFocus}
                defaultValue={defaultValue}
                {...register}
            />
            <button type="submit" className="btn btn-link absolute top-0 text-gray-500" style={{right: 0}}>
                <Search className="w-5 h-5" />
            </button>
        </div>
    );
});
