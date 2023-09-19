import React, {memo} from 'react';
import {SubscriptionDto} from '^types/subscription.type';
import {Avatar} from '^components/Avatar';
import {currencyFormat, getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {useRouter} from 'next/router';
import {V3OrgAppShowPageRoute} from '^pages/v3/orgs/[orgId]/apps/[appId]';
import {orgIdParamState} from '^atoms/common';
import {BillingHistoryManager} from '^models/BillingHistory';
import {Locale} from '^types/subscriptionBillingCycle.type';

interface SubscriptionItemProps {
    item: SubscriptionDto;
}

export const SubscriptionItem = memo((props: SubscriptionItemProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const locale = (router.locale as Locale) || Locale.ko;
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const {item} = props;
    const {product, billingHistories = []} = item;

    const BillingHistory = BillingHistoryManager.init(billingHistories).validateToListing();
    console.log('billingHistory', BillingHistory);
    const totalPrice = BillingHistory.paymentOnly().latestIssue().getTotalPrice(displayCurrency);

    const onClick = () => router.push(V3OrgAppShowPageRoute.path(orgId, item.id));

    return (
        <div
            className="flex items-center gap-4 px-3 py-2.5 -mx-3 bg-base-100 text-gray-700 cursor-pointer hover:bg-neutral"
            onClick={onClick}
        >
            <Avatar src={product.image} className="w-8 h-8 outline outline-offset-1 outline-slate-100" />
            <div className="flex-1">
                <p className="text-xs text-gray-500">{product.nameEn}</p>
                <p className="text-[16px]">
                    <small className="mr-0.5">{getCurrencySymbol(totalPrice.currency)}</small>
                    <span className="font-semibold">{currencyFormat(totalPrice.amount || 0, displayCurrency)}</span>

                    <span className="ml-1.5 text-xs text-gray-500">/ {item.getBillingType(true, locale)}</span>
                </p>
            </div>
            <div></div>
        </div>
    );
});
