import React, {memo} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {debounce} from 'lodash';
import {orgIdParamState} from '^atoms/common';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {useCreditCardListForListPage} from '^models/CreditCard/hook';
import {CardAutoCreateModal} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/PaymentMethod/CardAutoCreateModal';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {CreditCardScopeHandler} from './CreditCardScopeHandler';
import {CreditCardTableHeader} from './CreditCardTableHeader';
import {CreditCardTableRow} from './CreditCardTableRow';
import {AddCreditCardDropdown} from './AddCreditCardDropdown';
import {isCardAutoCreateModalAtom} from './atom';

export const OrgCreditCardListPage = memo(function OrgCreditCardListPage() {
    const organizationId = useRecoilValue(orgIdParamState);
    const {search, reset, result, isLoading, query, movePage, changePageSize, orderBy, reload} =
        useCreditCardListForListPage();
    const [isCardAutoCreateModalOpen, setIsCardAutoCreateModalOpen] = useRecoilState(isCardAutoCreateModalAtom);

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

    return (
        <ListPage
            onReady={onReady}
            onUnmount={() => reset()}
            breadcrumb={['자산', '결제수단', {text: '카드', active: true}]}
            titleText="카드"
            Buttons={AddCreditCardDropdown}
            ScopeHandler={CreditCardScopeHandler}
            searchInputPlaceholder="검색어를 입력해주세요"
            onSearch={onSearch}
        >
            {result.pagination.totalItemCount > 0 ? (
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
            ) : (
                <EmptyTable icon={'💳'} message="등록된 결제수단이 없어요." Buttons={AddCreditCardDropdown} />
            )}

            <CardAutoCreateModal
                isOpened={isCardAutoCreateModalOpen}
                onClose={() => setIsCardAutoCreateModalOpen(false)}
                onCreate={() => {
                    setIsCardAutoCreateModalOpen(false);
                    return reload();
                }}
            />
        </ListPage>
    );
});
