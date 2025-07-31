import React, {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {ManualPaymentHistoryRegisterForm} from '../form-types';
import {ContentBox} from './ContentBox';
import {inputTextToCurrencyFormat} from '^utils/input-helper';

interface PayCurrencyContentProps {
    defaultValue?: BillingHistoryDto;
}

export const PayAmountContent = memo((props: PayCurrencyContentProps) => {
    const {defaultValue} = props;
    const {register} = useFormContext<ManualPaymentHistoryRegisterForm>();

    return (
        <ContentBox label="결제금액">
            <input
                defaultValue={defaultValue?.payAmount?.amount}
                placeholder="결제금액 입력"
                {...register('payAmount', {required: true, onChange: inputTextToCurrencyFormat})}
                className="flex items-center justify-between cursor-pointer rounded-lg px-3 py-4 text-14 whitespace-nowrap ring-1 ring-inset ring-gray-300 placeholder:text-gray-500"
            />
        </ContentBox>
    );
});
