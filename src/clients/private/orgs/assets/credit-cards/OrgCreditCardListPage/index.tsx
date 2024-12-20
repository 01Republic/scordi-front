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
import {AddCreditCardDropdown} from './AddCreditCardDropdown';
import {AddCreditCardModal} from './AddCreditCardModal';

export const OrgCreditCardListPage = memo(function OrgCreditCardListPage() {
    const organizationId = useRecoilValue(orgIdParamState);
    const {
        search,
        reset,
        result,
        isEmptyResult,
        isNotLoaded,
        isLoading,
        query,
        movePage,
        changePageSize,
        orderBy,
        reload,
    } = useCreditCardListForListPage();

    const onReady = () => {
        search({where: {organizationId}, order: {id: 'DESC'}});
    };

    const onSearch = debounce((keyword?: string) => {
        return search({
            ...query,
            keyword: keyword || undefined,
            page: 1,
            itemsPerPage: 30,
        });
    }, 500);

    const refresh = () => {
        search({...query, keyword: undefined, page: 1, itemsPerPage: 30}, false, true);
    };

    return (
        <ListPage
            onReady={onReady}
            onUnmount={() => reset()}
            breadcrumb={['자산', '결제수단', {text: '카드', active: true}]}
            titleText="카드"
            Buttons={() => <AddCreditCardDropdown reload={refresh} />}
            ScopeHandler={CreditCardScopeHandler}
            searchInputPlaceholder="검색어를 입력해주세요"
            onSearch={onSearch}
        >
            <ListTableContainer
                pagination={result.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                unit="개"
                isLoading={isLoading}
                isNotLoaded={isNotLoaded}
                isEmptyResult={isEmptyResult}
                emptyMessage="조회된 결제수단이 없어요."
                EmptyButtons={() => <AddCreditCardModal reload={refresh} />}
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
