import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {useTranslation} from 'next-i18next';
import {memo, useRef} from 'react';

interface InputCardNameProps {
    isLoading?: boolean;
    onChange: (value: string) => any;
}

export const InputCardName = memo((props: InputCardNameProps) => {
    const {t} = useTranslation('assets');
    const {isLoading, onChange} = props;
    const ref = useRef<HTMLInputElement>(null);

    return (
        <FormControl label={t('creditCard.new.form.name') as string} required>
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
