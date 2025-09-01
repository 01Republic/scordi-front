import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {useCurrentSubscription} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {UseFormReturn} from 'react-hook-form';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {EmptyValue} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/EmptyValue';

interface SubscriptionDescProps extends WithChildren {
    isEditMode?: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
    defaultValue?: string | null;
}

export const SubscriptionDesc = memo((props: SubscriptionDescProps) => {
    const {isEditMode, form, defaultValue} = props;

    const value = defaultValue ? defaultValue : <EmptyValue />;

    return (
        <FormControl label="비고">
            {isEditMode ? (
                <input
                    className="w-full input border-gray-200 bg-gray-100 h-[50px]"
                    defaultValue={defaultValue || ''}
                    {...form.register('desc')}
                />
            ) : (
                <div className="flex items-center h-[50px] font-normal text-16 text-slate-950">{value}</div>
            )}
            <span />
        </FormControl>
    );
});
