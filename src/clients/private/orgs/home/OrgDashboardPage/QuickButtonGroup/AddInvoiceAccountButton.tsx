import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {toast} from 'react-hot-toast';
import {orgIdParamState} from '^atoms/common';
import {swalHTML} from '^components/util/dialog';
import {InvoiceAccountCreateInManualSwalForm} from '^models/InvoiceAccount/components';
import {
    InvoiceAccountAutoCreateModal,
    InvoiceAccountCreateMethod,
    InvoiceAccountCreateMethodModal,
} from '^clients/private/_modals/invoice-accounts';
import {QuickButton} from './QuickButton';
import {useDashboardInvoiceAccountsSection} from '^models/_dashboard/hook';
import {Mail} from 'lucide-react';
import {useTranslation} from 'next-i18next';

export const AddInvoiceAccountButton = memo(function AddInvoiceAccountButton() {
    const orgId = useRecoilValue(orgIdParamState);
    const {t} = useTranslation('dashboard');
    const {refetch} = useDashboardInvoiceAccountsSection(orgId, {
        order: {subscriptionCount: 'DESC', invoiceAccountId: 'DESC'},
        itemsPerPage: 3,
    });
    const [isInvoiceCreateModalOpened, setIsInvoiceCreateModalOpened] = useState(false);
    const [isInvoiceCreateAutoModalOpened, setIsInvoiceCreateAutoModalOpened] = useState(false);

    return (
        <>
            <QuickButton
                text={t('quickButtons.addInvoiceAccount')}
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
                            swalHTML(<InvoiceAccountCreateInManualSwalForm orgId={orgId} onSave={() => refetch()} />);
                            return;
                    }
                }}
            />

            <InvoiceAccountAutoCreateModal
                isOpened={isInvoiceCreateAutoModalOpened}
                onClose={() => setIsInvoiceCreateAutoModalOpened(false)}
                onCreate={() => {
                    toast.success(t('toast.invoiceAccountAdded'));
                    refetch();
                    setIsInvoiceCreateAutoModalOpened(false);
                }}
                onRetry={() => setIsInvoiceCreateAutoModalOpened(true)}
            />
        </>
    );
});
