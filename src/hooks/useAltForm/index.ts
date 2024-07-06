import {FormEvent, useState} from 'react';
import {DeepPartial} from 'react-hook-form';

export function useAltForm<T>(initialState: T | (() => T)) {
    const [formData, setFormData] = useState<T>(initialState);

    return {
        formData,

        setFormValue(values: DeepPartial<T>) {
            setFormData((f) => ({...f, ...values}));
        },

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
