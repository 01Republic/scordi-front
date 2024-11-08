import {useState} from 'react';

export const useInviteInputs = () => {
    const [inputs, setInputs] = useState<string[]>([]);

    const addInput = (value: string) => {
        setInputs((values) => [...values, value]);
    };

    const updateInput = (_old: string, _new: string) => {
        setInputs((vs) => {
            return [...vs].map((v) => (v === _old ? _new : v));
        });
    };

    const removeInput = (value: string) => {
        setInputs((values) => {
            return [...values].filter((v) => v !== value);
        });
    };

    const resetInputs = () => setInputs([]);

    return {inputs, addInput, updateInput, removeInput, resetInputs};
};
