import React, {memo} from 'react';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {TitleSection} from '^components/v2/TitleSection';

type AppNextPayInfoBlockProps = {
    subscription: SubscriptionDto;
};

export const AppNextPayInfoBlock = memo((props: AppNextPayInfoBlockProps) => {
    const {subscription} = props;

    return (
        <TitleSection.Title size="lg" className="text-right">
            <div className="text-base font-medium">Next {subscription.nextBillingDate}</div>
            <div>US${subscription.nextBillingAmount.toLocaleString()}</div>
        </TitleSection.Title>
    );
});
