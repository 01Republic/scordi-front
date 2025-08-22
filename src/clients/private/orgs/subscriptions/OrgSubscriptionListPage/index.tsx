import React, {memo, useState} from 'react';
import {Plus} from 'lucide-react';
import {useOrgIdParam} from '^atoms/common';
import {OrgSubscriptionConnectionPageRoute} from '^pages/orgs/[id]/subscriptions/connection';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {ListTable, ListTableContainer, ListTablePaginator} from '^clients/private/_components/table/ListTable';
import {StepbyTutorialButton, StepByTutorialSubscriptionList} from '^components/ExternalCDNScripts/step-by';
import {LinkTo} from '^components/util/LinkTo';
import {SubscriptionDto} from '^models/Subscription/types';
import {useSubscriptionList, useSubscriptionListGroupedByProduct} from './hooks/useSubscriptionList';
import {SubscriptionScopeHandler} from './SubscriptionScopeHandler';
import {SubscriptionTableHeader} from './SubscriptionTableHeader';
import {SubscriptionTableRow} from './SubscriptionTableRow';
import {ExcelDownLoadButton} from './ExcelDownLoadButton';
import {useCheckboxHandler} from '^hooks/useCheckboxHandler';
import {BottomActionBar} from './SubscriptionTableRow/BottomAction/BottomActionBar';
import {ViewModeSwitch} from './ViewModeSwitch';
import {GroupedByProductScopeHandler} from './GroupedByProductScopeHandler';
import {GroupedByProductTable} from './GroupedByProductTable';

export const OrgSubscriptionListPage = memo(function OrgSubscriptionListPage() {
    const orgId = useOrgIdParam();
    const [isGroupMode, setIsGroupMode] = useState(true);

    const subscriptionListQuery = useSubscriptionList(isGroupMode, {
        where: {organizationId: orgId},
        relations: ['master', 'teamMembers', 'creditCard', 'bankAccount'],
        order: {
            currentBillingAmount: {dollarPrice: 'DESC'},
            isFreeTier: 'ASC',
            id: 'DESC',
            product: {nameKo: 'ASC'},
        },
    });

    const subscriptionListGroupedByProductQuery = useSubscriptionListGroupedByProduct(isGroupMode, {
        organizationId: orgId,
        relations: ['subscriptions', 'subscriptions.creditCard', 'subscriptions.bankAccount'],
        order: {
            subscriptions: {currentBillingAmount: {dollarPrice: 'DESC'}, isFreeTier: 'ASC', id: 'DESC'},
            nameKo: 'ASC',
        },
    });

    const ch = useCheckboxHandler<SubscriptionDto>([], (item) => item.id);

    const queryResult = isGroupMode ? subscriptionListGroupedByProductQuery : subscriptionListQuery;

    const onSearch = (keyword?: string) => {
        return queryResult.search({
            // ...query,
            keyword: keyword || undefined,
            page: 1,
            itemsPerPage: 30,
        });
    };

    const AddSubscriptionButton = () => (
        <div>
            <LinkTo
                href={OrgSubscriptionConnectionPageRoute.path(orgId)}
                className="gap-2 btn btn-scordi no-animation btn-animation"
                loadingOnBtn
            >
                <Plus />
                <span>구독 추가</span>
            </LinkTo>
        </div>
    );

    return (
        <ListPage
            breadcrumb={['구독', {text: '구독 리스트', active: true}]}
            titleText="구독 리스트"
            Buttons={() => (
                <div className="flex gap-4">
                    <StepbyTutorialButton onClick={StepByTutorialSubscriptionList} />
                    <ExcelDownLoadButton />
                    <AddSubscriptionButton />
                </div>
            )}
            ScopeHandler={
                isGroupMode ? (
                    <GroupedByProductScopeHandler onSearch={subscriptionListGroupedByProductQuery.search} />
                ) : (
                    <SubscriptionScopeHandler onSearch={subscriptionListQuery.search} />
                )
            }
            onSearch={onSearch}
        >
            <ListTableContainer
                pagination={queryResult.result.pagination}
                movePage={queryResult.movePage}
                changePageSize={queryResult.changePageSize}
                unit="개"
                isLoading={queryResult.isLoading}
                isNotLoaded={queryResult.isNotLoaded}
                isEmptyResult={queryResult.isEmptyResult}
                emptyMessage="조회된 구독이 없어요."
                EmptyButtons={AddSubscriptionButton}
                hideTopPaginator
            >
                <div className="flex justify-between items-center mb-4">
                    <div>
                        {/*<CurrencyToggle leftText={''} rightText={'원화로 보기'} className={'font-medium'} />*/}
                        <ViewModeSwitch value={isGroupMode} onChange={setIsGroupMode} />
                    </div>
                    <ListTablePaginator
                        pagination={queryResult.result.pagination}
                        movePage={queryResult.movePage}
                        onChangePerPage={queryResult.changePageSize}
                        unit="개"
                    />
                </div>
                {isGroupMode ? (
                    <GroupedByProductTable query={subscriptionListGroupedByProductQuery} ch={ch} />
                ) : (
                    <ListTable
                        items={subscriptionListQuery.result.items}
                        isLoading={subscriptionListQuery.isLoading}
                        Header={() => (
                            <SubscriptionTableHeader
                                orderBy={subscriptionListQuery.orderBy}
                                sortVal={subscriptionListQuery.sortVal}
                            />
                        )}
                        Row={({item}) => (
                            <SubscriptionTableRow
                                subscription={item}
                                reload={subscriptionListQuery.reload}
                                isChecked={ch.isChecked(item)}
                                onCheck={(checked) => ch.checkOne(item, checked)}
                            />
                        )}
                    />
                )}

                {ch.checkedItems.length > 0 && (
                    <div className="fixed inset-x-0 bottom-5 z-40 flex justify-center pointer-events-none">
                        <div className="container px-4 pointer-events-auto">
                            <BottomActionBar items={ch} onClear={() => ch.checkAll(false)} />
                        </div>
                    </div>
                )}
            </ListTableContainer>
        </ListPage>
    );
});
