import {FormEvent, useCallback, useState} from 'react';
import {DeepPartial} from 'react-hook-form';

export function useAltForm<T>(initialState: T | (() => T)) {
    const [formData, setFormData] = useState<T>(initialState);

    const setFormValue = useCallback(
        (values: DeepPartial<T>) => {
            setFormData((f) => ({...f, ...values}));
        },
        [setFormData],
    );

    return {
        formData,
        setFormValue,

        handleSubmit(submitHandler: (values: T) => any) {
            return (e: FormEvent<HTMLFormElement>) => {
                e.stopPropagation();
                e.preventDefault();
                return submitHandler(formData);
            };
        },
    };
}

export * from './makeFormHelper';
