import React, {ChangeEvent, FormEvent, memo, MutableRefObject} from 'react';

interface CardNumberInputProps {
    defaultValue: string | null | undefined;
    inputRef: MutableRefObject<HTMLInputElement | null>;
    nextInputRef?: MutableRefObject<HTMLInputElement | null>;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const CardNumberInput = memo((props: CardNumberInputProps) => {
    const {defaultValue, inputRef, nextInputRef, onChange} = props;

    const sliceMaxLength = (e: FormEvent<HTMLInputElement>) => {
        const value = `${e.currentTarget.value}`.trim();
        const maxLen = e.currentTarget.maxLength || 4;
        if (value.length > maxLen) e.currentTarget.value = value.slice(0, maxLen);
    };

    const moveNextInput = (value: string, nextInputRef: MutableRefObject<HTMLInputElement | null>) => {
        if (value.length == 4) nextInputRef.current?.focus();
    };

    return (
        <input
            ref={inputRef}
            type="number"
            placeholder="● ● ● ●"
            maxLength={4}
            defaultValue={defaultValue ?? ''}
            className="input input-bordered w-full placeholder:text-[0.5rem]"
            onChange={(e) => {
                onChange(e);
                nextInputRef && moveNextInput(`${e.target.value}`.trim(), nextInputRef);
            }}
            onInput={(e) => sliceMaxLength(e)}
        />
    );
});
