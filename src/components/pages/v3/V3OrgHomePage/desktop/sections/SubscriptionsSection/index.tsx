import React, {memo} from 'react';
import {Panel} from '^v3/V3OrgHomePage/desktop/Panel';
import {Section} from '^v3/V3OrgHomePage/desktop/Section';
import {SubscriptionTable} from '^v3/V3OrgAppsPage/SubscriptionTable';
import {SubscriptionLoader} from '^v3/V3OrgAppsPage/SubscriptionLoader';
import {useRecoilValue} from 'recoil';
import {subscriptionsForCurrentOrgState} from '^v3/V3OrgAppsPage/atom';
import {MoreButton} from '^v3/V3OrgHomePage/desktop/MoreButton';
import {useSafePathInCurrentOrg} from '^hooks/useSafePath';
import {V3OrgAppsPageRoute} from '^pages/v3/orgs/[orgId]/apps';

export const SubscriptionsSection = memo(function SubscriptionsSection() {
    const subscriptions = useRecoilValue(subscriptionsForCurrentOrgState);
    const {safePath} = useSafePathInCurrentOrg();

    return (
        <Section
            title={`구독 현황`}
            titleButtons={[<MoreButton href={safePath((org) => V3OrgAppsPageRoute.path(org.id))} />]}
        >
            {subscriptions.length ? <SubscriptionTable /> : <Panel />}
            <SubscriptionLoader />
        </Section>
    );
});
