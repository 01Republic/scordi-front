import React, {memo} from 'react';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {TitleSection} from '^components/v2/TitleSection';
import {yyyy_mm_dd} from '^utils/dateTime';

type AppNextPayInfoBlockProps = {
    subscription: SubscriptionDto;
};

export const AppNextPayInfoBlock = memo((props: AppNextPayInfoBlockProps) => {
    const {subscription} = props;

    const nextBillingDate = subscription.nextBillingDate ? yyyy_mm_dd(subscription.nextBillingDate) : '';

    return (
        <TitleSection.Title size="lg" className="text-right">
            <div className="text-base font-medium">Next {nextBillingDate}</div>
            <div>US${subscription.nextBillingAmount.toLocaleString()}</div>
        </TitleSection.Title>
    );
});
