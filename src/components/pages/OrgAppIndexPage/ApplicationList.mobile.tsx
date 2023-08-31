import React, {memo} from 'react';
import {MobileSection} from '^components/v2/MobileSection';
import {ApplicationListItemMobile} from './ApplicationListItem.mobile';
import {useSubscriptions} from '^hooks/useSubscriptions';

export const ApplicationListMobile = memo(() => {
    const appsQueryResult = useSubscriptions();

    if (!appsQueryResult) return <></>;

    const {items: applications} = appsQueryResult;

    return (
        <MobileSection>
            <div className="bs-row">
                {applications.map((app, i) => (
                    <ApplicationListItemMobile applicationDto={app} key={i} />
                ))}
            </div>
        </MobileSection>
    );
});
