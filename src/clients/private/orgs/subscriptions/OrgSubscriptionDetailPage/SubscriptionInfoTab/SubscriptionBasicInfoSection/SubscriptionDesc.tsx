import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {EmptyValue} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/EmptyValue';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {WithChildren} from '^types/global.type';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';

interface SubscriptionDescProps extends WithChildren {
    isEditMode?: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
    defaultValue?: string | null;
}

export const SubscriptionDesc = memo((props: SubscriptionDescProps) => {
    const {t} = useTranslation('subscription');
    const {isEditMode, form, defaultValue} = props;

    const value = defaultValue ? defaultValue : <EmptyValue />;

    return (
        <FormControl label={t('detail.basicInfo.note')}>
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
