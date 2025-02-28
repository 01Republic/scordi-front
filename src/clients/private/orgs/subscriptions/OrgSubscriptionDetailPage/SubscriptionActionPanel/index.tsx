import React, {memo} from 'react';
import {SubscriptionPricingPageButton} from './SubscriptionPricingPageButton';
import {SubscriptionMoreDropdown} from './SubscriptionMoreDropdown';

export const SubscriptionActionPanel = memo(() => {
    return (
        <div className="flex justify-end gap-4">
            <SubscriptionPricingPageButton />
            <SubscriptionMoreDropdown />
        </div>
    );
});
