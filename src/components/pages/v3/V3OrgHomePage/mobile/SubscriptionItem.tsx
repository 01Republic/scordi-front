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
    const {item} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const locale = (router.locale as Locale) || Locale.ko;
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const symbol = getCurrencySymbol(displayCurrency);
    const {product, billingHistories = []} = item;

    const BillingHistory = BillingHistoryManager.init(billingHistories).validateToListing();
    const totalPrice = BillingHistory.paymentOnly().latestIssue().getTotalPrice(displayCurrency);

    const onClick = () => router.push(V3OrgAppShowPageRoute.path(orgId, item.id));

    return (
        <div className="!w-auto gap-4 px-4 py-3 -mx-4 hover:bg-neutral btn-like no-selectable" onClick={onClick}>
            <Avatar src={product.image} className="w-9 h-9 outline outline-offset-1 outline-slate-100" />
            <div className="flex-1">
                <p className="text-sm text-gray-500">{product.nameEn}</p>
                <p className="text-[16px]">
                    <small className="mr-0.5">{symbol}</small>
                    <span className="font-semibold">{currencyFormat(totalPrice, displayCurrency)}</span>

                    <span className="ml-1.5 text-sm text-gray-500">/ {item.getBillingType(true, locale)}</span>
                </p>
            </div>
            <div></div>
        </div>
    );
});
