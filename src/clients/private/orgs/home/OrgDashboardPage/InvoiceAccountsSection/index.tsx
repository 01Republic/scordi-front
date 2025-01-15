import {DashboardLayout} from '^clients/private/orgs/home/OrgDashboardPage/DashboardLayout';
import {Avatar} from '^components/Avatar';
import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useInvoiceAccountListInDashboard} from '^models/_dashboard/hook';
import {DashboardItemListLayout} from '^clients/private/orgs/home/OrgDashboardPage/DashboardItemListLayout';
import {EmptyTableLayout} from '^clients/private/orgs/home/OrgDashboardPage/EmptyTableLayout';
import {GoMail} from 'react-icons/go';
import {
    InvoiceAccountAutoCreateModal,
    InvoiceAccountCreateMethod,
    InvoiceAccountCreateMethodModal,
} from '^clients/private/_modals/invoice-accounts';
import {swalHTML} from '^components/util/dialog';
import {InvoiceAccountCreateInManualSwalForm} from '^models/InvoiceAccount/components';
import {toast} from 'react-hot-toast';
import {OrgInvoiceAccountShowPageRoute} from '^pages/orgs/[id]/invoiceAccounts/[invoiceAccountId]';
import {OrgInvoiceAccountListPageRoute} from '^pages/orgs/[id]/invoiceAccounts';

export const InvoiceAccountsSection = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const {data: invoiceAccountList, isLoading} = useInvoiceAccountListInDashboard(orgId);
    const [isInvoiceCreateModalOpened, setIsInvoiceCreateModalOpened] = useState(false);
    const [isInvoiceCreateAutoModalOpened, setIsInvoiceCreateAutoModalOpened] = useState(false);

    if (invoiceAccountList?.items.length === 0)
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
                                swalHTML(<InvoiceAccountCreateInManualSwalForm orgId={orgId} onSave={() => null} />);
                                return;
                        }
                    }}
                />

                <InvoiceAccountAutoCreateModal
                    isOpened={isInvoiceCreateAutoModalOpened}
                    onClose={() => setIsInvoiceCreateAutoModalOpened(false)}
                    onCreate={() => {
                        toast.success('불러온 청구서 메일을 추가했어요.');
                        setIsInvoiceCreateAutoModalOpened(false);
                    }}
                    onRetry={() => setIsInvoiceCreateAutoModalOpened(true)}
                />
            </>
        );

    return (
        <DashboardLayout
            title="청구서 메일"
            subTitle={`총 ${invoiceAccountList?.total.billingHistoryCount}건`}
            isLoading={isLoading}
        >
            <section className="w-full flex flex-col gap-10">
                <ul>
                    {invoiceAccountList?.items.map((item) => (
                        <DashboardItemListLayout
                            key={item.id}
                            url={OrgInvoiceAccountShowPageRoute.path(orgId, item.invoiceAccount?.id || 0)}
                            src={item.invoiceAccount?.image || ''}
                            title={item.invoiceAccount?.email || ''}
                            subTitle={item.invoiceAccount?.googleTokenData?.name || ''}
                            message={`${String(item.billingHistoryCount)}건` || '0건'}
                            avatarClassName="w-7 h-7"
                        />
                    ))}
                </ul>
                <button
                    onClick={() => router.push(OrgInvoiceAccountListPageRoute.path(orgId))}
                    className="w-full flex items-center justify-center font-semibold text-14 text-gray-400"
                >
                    전체보기
                </button>
            </section>
        </DashboardLayout>
    );
};
