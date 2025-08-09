import {LinkTo} from '^components/util/LinkTo';
import {SubscriptionProfile} from '^models/Subscription/components';
import {SubscriptionDto} from '^models/Subscription/types';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';
import {currencyFormatWithI18n, roundNumber} from '^utils/number';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface PaidSubscriptionSpendItemProps {
    amount: number;
    subscription: SubscriptionDto;
}

export const PaidSubscriptionSpendItem = memo((props: PaidSubscriptionSpendItemProps) => {
    const {amount, subscription} = props;
    const {t} = useTranslation('common');

    return (
        <li className="w-full">
            <LinkTo
                href={OrgSubscriptionDetailPageRoute.path(subscription.organizationId, subscription.id)}
                className="w-full py-5 flex items-center justify-between"
            >
                <SubscriptionProfile
                    subscription={subscription}
                    width={20}
                    height={20}
                    className="gap-3"
                    textClassName="text-14 font-base font-normal"
                    isAlias={false}
                />
                <p className="whitespace-nowrap">
                    {' '}
                    {amount > 0 ? currencyFormatWithI18n(roundNumber(amount) * -1, t) : '-'}
                </p>
            </LinkTo>
        </li>
    );
});
