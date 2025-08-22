import React, {memo, useState} from 'react';
import {Plus} from 'lucide-react';
import {useOrgIdParam} from '^atoms/common';
import {OrgSubscriptionConnectionPageRoute} from '^pages/orgs/[id]/subscriptions/connection';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {ListTableContainer, ListTablePaginator} from '^clients/private/_components/table/ListTable';
import {StepbyTutorialButton, StepByTutorialSubscriptionList} from '^components/ExternalCDNScripts/step-by';
import {LinkTo} from '^components/util/LinkTo';
import {useSubscriptionList, useSubscriptionListGroupedByProduct} from './hooks/useSubscriptionList';
import {SubscriptionScopeHandler} from './SubscriptionScopeHandler';
import {ExcelDownLoadButton} from './ExcelDownLoadButton';
import {ViewModeSwitch} from './ViewModeSwitch';
import {GroupedByProductScopeHandler} from './GroupedByProductScopeHandler';
import {GroupedByProductTable} from './GroupedByProductTable';
import {SubscriptionTable} from './SubscriptionTable';
import {BottomAction} from './BottomAction';

export const OrgSubscriptionListPage = memo(function OrgSubscriptionListPage() {
    const orgId = useOrgIdParam();
    const [isGroupMode, setIsGroupMode] = useState(true);

    const subscriptionListQuery = useSubscriptionList(isGroupMode, {
        where: {organizationId: orgId},
        relations: ['master', 'teamMembers', 'teamMembers.teams', 'creditCard', 'bankAccount'],
        order: {
            currentBillingAmount: {dollarPrice: 'DESC'},
            isFreeTier: 'ASC',
            id: 'DESC',
            product: {nameKo: 'ASC'},
        },
    });

    const subscriptionListGroupedByProductQuery = useSubscriptionListGroupedByProduct(isGroupMode, {
        organizationId: orgId,
        relations: [
            'subscriptions',
            'subscriptions.master',
            'subscriptions.teamMembers',
            'subscriptions.teamMembers.teams',
            'subscriptions.creditCard',
            'subscriptions.bankAccount',
        ],
        order: {
            subscriptions: {
                currentBillingAmount: {dollarPrice: 'DESC'},
                isFreeTier: 'ASC',
                id: 'DESC',
            },
            nameKo: 'ASC',
        },
    });

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
                    <GroupedByProductTable query={subscriptionListGroupedByProductQuery} />
                ) : (
                    <SubscriptionTable query={subscriptionListQuery} />
                )}

                <BottomAction />
            </ListTableContainer>
        </ListPage>
    );
});
