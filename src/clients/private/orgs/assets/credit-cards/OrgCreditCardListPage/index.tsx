import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {debounce} from 'lodash';
import {orgIdParamState} from '^atoms/common';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {useCreditCardListForListPage} from '^models/CreditCard/hook';

export const OrgCreditCardListPage = memo(function OrgCreditCardListPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const {search, result, isLoading, query, movePage, changePageSize} = useCreditCardListForListPage();

    const onReady = () => {
        search({
            where: {organizationId: orgId},
            // relations: ['members', 'subscriptions', 'tags'],
        });
    };

    const onSearch = debounce((keyword?: string) => {
        return search({
            ...query,
            keyword: keyword || undefined,
            page: 1,
            itemsPerPage: 30,
        });
    }, 500);

    return (
        <ListPage
            onReady={onReady}
            breadcrumb={['자산', '결제수단', {text: '카드 목록', active: true}]}
            titleText="카드 목록"
            Buttons={undefined}
            ScopeHandler={undefined}
            searchInputPlaceholder="검색어를 입력해주세요"
            onSearch={onSearch}
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
