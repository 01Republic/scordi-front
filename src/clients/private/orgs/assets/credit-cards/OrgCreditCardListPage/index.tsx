import {useOrgIdParam} from '^atoms/common';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {StepbyTutorialButton, StepByTutorialPaymentMethodCard} from '^components/ExternalCDNScripts/step-by';
import {useCreditCardListForListPage} from '^models/CreditCard/hook';
import {debounce} from 'lodash';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {AddAssetButton} from '../../AddAssetButton';
import TitleScopeHandler from '../../bank-accounts/OrgBankAccountListPage/TitleScopeHandler';
import {CreditCardScopeHandler} from './CreditCardScopeHandler';
import {CreditCardTableHeader} from './CreditCardTableHeader';
import {CreditCardTableRow} from './CreditCardTableRow';

export const OrgCreditCardListPage = memo(function OrgCreditCardListPage() {
    const {t} = useTranslation('assets');
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
            breadcrumb={[
                t('common.asset') as string,
                t('common.paymentMethod') as string,
                {text: t('creditCard.title') as string, active: true},
            ]}
            Title={() => <TitleScopeHandler />}
            Buttons={() => (
                <>
                    <StepbyTutorialButton onClick={StepByTutorialPaymentMethodCard} />
                    <AddAssetButton />
                </>
            )}
            ScopeHandler={<CreditCardScopeHandler />}
            searchInputPlaceholder={t('creditCard.list.searchPlaceholder') as string}
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
                emptyMessage={t('creditCard.list.emptyMessage') as string}
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
