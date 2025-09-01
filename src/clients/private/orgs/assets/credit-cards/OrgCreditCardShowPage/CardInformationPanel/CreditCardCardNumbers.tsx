import React, {memo} from 'react';
import {FormControl} from './FormControl';
import {CardNumberInput} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardNewPage/CardNumberInput';
import {WithChildren} from '^types/global.type';
import {CreditCardDto} from '^models/CreditCard/type';

interface CreditCardCardNumbersProps extends WithChildren {
    isEditMode: boolean;
    isLoading: boolean;
    value: CreditCardDto;
}

export const CreditCardCardNumbers = memo((props: CreditCardCardNumbersProps) => {
    const {isEditMode, isLoading, value, children} = props;

    return (
        <FormControl label="카드번호">
            {isEditMode ? (
                <div className={`grid gap-1.5 ${value.isAmexCard ? 'grid-cols-3' : 'grid-cols-4'}`}>{children}</div>
            ) : (
                <div className="flex items-center h-[33.5px]">
                    <span className="w-full whitespace-nowrap overflow-hidden text-ellipsis">
                        {value.displayFullNumber}
                    </span>
                </div>
            )}
            <span />
        </FormControl>
    );
});
CreditCardCardNumbers.displayName = 'CreditCardCardNumbers';

interface CreditCardCardNumberProps {
    isLoading: boolean;
    defaultValue?: string;
    onChange: (value: string) => any;
    maxLength?: number;
}

export const CreditCardCardNumber = (props: CreditCardCardNumberProps) => {
    const {defaultValue, onChange} = props;
    const {isLoading, maxLength = 4} = props;

    return (
        <div>
            <CardNumberInput
                maxLength={maxLength}
                defaultValue={defaultValue}
                onBlur={onChange}
                className={`${isLoading ? 'opacity-50 pointer-events-none' : ''} input-sm !px-1`}
                readOnly={isLoading}
            />
            <span />
        </div>
    );
};
