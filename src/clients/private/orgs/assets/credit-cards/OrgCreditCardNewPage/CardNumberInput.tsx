import React, {memo} from 'react';
import {NumericTextInput} from '^clients/private/_components/inputs/NumericTextInput';
import {inputTextToCardNumberInShortFormat} from '^utils/input-helper';
import {FormControl} from '^clients/private/_components/inputs/FormControl';

interface CardNumberInputProps {
    name?: string;
    defaultValue?: string;
    maxLength?: number;
    // onChange?: (val: string) => any;
    onBlur?: (val: string) => any;
    className?: string;
    readOnly?: boolean;
}

export const CardNumberInput = (props: CardNumberInputProps) => {
    const {name, defaultValue, maxLength = 4, onBlur, className = '', readOnly = false} = props;
    return (
        <NumericTextInput
            name={name}
            minLength={4}
            maxLength={maxLength}
            placeholder="●●●●"
            defaultValue={defaultValue}
            invalidMessage="번호가 너무 짧아요"
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
