import React, {memo} from 'react';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {useFormContext} from 'react-hook-form';
import {BillingHistoryStatusSelect} from '^_components/dropdown-select/BillingHistoryStatusSelect';
import {ManualPaymentHistoryRegisterForm} from '^clients/private/_modals/ManualBillingHistoryModal/form-types';
import {ContentBox} from '^clients/private/_modals/ManualBillingHistoryModal/billingHistoryContents/ContentBox';

interface BillingHistoryStatusContentProps {
    defaultValue?: BillingHistoryDto;
}

/* 선택된 결제 상태 값에 따라 api 요청 시 보내는 값이 paidAt 또는 lastRequestedAt 에 담기게 됩니다 */
export const BillingHistoryStatusContent = memo((props: BillingHistoryStatusContentProps) => {
    const {defaultValue} = props;
    const {setValue, register} = useFormContext<ManualPaymentHistoryRegisterForm>();

    return (
        <ContentBox label="결제상태">
            <input type="hidden" {...register('billingHistoryStatus', {required: true})} />
            <BillingHistoryStatusSelect
                defaultValue={defaultValue?.about}
                onSelect={(item) => setValue('billingHistoryStatus', item, {shouldValidate: true})}
            />
        </ContentBox>
    );
});
