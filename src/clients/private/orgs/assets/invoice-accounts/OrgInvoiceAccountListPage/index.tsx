import {useOrgIdParam} from '^atoms/common';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {StepbyTutorialButton, StepByTutorialInvoiceMail} from '^components/ExternalCDNScripts/step-by';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {debounce} from 'lodash';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {AddInvoiceAccountDropdown} from './AddInvoiceAccountDropdown';
import {AddInvoiceAccountModal} from './AddInvoiceAccountModal';
import {InvoiceAccountScopeHandler} from './InvoiceAccountScopeHandler';
import {InvoiceAccountTableHeader} from './InvoiceAccountTableHeader';
import {InvoiceAccountTableRow} from './InvoiceAccountTableRow';

export const OrgInvoiceAccountListPage = memo(function OrgInvoiceAccountListPage() {
    const {t} = useTranslation('assets');
    const organizationId = useOrgIdParam();
    const {
        search,
        reset,
        reload,
        result,
        isLoading,
        isNotLoaded,
        isEmptyResult,
        query,
        movePage,
        resetPage,
        changePageSize,
        orderBy,
    } = useInvoiceAccounts();

    const onReady = () => {
        search({
            where: {organizationId},
            relations: ['subscriptions', 'googleTokenData', 'holdingMember', 'teams'],
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
            breadcrumb={[t('common.asset') as string, {text: t('invoiceAccount.title') as string, active: true}]}
            titleText={t('invoiceAccount.title') as string}
            Buttons={() => (
                <>
                    <StepbyTutorialButton onClick={StepByTutorialInvoiceMail} />
                    <AddInvoiceAccountDropdown reload={refresh} />
                </>
            )}
            ScopeHandler={<InvoiceAccountScopeHandler />}
            searchInputPlaceholder={t('invoiceAccount.list.searchPlaceholder') as string}
            onSearch={onSearch}
        >
            <ListTableContainer
                pagination={result.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                unit="개"
                // Empty State Props
                isNotLoaded={isNotLoaded}
                isLoading={isLoading}
                isEmptyResult={isEmptyResult}
                emptyMessage={t('invoiceAccount.list.emptyMessage') as string}
                EmptyButtons={() => <AddInvoiceAccountModal reload={refresh} />}
            >
                <ListTable
                    items={result.items}
                    isLoading={isLoading}
                    Header={() => <InvoiceAccountTableHeader orderBy={orderBy} />}
                    Row={({item}) => <InvoiceAccountTableRow invoiceAccount={item} reload={reload} />}
                />
            </ListTableContainer>
        </ListPage>
    );
});
