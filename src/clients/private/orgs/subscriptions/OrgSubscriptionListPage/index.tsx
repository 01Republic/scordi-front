import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {useSubscriptionTableListAtom} from '^models/Subscription/hook';

export const OrgSubscriptionListPage = memo(function OrgSubscriptionListPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const {search, result, isLoading, movePage, changePageSize, orderBy, reload} = useSubscriptionTableListAtom();

    const onReady = () => {
        search({
            where: {organizationId: orgId},
            relations: ['master', 'teamMembers', 'creditCard'],
            itemsPerPage: 15,
            order: {currentBillingAmount: {dollarPrice: 'DESC'}, isFreeTier: 'ASC', id: 'DESC'},
        });
    };

    return (
        <ListPage
            onReady={onReady}
            breadcrumb={['구독', {text: '구독 리스트', active: true}]}
            titleText="구독 리스트"
            Buttons={undefined}
            ScopeHandler={undefined}
            searchInputPlaceholder="검색어를 입력해주세요"
            onSearch={console.log}
        >
            <ListTableContainer
                pagination={result.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                unit="개"
            >
                <ListTable
                    items={result.items}
                    isLoading={isLoading}
                    // Header={() => <TeamMemberTableHeader orderBy={orderBy} />}
                    Row={({item}) => <tr>{item.id}</tr>}
                />
            </ListTableContainer>
        </ListPage>
    );
});
