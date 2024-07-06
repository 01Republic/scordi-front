import {DeepPartial} from 'react-hook-form';
import {Dispatch, SetStateAction} from 'react';

export function makeFormHelper<T>(setFormData: Dispatch<SetStateAction<T>>) {
    return {
        setFormValue(values: DeepPartial<T>) {
            setFormData((f) => ({...f, ...values}));
        },
    };
}
