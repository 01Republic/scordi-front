import React, {memo} from 'react';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';
import {SubscriptionBillingSummaryLine, SubscriptionProfile} from '^models/Subscription/components';
import {DashboardSummarySubscriptionSpendDto} from '^models/_dashboard/type';
import {BillingHistoryStatus} from '^models/BillingHistory/type';
import {currencyFormat, roundNumber} from '^utils/number';
import {LinkTo} from '^components/util/LinkTo';

interface SubscriptionSpendItemProps {
    currentStatusTab: BillingHistoryStatus;
    spend: DashboardSummarySubscriptionSpendDto;
}

export const SubscriptionSpendItem = memo((props: SubscriptionSpendItemProps) => {
    const {spend, currentStatusTab} = props;

    const {organizationId, subscriptionId, subscription} = spend;
    const href = OrgSubscriptionDetailPageRoute.path(organizationId, subscriptionId);

    return (
        <LinkTo
            href={href}
            key={spend.subscription.id}
            className="w-full bg-white px-5 py-4 flex items-center justify-between rounded-xl"
            displayLoading={false}
        >
            <SubscriptionProfile
                subscription={spend.subscription}
                width={24}
                height={24}
                className="gap-3"
                textClassName="text-14 font-base font-normal"
                isAlias={true}
            >
                <div className="flex flex-col gap-0.5 whitespace-nowrap">
                    <div className="text-14 leading-none font-base font-normal text-gray-900">
                        {subscription.product.name()} {subscription.alias && `- ${subscription.alias}`}
                    </div>

                    <SubscriptionBillingSummaryLine subscription={subscription} className="text-11" />
                </div>
            </SubscriptionProfile>

            <div className="flex flex-col gap-0.5 items-end relative">
                <p className="text-14 leading-none font-medium">{currencyFormat(roundNumber(spend.amount))}</p>
            </div>
        </LinkTo>
    );
});
