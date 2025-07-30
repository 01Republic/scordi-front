import React, {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {CurrencyCode} from '^models/Money';
import {ManualPaymentHistoryRegisterForm} from '../form-types';
import {PayCurrencySelect} from '^_components/dropdown-select/PayCurrencySelect';
import {ContentBox} from './ContentBox';

interface PayCurrencyContentProps {
    defaultValue?: BillingHistoryDto;
}

export const PayCurrencyContent = memo((props: PayCurrencyContentProps) => {
    const {defaultValue} = props;
    const {register, setValue} = useFormContext<ManualPaymentHistoryRegisterForm>();

    const handleDateChange = (code: CurrencyCode) => {
        setValue('payCurrency', code, {shouldValidate: true});
    };
    return (
        <ContentBox label="결제 통화">
            <input type="hidden" {...register('payCurrency')} />
            <PayCurrencySelect defaultValue={defaultValue?.payAmount?.code} onSelect={handleDateChange} />
        </ContentBox>
    );
});
