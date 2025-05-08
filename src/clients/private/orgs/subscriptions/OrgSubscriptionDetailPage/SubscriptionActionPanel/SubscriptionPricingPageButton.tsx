import React, {memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';
import {useCurrentSubscription} from '../atom';
import {SquareArrowOutUpRight} from 'lucide-react';

export const SubscriptionPricingPageButton = memo(() => {
    const {currentSubscription: subscription} = useCurrentSubscription();

    if (!subscription) return <></>;

    const pricingPageUrl = subscription.product.pricingPageUrl;

    return (
        <LinkTo className="btn btn-header-action" href={pricingPageUrl} target="_blank">
            <SquareArrowOutUpRight fontSize={18} />
        </LinkTo>
    );
});
