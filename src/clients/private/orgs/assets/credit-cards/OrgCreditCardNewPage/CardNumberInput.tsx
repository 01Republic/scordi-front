import React from 'react';
import {NumericTextInput} from '^clients/private/_components/inputs/NumericTextInput';
import {inputTextToCardNumberInShortFormat} from '^utils/input-helper';

interface CardNumberInputProps {
    name?: string;
    defaultValue?: string;
    maxLength?: number;
    onBlur?: (val: string) => any;
    className?: string;
    readOnly?: boolean;
}

export const CardNumberInput = (props: CardNumberInputProps) => {
    const {name, defaultValue, maxLength = 4, onBlur, className = '', readOnly = false} = props;
    return (
        <NumericTextInput
            name={name}
            maxLength={maxLength}
            defaultValue={defaultValue}
            className={`input input-underline !bg-slate-100 px-2 w-full ${className}`}
            onChange={inputTextToCardNumberInShortFormat}
            onBlur={(e) => {
                const val = inputTextToCardNumberInShortFormat(e);
                onBlur && onBlur(val);
            }}
            readOnly={readOnly}
        />
    );
};
