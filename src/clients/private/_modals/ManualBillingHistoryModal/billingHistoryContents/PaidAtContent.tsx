import React, {memo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {ManualPaymentHistoryRegisterForm} from '../form-types';
import {SingleCalendar} from '^components/ui/calenders/SingleCalender';
import {ContentBox} from './ContentBox';

interface PaidAtContentProps {
    defaultValue?: BillingHistoryDto;
}

export const PaidAtContent = memo((props: PaidAtContentProps) => {
    const {defaultValue} = props;
    const [selectDate, setSelectDate] = useState<Date | null>(null);
    const {register, setValue} = useFormContext<ManualPaymentHistoryRegisterForm>();

    const handleDateChange = (date: Date) => {
        setSelectDate(date);
        setValue('payDate', date, {shouldValidate: true});
    };

    const paidAt = defaultValue?.paidAt || undefined;
    const lastRequestedAt = defaultValue?.lastRequestedAt || undefined;

    return (
        <ContentBox label="결제일">
            <input type="hidden" {...register('payDate')} />
            <SingleCalendar
                defaultValue={paidAt || lastRequestedAt}
                date={selectDate}
                onChange={handleDateChange}
                textColor="text-gray-900"
                textSize="text-14"
                textHover="group-hover:text-scordi-300"
                placeHolder="결제일 선택"
                containerClassName="flex-1 px-3 py-2 ring-1 ring-inset ring-gray-300 overflow-hidden rounded-lg"
                mainAxis={15}
                crossAxis={-10}
            />
        </ContentBox>
    );
});
