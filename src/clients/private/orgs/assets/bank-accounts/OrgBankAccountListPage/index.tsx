import {useOrgIdParam} from '^atoms/common';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {StepbyTutorialButton, StepByTutorialPaymentMethodAccount} from '^components/ExternalCDNScripts/step-by';
import {useBankAccountListForListPage} from '^models/BankAccount/hook';
import {debounce} from 'lodash';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {AddAssetButton} from '../../AddAssetButton';
import {BankAccountScopeHandler} from './BankAccountScopeHandler';
import {BankAccountTableHeader} from './BankAccountTableHeader';
import {BankAccountTableRow} from './BankAccountTableRow';
import TitleScopeHandler from './TitleScopeHandler';

export const OrgBankAccountListPage = memo(function OrgBankAccountListPage() {
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
    } = useBankAccountListForListPage();

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
                {text: t('bankAccount.title') as string, active: true},
            ]}
            Title={() => <TitleScopeHandler />}
            Buttons={() => (
                <>
                    <StepbyTutorialButton onClick={StepByTutorialPaymentMethodAccount} />
                    <AddAssetButton />
                </>
            )}
            ScopeHandler={<BankAccountScopeHandler />}
            searchInputPlaceholder={t('bankAccount.list.searchPlaceholder') as string}
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
                emptyMessage={t('bankAccount.list.emptyMessage') as string}
                EmptyButtons={() => <AddAssetButton />}
            >
                <ListTable
                    items={result.items}
                    isLoading={isLoading}
                    Header={() => <BankAccountTableHeader orderBy={orderBy} />}
                    Row={({item}) => <BankAccountTableRow bankAccount={item} reload={reload} />}
                />
            </ListTableContainer>
        </ListPage>
    );
});
