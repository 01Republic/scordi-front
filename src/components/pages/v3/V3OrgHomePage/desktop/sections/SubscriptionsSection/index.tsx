import {orgIdParamState} from '^atoms/common';
import {useSafePathInCurrentOrg} from '^hooks/useSafePath';
import {useDashboardSubscriptions} from '^models/Subscription/hook';
import {useDashBoardSubscriptionSummary} from '^models/SubscsriptionSummary/hook';
import {usePayingTypeTags} from '^models/Tag/hook';
import {V3OrgAppsPageRoute} from '^pages/v3/orgs/[orgId]/apps';
import {useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {SubscriptionTable} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable';
import {EmptySubscriptionTableInDashBoard as EmptySubscriptionTable} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/EmptySubscriptionTable';
import {tagOptionsState} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns/PayingType/PayingTypeSelect';
import {MoreButton} from '^v3/V3OrgHomePage/desktop/MoreButton';
import {Section} from '^v3/V3OrgHomePage/desktop/Section';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {memo, useEffect} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';

const SUBSCRIPTION_DISPLAY_LIMIT = 10;

// 대시보드에서 사용되는 구독리스트 테이블
export const SubscriptionsSection = memo(function SubscriptionsSection() {
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const {t} = useTranslation('common');
    const {isLoading, result, search: getSubscriptions, query, reload, clearCache} = useDashboardSubscriptions();
    const {safePath} = useSafePathInCurrentOrg();
    const {search: getTags} = usePayingTypeTags();
    const setTagOptions = useSetRecoilState(tagOptionsState);
    const {loadCurrentSubscription, currentSubscription} = useCurrentSubscription();
    const {index: reloadSubscriptionSummary} = useDashBoardSubscriptionSummary();

    // [대시보드] 페이지를 떠날 때, unmount 로 쿼리캐시를 초기화함으로써, 다음 방문 때에 쿼리가 실행되게 만듭니다.
    useEffect(() => {
        return () => {
            clearCache();
        };
    }, [router.isReady]);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;

        // initial listing
        getSubscriptions({
            where: {organizationId: orgId},
            relations: ['master', 'teamMembers', 'creditCard'],
            order: {currentBillingAmount: {dollarPrice: 'DESC'}, isFreeTier: 'ASC', id: 'DESC'},
            itemsPerPage: SUBSCRIPTION_DISPLAY_LIMIT,
        });

        getTags({}).then((res) => setTagOptions(res.items));
    }, [orgId]);

    const onReload = () => {
        reload(); // 구독리스트 reload
        reloadSubscriptionSummary(); // 요약패널 reload

        if (!currentSubscription) return;
        loadCurrentSubscription(orgId, currentSubscription.id);
    };

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
            titleButtons={[
                <MoreButton text={t('button.viewAll')} href={safePath((org) => V3OrgAppsPageRoute.path(org.id))} />,
            ]}
            rightTopCaption={
                totalItemCount > SUBSCRIPTION_DISPLAY_LIMIT ? (
                    <p className="text-gray-500 italic text-sm">최근 {SUBSCRIPTION_DISPLAY_LIMIT}개만 불러왔어요</p>
                ) : (
                    ''
                )
            }
        >
            <SubscriptionTable
                isLoading={isLoading}
                items={result.items}
                reload={onReload}
                search={getSubscriptions}
                query={query}
                EmptyContent={() => <EmptySubscriptionTable />}
            />
            {/*{result.items.length ? (*/}
            {/*    <SubscriptionTable items={result.items} reload={reload} search={getSubscriptions} query={query} />*/}
            {/*) : (*/}
            {/*    <Panel />*/}
            {/*)}*/}
        </Section>
    );
});
