import React, {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {WithChildren} from '^types/global.type';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {TeamMemberSelectColumn} from '^models/TeamMember/components/TeamMemberSelectColumn';
import {TeamMemberProfileCompact} from '^models/TeamMember/components/TeamMemberProfile';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {EmptyValue} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/EmptyValue';
import {useCurrentSubscription} from '../../atom';

interface SubscriptionMasterProps extends WithChildren {
    isEditMode: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
}

export const SubscriptionMaster = memo((props: SubscriptionMasterProps) => {
    const {isEditMode, form} = props;

    const {currentSubscription: subscription} = useCurrentSubscription();

    if (!subscription) return <></>;

    return (
        <FormControl label="담당자">
            {isEditMode ? (
                <TeamMemberSelectColumn
                    className={'input border-gray-200 bg-gray-100 w-full flex flex-col justify-center h-[50px]'}
                    defaultValue={subscription?.master}
                    onChange={(teamMember) => {
                        form.setValue('masterId', teamMember?.id);
                    }}
                />
            ) : (
                <div className="flex items-center h-[50px] font-normal text-16 text-slate-950">
                    {subscription?.master ? <TeamMemberProfileCompact item={subscription?.master} /> : <EmptyValue />}
                </div>
            )}
            <span />
        </FormControl>
    );
});
