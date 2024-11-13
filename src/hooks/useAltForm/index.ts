import {FormEvent, useCallback, useState} from 'react';
import {DeepPartial} from 'react-hook-form';
import {collectInputs} from '^utils/form';

interface UseAltFormOption<T> {
    plainTransform?: (data: T) => T;
}

export function useAltForm<T>(initialState: T | (() => T), option: UseAltFormOption<T> = {}) {
    const [formData, setFormData] = useState<T>(initialState);
    const {plainTransform = (d) => d} = option;

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

        handleSubmitPlain(submitHandler: (values: T) => any) {
            return (e: FormEvent<HTMLFormElement>) => {
                e.stopPropagation();
                e.preventDefault();
                const inputs = collectInputs(e.currentTarget); // <form>

                const data: any = {};
                inputs.map((input) => {
                    const key = input.name; // ""
                    const val = input.value; //
                    if (key) data[key] = val;
                });

                return submitHandler(plainTransform(data as T));
            };
        },
    };
}

export * from './makeFormHelper';
