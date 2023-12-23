import React, {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {debounce} from 'lodash';
import {SubscriptionListViewMode, subscriptionListViewModeState} from './atom';
import {SubscriptionTable} from './SubscriptionTable';
import {SubscriptionCardList} from './SubscriptionCardList';
import {useSubscriptionsV2} from '^models/Subscription/hook';
import {orgIdParamState} from '^atoms/common';
import {tagOptionsState} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns/PayingType/PayingTypeSelect';
import {usePayingTypeTags} from '^models/Tag/hook';
import {TablePaginator} from '^v3/share/table/TablePaginator';
import {TableSearchControl} from '^v3/share/table/TableSearchControl';
import {ViewModeHandler} from '^v3/V3OrgAppsPage/SubscriptionListSection/ViewModeHandler';

export const SubscriptionListSection = memo(function SubscriptionListSection() {
    const orgId = useRecoilValue(orgIdParamState);
    const {result, search: getSubscriptions, movePage, query} = useSubscriptionsV2();
    const setTagOptions = useSetRecoilState(tagOptionsState);
    const {search: getTags} = usePayingTypeTags();
    const viewMode = useRecoilValue(subscriptionListViewModeState);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;

        // only for listing
        getSubscriptions({
            where: {organizationId: orgId},
            relations: ['master', 'teamMembers'],
            itemsPerPage: 15,
        });

        getTags({}).then((res) => setTagOptions(res.items));
    }, [orgId]);

    const onSearch = debounce((keyword: string) => {
        if (!query) return;

        const searchQuery = {
            ...query,
            keyword,
            page: 1,
        };
        if (!keyword) {
            // @ts-ignore
            delete searchQuery['keyword'];
        }

        getSubscriptions(searchQuery);
    }, 500);

    return (
        <>
            <section className="flex items-center mb-4">
                <div></div>
            </section>

            <section className="flex flex-col gap-4">
                <TableSearchControl size="sm" totalItemCount={result.pagination.totalItemCount} onSearch={onSearch}>
                    <div className="ml-auto mr-4">
                        <ViewModeHandler />
                    </div>
                </TableSearchControl>
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
                        <SubscriptionTable items={result.items} />
                        <div className="flex justify-center">
                            <TablePaginator pagination={result.pagination} movePage={movePage} />
                        </div>
                    </>
                )}
            </section>
        </>
    );
});
