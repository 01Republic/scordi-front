import React, {memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';
import {useCurrentSubscription} from '../atom';
import {SquareArrowOutUpRight} from 'lucide-react';

export const SubscriptionPricingPageButton = memo(() => {
    const {currentSubscription: subscription} = useCurrentSubscription();

    if (!subscription) return <></>;

    const pricingPageUrl = subscription.product.pricingPageUrl;

    return (
        <LinkTo
            className="btn btn-square !bg-white border border-slate-300 rounded-md hover:border-slate-400 hover:shadow transition-all mb-1"
            href={pricingPageUrl}
            target="_blank"
        >
            <SquareArrowOutUpRight fontSize={20} />
        </LinkTo>
    );
});
