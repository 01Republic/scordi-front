import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {useSafePathInCurrentOrg} from '^hooks/useSafePath';
import {V3OrgAppsPageRoute} from '^pages/v3/orgs/[orgId]/apps';
import {Panel} from '^v3/V3OrgHomePage/desktop/Panel';
import {Section} from '^v3/V3OrgHomePage/desktop/Section';
import {MoreButton} from '^v3/V3OrgHomePage/desktop/MoreButton';
import {subscriptionsForCurrentOrgState} from '^v3/V3OrgAppsPage/atom';
import {SubscriptionLoader} from '^v3/V3OrgAppsPage/SubscriptionLoader';
import {SubscriptionTable} from '^v3/V3OrgAppsPage/SubscriptionTable';

export const SubscriptionsSection = memo(function SubscriptionsSection() {
    const subscriptions = useRecoilValue(subscriptionsForCurrentOrgState);
    const {safePath} = useSafePathInCurrentOrg();

    return (
        <Section
            title={`구독 현황`}
            titleButtons={[<MoreButton href={safePath((org) => V3OrgAppsPageRoute.path(org.id))} />]}
        >
            {subscriptions.length ? <SubscriptionTable /> : <Panel />}
            {/* TODO: [fred] SubscriptionLoader 는 구독목록페이지에서 검색 섹션을 구현하기 위해 마련한 컴포넌트 입니다. 이 곳에 그대로 사용하기에 무리가 있습니다. 컴포넌트에 있는 주석에 그 구상을 알 수 있게 남겨두었으니 잘 확인해 주세요! */}
            <SubscriptionLoader />
        </Section>
    );
});
