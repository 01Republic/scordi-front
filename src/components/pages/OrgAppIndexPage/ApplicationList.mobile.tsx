import React, {memo} from 'react';
import {MobileSection} from '^components/v2/MobileSection';
import {ApplicationListItemMobile} from './ApplicationListItem.mobile';
import {useSubscriptions} from '^hooks/useSubscriptions';

export const ApplicationListMobile = memo(() => {
    const subsQueryResult = useSubscriptions();

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
