import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {debounce} from 'lodash';
import {orgIdParamState} from '^atoms/common';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {useCreditCardListForListPage} from '^models/CreditCard/hook';
import {CreditCardScopeHandler} from './CreditCardScopeHandler';
import {CreditCardTableHeader} from './CreditCardTableHeader';
import {CreditCardTableRow} from './CreditCardTableRow';

export const OrgCreditCardListPage = memo(function OrgCreditCardListPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const {search, result, isLoading, query, movePage, changePageSize, orderBy, reload} =
        useCreditCardListForListPage();

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
            breadcrumb={['자산', '결제수단', {text: '카드', active: true}]}
            titleText="카드"
            Buttons={undefined}
            ScopeHandler={CreditCardScopeHandler}
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
                    Header={() => <CreditCardTableHeader orderBy={orderBy} />}
                    Row={({item}) => <CreditCardTableRow creditCard={item} reload={reload} />}
                />
            </ListTableContainer>
        </ListPage>
    );
});
