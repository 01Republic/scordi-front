import React, {memo} from 'react';
import {MobileSection} from '^components/v2/MobileSection';
import {ApplicationListItemMobile} from './ApplicationListItem.mobile';
import {index} from '^models/Subscription/hook';

export const ApplicationListMobile = memo(() => {
    const subsQueryResult = index();

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
