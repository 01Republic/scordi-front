import React, {memo, useEffect} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {useSafePathInCurrentOrg} from '^hooks/useSafePath';
import {V3OrgAppsPageRoute} from '^pages/v3/orgs/[orgId]/apps';
import {Panel} from '^v3/V3OrgHomePage/desktop/Panel';
import {Section} from '^v3/V3OrgHomePage/desktop/Section';
import {MoreButton} from '^v3/V3OrgHomePage/desktop/MoreButton';
import {SubscriptionTable} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable';
import {orgIdParamState} from '^atoms/common';
import {usePayingTypeTags} from '^models/Tag/hook';
import {tagOptionsState} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns/PayingType/PayingTypeSelect';
import {useDashboardSubscriptions} from '^models/Subscription/hook';

const SUBSCRIPTION_DISPLAY_LIMIT: number = 10;

export const SubscriptionsSection = memo(function SubscriptionsSection() {
    const {result, search: getSubscriptions, query, reload} = useDashboardSubscriptions();
    const {safePath} = useSafePathInCurrentOrg();
    const {search: getTags} = usePayingTypeTags();
    const setTagOptions = useSetRecoilState(tagOptionsState);
    const orgId = useRecoilValue(orgIdParamState);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;

        // initial listing
        getSubscriptions({
            where: {organizationId: orgId},
            relations: ['master', 'teamMembers', 'billingHistories.creditCard'],
            itemsPerPage: SUBSCRIPTION_DISPLAY_LIMIT,
            order: {id: 'DESC'},
        });

        getTags({}).then((res) => setTagOptions(res.items));
    }, [orgId]);

    const {totalItemCount} = result.pagination;

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
            {result.items.length ? (
                <SubscriptionTable items={result.items} reload={reload} search={getSubscriptions} query={query} />
            ) : (
                <Panel />
            )}
        </Section>
    );
});
