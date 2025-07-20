import React, {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {toast} from 'react-hot-toast';
import {orgIdParamState} from '^atoms/common';
import {unitFormat} from '^utils/number';
import {OrgInvoiceAccountListPageRoute} from '^pages/orgs/[id]/invoiceAccounts';
import {useDashboardInvoiceAccountsSection} from '^models/_dashboard/hook';
import {InvoiceAccountCreateInManualSwalForm} from '^models/InvoiceAccount/components';
import {
    InvoiceAccountAutoCreateModal,
    InvoiceAccountCreateMethod,
    InvoiceAccountCreateMethodModal,
} from '^clients/private/_modals/invoice-accounts';
import {LinkTo} from '^components/util/LinkTo';
import {swalHTML} from '^components/util/dialog';
import {DashboardSectionLayout} from '../DashboardSectionLayout';
import {InvoiceAccountItem} from './InvoiceAccountItem';
import {EmptyTableLayout} from '../EmptyTableLayout';
import {Mail} from 'lucide-react';
import {useTranslation} from 'next-i18next';

export const InvoiceAccountsSection = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const {t} = useTranslation('dashboard');

    const {data, isLoading, refetch} = useDashboardInvoiceAccountsSection(orgId, {
        order: {subscriptionCount: 'DESC', invoiceAccountId: 'DESC'},
        itemsPerPage: 3,
    });
    const [isInvoiceCreateModalOpened, setIsInvoiceCreateModalOpened] = useState(false);
    const [isInvoiceCreateAutoModalOpened, setIsInvoiceCreateAutoModalOpened] = useState(false);

    const {items, pagination} = data;
    const {totalItemCount} = pagination;

    if (totalItemCount === 0) {
        return (
            <>
                <EmptyTableLayout
                    title={t('sections.invoiceAccounts')}
                    Icon={() => <Mail />}
                    onClick={() => setIsInvoiceCreateModalOpened(true)}
                />
                {/*청구서 수신 메일 계정 추가*/}
                <InvoiceAccountCreateMethodModal
                    isOpened={isInvoiceCreateModalOpened}
                    onClose={() => setIsInvoiceCreateModalOpened(false)}
                    onSelect={(createMethod: InvoiceAccountCreateMethod) => {
                        switch (createMethod) {
                            case InvoiceAccountCreateMethod.Auto:
                                setIsInvoiceCreateModalOpened(false);

                                return setIsInvoiceCreateAutoModalOpened(true);
                            case InvoiceAccountCreateMethod.Manual:
                            default:
                                swalHTML(
                                    <InvoiceAccountCreateInManualSwalForm orgId={orgId} onSave={() => refetch()} />,
                                );
                                return;
                        }
                    }}
                />

                <InvoiceAccountAutoCreateModal
                    isOpened={isInvoiceCreateAutoModalOpened}
                    onClose={() => {
                        setIsInvoiceCreateAutoModalOpened(false);
                    }}
                    onCreate={() => {
                        toast.success(t('toast.invoiceAccountAdded'));
                        setIsInvoiceCreateAutoModalOpened(false);
                        refetch();
                    }}
                    onRetry={() => {
                        setIsInvoiceCreateAutoModalOpened(true);
                    }}
                />
            </>
        );
    }

    return (
        <DashboardSectionLayout
            title={<span onClick={() => console.log(items)}>{t('sections.invoiceAccounts')}</span>}
            isLoading={isLoading}
        >
            <div className="min-h-[250px] flex flex-col justify-between">
                <ul>
                    {items.map((item) => (
                        <InvoiceAccountItem key={item.invoiceAccountId} item={item} />
                    ))}
                </ul>

                <LinkTo
                    href={OrgInvoiceAccountListPageRoute.path(orgId)}
                    text={t('viewAll', {count: totalItemCount})}
                    className="w-full flex items-center justify-center font-semibold text-14 text-gray-400"
                />
            </div>
        </DashboardSectionLayout>
    );
};
