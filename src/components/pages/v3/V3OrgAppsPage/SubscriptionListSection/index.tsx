import React, {memo, useEffect} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {usePayingTypeTags} from '^models/Tag/hook';
import {useSubscriptionsV2} from '^models/Subscription/hook';
import {TablePaginator} from '^v3/share/table/TablePaginator';
import {SubscriptionListViewMode, subscriptionListViewModeState} from './atom';
import {SubscriptionTable} from './SubscriptionTable';
import {SubscriptionCardList} from './SubscriptionCardList';
import {SubscriptionSearchControl} from './SubscriptionSearchControl';
import {tagOptionsState} from './SubscriptionTable/SubscriptionTr/columns/PayingType/PayingTypeSelect';

export const SubscriptionListSection = memo(function SubscriptionListSection() {
    const orgId = useRecoilValue(orgIdParamState);
    const {result, search: getSubscriptions, movePage, query, reload} = useSubscriptionsV2();
    // const setTagOptions = useSetRecoilState(tagOptionsState);
    // const {search: getTags} = usePayingTypeTags();
    const viewMode = useRecoilValue(subscriptionListViewModeState);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;

        // initial listing
        getSubscriptions({
            where: {organizationId: orgId},
            relations: ['master', 'teamMembers'],
            itemsPerPage: 15,
            order: {id: 'DESC'},
        });

        // getTags({}).then((res) => setTagOptions(res.items));
    }, [orgId]);

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
                            items={result.items}
                            reload={reload}
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
