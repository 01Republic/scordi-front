import React, {memo} from 'react';
import {SubscriptionPricingPageButton} from './SubscriptionPricingPageButton';
import {SubscriptionRemoveButton} from './SubscriptionRemoveButton';

export const SubscriptionActionPanel = memo(() => {
    return (
        <div className="flex justify-end gap-4">
            <SubscriptionPricingPageButton />
            <SubscriptionRemoveButton />
        </div>
    );
});
