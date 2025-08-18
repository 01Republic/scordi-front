import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {EmptyValue} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/EmptyValue';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {TeamMemberDto} from '^models/TeamMember';
import {TeamMemberProfileCompact} from '^models/TeamMember/components/TeamMemberProfile';
import {TeamMemberSelectColumn} from '^models/TeamMember/components/TeamMemberSelectColumn';
import {WithChildren} from '^types/global.type';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {useCurrentSubscription} from '../../atom';

interface SubscriptionMasterProps extends WithChildren {
    isEditMode: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
    defaultValue?: TeamMemberDto | undefined;
}

export const SubscriptionMaster = memo((props: SubscriptionMasterProps) => {
    const {t} = useTranslation('subscription');
    const {isEditMode, form, defaultValue} = props;

    const {currentSubscription: subscription} = useCurrentSubscription();

    if (!subscription) return <></>;

    return (
        <FormControl label={t('detail.basicInfo.manager')}>
            {isEditMode ? (
                <TeamMemberSelectColumn
                    className={'input border-gray-200 bg-gray-100 w-full flex flex-col justify-center h-[50px]'}
                    defaultValue={defaultValue}
                    onChange={(teamMember) => {
                        form.setValue('masterId', teamMember?.id);
                    }}
                />
            ) : (
                <div className="flex items-center h-[50px] font-normal text-16 text-slate-950">
                    {defaultValue ? <TeamMemberProfileCompact item={defaultValue} /> : <EmptyValue />}
                </div>
            )}
            <span />
        </FormControl>
    );
});
