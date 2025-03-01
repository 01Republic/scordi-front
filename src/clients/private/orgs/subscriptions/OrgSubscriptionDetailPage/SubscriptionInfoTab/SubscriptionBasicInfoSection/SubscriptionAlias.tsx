import React, {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {WithChildren} from '^types/global.type';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {useCurrentSubscription} from '../../atom';
import {EmptyValue} from '../../EmptyValue';

interface CardSectionInputProps extends WithChildren {
    isEditMode?: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
}

export const SubscriptionAlias = memo((props: CardSectionInputProps) => {
    const {isEditMode, form} = props;
    const {currentSubscription: subscription} = useCurrentSubscription();

    if (!subscription) return <></>;

    const value = subscription.alias.length === 0 ? <EmptyValue /> : subscription.alias;

    return (
        <FormControl label="워크스페이스명">
            {isEditMode ? (
                <input
                    className="w-full input border-gray-200 bg-gray-100 h-[50px]"
                    defaultValue={subscription.alias}
                    {...form.register('alias')}
                />
            ) : (
                <div className="flex items-center h-[50px] font-normal text-16 text-slate-950">{value}</div>
            )}
            <span />
        </FormControl>
    );
});
