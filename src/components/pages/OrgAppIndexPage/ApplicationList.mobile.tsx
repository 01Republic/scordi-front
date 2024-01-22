import React, {memo} from 'react';
import {MobileSection} from '^components/v2/MobileSection';
import {ApplicationListItemMobile} from './ApplicationListItem.mobile';
import {useSubscriptionsV2} from '^models/Subscription/hook';

export const ApplicationListMobile = memo(() => {
    const {result: subsQueryResult} = useSubscriptionsV2();

    if (!subsQueryResult) return <></>;

    const {items: subscriptions} = subsQueryResult;

    return (
        <MobileSection>
            <div className="bs-row">
                {subscriptions.map((subscription, i) => (
                    <ApplicationListItemMobile subscription={subscription} key={i} />
                ))}
            </div>
        </MobileSection>
    );
});
