import React, {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useSafePathInCurrentOrg} from '^hooks/useSafePath';
import {V3OrgAppsPageRoute} from '^pages/v3/orgs/[orgId]/apps';
import {Panel} from '^v3/V3OrgHomePage/desktop/Panel';
import {Section} from '^v3/V3OrgHomePage/desktop/Section';
import {MoreButton} from '^v3/V3OrgHomePage/desktop/MoreButton';
import {SubscriptionTable} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable';
import {subscriptionApi} from '^models/Subscription/api';
import {orgIdParamState} from '^atoms/common';
import {dashboardSubscriptionSearchResultAtom} from './atom';

const SUBSCRIPTION_DISPLAY_LIMIT: number = 10;

export const SubscriptionsSection = memo(function SubscriptionsSection() {
    const [pagedSubscriptions, setResult] = useRecoilState(dashboardSubscriptionSearchResultAtom);
    const {safePath} = useSafePathInCurrentOrg();
    const orgId = useRecoilValue(orgIdParamState);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;

        const req = subscriptionApi.index({
            where: {organizationId: orgId},
            relations: ['master', 'teamMembers'],
            itemsPerPage: SUBSCRIPTION_DISPLAY_LIMIT,
        });

        req.then((res) => {
            setResult(res.data);
        });
    }, [orgId]);

    const {totalItemCount} = pagedSubscriptions.pagination;

    return (
        <Section
            title={
                <>
                    구독 현황{' '}
                    <span className="text-black">
                        (<b>{totalItemCount.toLocaleString()}</b>)
                    </span>
                </>
            }
            titleButtons={[<MoreButton text="전체보기" href={safePath((org) => V3OrgAppsPageRoute.path(org.id))} />]}
            rightTopCaption={
                totalItemCount > SUBSCRIPTION_DISPLAY_LIMIT ? (
                    <p className="text-gray-500 italic text-sm">최근 {SUBSCRIPTION_DISPLAY_LIMIT}개만 불러왔어요</p>
                ) : (
                    ''
                )
            }
        >
            {pagedSubscriptions.items.length ? <SubscriptionTable items={pagedSubscriptions.items} /> : <Panel />}
        </Section>
    );
});
