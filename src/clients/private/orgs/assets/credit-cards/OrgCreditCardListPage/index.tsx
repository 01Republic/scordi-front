import React, {memo} from 'react';
import {debounce} from 'lodash';
import {useOrgIdParam} from '^atoms/common';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {useCreditCardListForListPage} from '^models/CreditCard/hook';
import {StepByTutorialPaymentMethodCard} from '^components/ExternalCDNScripts/step-by';
import {StepbyTutorialButton} from '^components/ExternalCDNScripts/step-by';
import TitleScopeHandler from '../../bank-accounts/OrgBankAccountListPage/TitleScopeHandler';
import {AddAssetButton} from '../../AddAssetButton';
import {CreditCardScopeHandler} from './CreditCardScopeHandler';
import {CreditCardTableHeader} from './CreditCardTableHeader';
import {CreditCardTableRow} from './CreditCardTableRow';

export const OrgCreditCardListPage = memo(function OrgCreditCardListPage() {
    const organizationId = useOrgIdParam();
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
        search({
            relations: ['holdingMember', 'subscriptions', 'teams'],
            where: {organizationId},
            order: {id: 'DESC'},
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

    const refresh = () => {
        search({...query, keyword: undefined, page: 1, itemsPerPage: 30}, false, true);
    };

    return (
        <ListPage
            onReady={onReady}
            onUnmount={() => reset()}
            breadcrumb={['자산', '결제수단', {text: '카드', active: true}]}
            Title={() => <TitleScopeHandler />}
            Buttons={() => (
                <>
                    <StepbyTutorialButton onClick={StepByTutorialPaymentMethodCard} />
                    <AddAssetButton />
                </>
            )}
            ScopeHandler={<CreditCardScopeHandler />}
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
                EmptyButtons={() => <AddAssetButton />}
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
