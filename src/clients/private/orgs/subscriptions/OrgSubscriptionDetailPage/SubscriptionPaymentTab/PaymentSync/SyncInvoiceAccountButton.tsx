import React, {memo, useState} from 'react';
import {LoadableBox} from '^components/util/loading';
import {SubscriptionDto} from '^models/Subscription/types';
import {MethodOption} from '^clients/private/_layouts/_shared/ListPageMainDropdown';
import {startSyncInvoiceAccount} from './InvoiceAccountReconnectModal';
import {useStartInvoiceAccountSync} from './atom';
import {Database} from 'lucide-react';

interface SyncInvoiceAccountButtonProps {
    subscription: SubscriptionDto;
    reload: () => any;
}

export const SyncInvoiceAccountButton = memo((props: SyncInvoiceAccountButtonProps) => {
    const {subscription, reload} = props;
    const [isInvoiceAutoCreateModalOpened, setIsInvoiceAutoCreateModalOpened] = useState(false);
    const {invoiceAccounts = []} = subscription;

    const invoiceAccount = invoiceAccounts.find((invoiceAccount) => invoiceAccount.googleTokenDataId !== null);

    const {startSync, isSyncRunning} = useStartInvoiceAccountSync(invoiceAccount);

    const onClickInvoiceAccount = () => {
        if (!isConnectedInvoiceAccount || !invoiceAccount) return;
        startSyncInvoiceAccount(invoiceAccount, () => startSync().then(() => reload()));
    };

    const isConnectedInvoiceAccount = invoiceAccounts.some(
        (invoiceAccount) => invoiceAccount.googleTokenDataId !== null,
    );

    return (
        <LoadableBox isLoading={isSyncRunning} loadingType={2} noPadding spinnerPos="center">
            <div className={`${!isConnectedInvoiceAccount && 'pointer-events-none opacity-50'}`}>
                <MethodOption
                    Icon={Database}
                    title="청구서 메일 불러오기"
                    desc="구글 로그인으로 한 번에 불러와요"
                    onClick={onClickInvoiceAccount}
                />
            </div>

            {/*<InvoiceAccountAutoCreateModal*/}
            {/*    isOpened={isInvoiceAutoCreateModalOpened}*/}
            {/*    onClose={() => setIsInvoiceAutoCreateModalOpened(false)}*/}
            {/*    onCreate={() => {*/}
            {/*        toast.success('불러온 청구서 메일을 추가했어요.');*/}
            {/*        setIsInvoiceAutoCreateModalOpened(false);*/}
            {/*        return reload();*/}
            {/*    }}*/}
            {/*    onRetry={() => setIsInvoiceAutoCreateModalOpened(true)}*/}
            {/*/>*/}
        </LoadableBox>
    );
});
