import React, {useState} from 'react';
import {useRecoilValue} from 'recoil';
import {GoMail} from 'react-icons/go';
import {toast} from 'react-hot-toast';
import {orgIdParamState} from '^atoms/common';
import {unitFormat} from '^utils/number';
import {OrgInvoiceAccountListPageRoute} from '^pages/orgs/[id]/invoiceAccounts';
import {useDashboardInvoiceAccountsSectionResult} from '^models/_dashboard/hook';
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

export const InvoiceAccountsSection = () => {
    const orgId = useRecoilValue(orgIdParamState);

    const {
        data: dashboardInvoiceAccountsSectionResult,
        isLoading,
        refetch,
    } = useDashboardInvoiceAccountsSectionResult(orgId);
    const {items = [], total} = dashboardInvoiceAccountsSectionResult || {};
    const [isInvoiceCreateModalOpened, setIsInvoiceCreateModalOpened] = useState(false);
    const [isInvoiceCreateAutoModalOpened, setIsInvoiceCreateAutoModalOpened] = useState(false);

    if (items.length === 0) {
        return (
            <>
                <EmptyTableLayout
                    title="청구서 메일"
                    Icon={() => <GoMail />}
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
                        toast.success('불러온 청구서 메일을 추가했어요.');
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
        <DashboardSectionLayout title="청구서 메일" isLoading={isLoading}>
            <div className="min-h-[250px] flex flex-col justify-between">
                <ul>
                    {items.map((item) => (
                        <InvoiceAccountItem key={item.id} item={item} />
                    ))}
                </ul>

                <LinkTo
                    href={OrgInvoiceAccountListPageRoute.path(orgId)}
                    text={`${unitFormat(total?.totalItemCount, '개')} 전체보기`}
                    className="w-full flex items-center justify-center font-semibold text-14 text-gray-400"
                />
            </div>
        </DashboardSectionLayout>
    );
};
