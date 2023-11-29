import React, {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useSafePathInCurrentOrg} from '^hooks/useSafePath';
import {V3OrgAppsPageRoute} from '^pages/v3/orgs/[orgId]/apps';
import {Panel} from '^v3/V3OrgHomePage/desktop/Panel';
import {Section} from '^v3/V3OrgHomePage/desktop/Section';
import {MoreButton} from '^v3/V3OrgHomePage/desktop/MoreButton';
import {subscriptionsForCurrentOrgState} from '^v3/V3OrgAppsPage/atom';
import {SubscriptionTable} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable';
import {subscriptionApi} from '^models/Subscription/api';
import {orgIdParamState} from '^atoms/common';

export const SubscriptionsSection = memo(function SubscriptionsSection() {
    const [subscriptions, setSubscriptions] = useRecoilState(subscriptionsForCurrentOrgState);
    const {safePath} = useSafePathInCurrentOrg();
    const orgId = useRecoilValue(orgIdParamState);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;

        const req = subscriptionApi.index({
            where: {organizationId: orgId},
            itemsPerPage: 0,
        });

        req.then((res) => {
            setSubscriptions(res.data.items);
        });
    }, [orgId]);

    return (
        <Section
            title={`구독 현황`}
            titleButtons={[<MoreButton href={safePath((org) => V3OrgAppsPageRoute.path(org.id))} />]}
        >
            {subscriptions.length ? <SubscriptionTable /> : <Panel />}
        </Section>
    );
});
