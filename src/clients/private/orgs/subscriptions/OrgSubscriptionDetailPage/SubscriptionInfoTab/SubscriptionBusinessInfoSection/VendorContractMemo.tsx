import React, {memo} from 'react';
import {useCurrentSubscription} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {EmptyValue} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/EmptyValue';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {VendorContractDto} from '^models/vendor/VendorContract/types';
import {UseFormReturn} from 'react-hook-form';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';

interface VendorContractMemoProps {
    isEditMode?: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
    vendorContract: VendorContractDto | undefined;
}

export const VendorContractMemo = memo((props: VendorContractMemoProps) => {
    const {isEditMode, form, vendorContract} = props;

    const value = !vendorContract?.memo ? <EmptyValue /> : vendorContract?.memo;

    return (
        <FormControl label="비고">
            {isEditMode ? (
                <input
                    className="w-full input border-gray-200 bg-gray-100 h-[50px]"
                    defaultValue={vendorContract?.memo || ''}
                    {...form.register('vendorContract.memo')}
                />
            ) : (
                <div className="flex items-center h-[50px] font-normal text-16 text-slate-950">{value}</div>
            )}
            <span />
        </FormControl>
    );
});
