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
        setValue('payCurrency', code, {shouldValidate: true, shouldDirty: true});
    };

    // abroadPayAmount는 외화 금액인 경우만 들어가는 값으로
    // abroadPayAmount가 없다면 원화인 경우 이기 때문에 아래와 같이 처리함.
    const payAmountCode = defaultValue?.payAmount?.code;
    const abroadPayAmountCode = defaultValue?.abroadPayAmount?.code;

    return (
        <ContentBox label="결제 통화">
            <input type="hidden" {...register('payCurrency', {required: true})} />
            <PayCurrencySelect
                defaultValue={abroadPayAmountCode ? abroadPayAmountCode : payAmountCode}
                onSelect={handleDateChange}
            />
        </ContentBox>
    );
});
