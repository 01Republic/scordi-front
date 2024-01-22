import React, {memo, useEffect} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {usePayingTypeTags} from '^models/Tag/hook';
import {useSubscriptionTableListAtom} from '^models/Subscription/hook';
import {TablePaginator} from '^v3/share/table/TablePaginator';
import {SubscriptionListViewMode, subscriptionListViewModeState} from './atom';
import {SubscriptionTable} from './SubscriptionTable';
import {SubscriptionCardList} from './SubscriptionCardList';
import {SubscriptionSearchControl} from './SubscriptionSearchControl';
import {tagOptionsState} from './SubscriptionTable/SubscriptionTr/columns/PayingType/PayingTypeSelect';
import {useRouter} from 'next/router';
import {useCreditCards} from '^models/CreditCard/hook';
import {useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';

// 구독리스트탭에서 사용되는 구독리스트 테이블
export const SubscriptionListSection = memo(function SubscriptionListSection() {
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const {
        isLoading,
        result,
        search: getSubscriptions,
        movePage,
        query,
        reload,
        clearCache,
    } = useSubscriptionTableListAtom();
    const setTagOptions = useSetRecoilState(tagOptionsState);
    const {search: getTags} = usePayingTypeTags();
    const {search: getCreditCards} = useCreditCards();
    const {loadCurrentSubscription, currentSubscription} = useCurrentSubscription();

    const viewMode = useRecoilValue(subscriptionListViewModeState);

    // [구독리스트] 페이지를 떠날 때, unmount 로 쿼리캐시를 초기화함으로써, 다음 방문 때에 쿼리가 실행되게 만듭니다.
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
            itemsPerPage: 15,
            order: {id: 'DESC'},
        });

        getCreditCards({
            itemsPerPage: 0,
            relations: ['holdingMember', 'subscriptions'],
        });

        getTags({}).then((res) => setTagOptions(res.items));
    }, [orgId]);

    const onReload = () => {
        reload();

        if (!currentSubscription) return;
        loadCurrentSubscription(orgId, currentSubscription.id);
    };

    return (
        <>
            <section className="flex items-center mb-4">
                <div></div>
            </section>

            <section className="flex flex-col gap-4">
                <SubscriptionSearchControl />
                {viewMode === SubscriptionListViewMode.Cards && (
                    <>
                        <SubscriptionCardList items={result.items} />
                        {result.pagination.currentPage < result.pagination.totalPage && (
                            <div className="flex justify-center">
                                <div
                                    onClick={() => movePage(result.pagination.currentPage + 1, true)}
                                    className="normal-case text-sm py-3 px-4 text-gray-500 hover:text-black transition-all rounded-full cursor-pointer hover:underline underline-offset-2"
                                >
                                    더 보기 ({result.pagination.currentPage + 1}/{result.pagination.totalPage})
                                </div>
                            </div>
                        )}
                    </>
                )}
                {viewMode === SubscriptionListViewMode.Table && (
                    <>
                        <SubscriptionTable
                            isLoading={isLoading}
                            items={result.items}
                            reload={onReload}
                            search={getSubscriptions}
                            query={query}
                        />
                        <div className="flex justify-center">
                            <TablePaginator pagination={result.pagination} movePage={movePage} />
                        </div>
                    </>
                )}
            </section>
        </>
    );
});
