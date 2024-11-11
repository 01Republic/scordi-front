import React, {memo, useRef} from 'react';
import {FormControl} from '^clients/private/_components/inputs/FormControl';

interface InputCardNameProps {
    isLoading?: boolean;
    onChange: (value: string) => any;
}

export const InputCardName = memo((props: InputCardNameProps) => {
    const {isLoading, onChange} = props;
    const ref = useRef<HTMLInputElement>(null);

    return (
        <FormControl label="카드 이름" required>
            <input
                ref={ref}
                className={`input input-underline !bg-slate-100 w-full ${
                    isLoading ? 'opacity-50 pointer-events-none' : ''
                }`}
                onBlur={(e) => onChange(e.target.value)}
                readOnly={isLoading}
                required
            />
            <span />
        </FormControl>
    );
});
InputCardName.displayName = 'InputCardName';
