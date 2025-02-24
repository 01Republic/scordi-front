import React, {memo, useState} from 'react';
import {FcDataBackup} from 'react-icons/fc';
import {
    ListPageDropdown,
    ListPageDropdownMenu,
    MethodOption,
} from '^clients/private/_layouts/_shared/ListPageMainDropdown';
import {CardAutoCreateModal} from '^clients/private/_modals/credit-cards';
import {InvoiceAccountAutoCreateModal} from '^clients/private/_modals/invoice-accounts';
import {toast} from 'react-hot-toast';
import {MdRefresh} from 'react-icons/md';
import {SubscriptionDto} from '^models/Subscription/types';
import {useCreditCardSync} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionPaymentTab/atom';

interface AddPaymentHistoryDropdownProps {
    subscription: SubscriptionDto;
    reload: () => any;
}

export const AddPaymentHistoryDropdown = memo((props: AddPaymentHistoryDropdownProps) => {
    const {subscription, reload} = props;
    const {startSync, isSyncRunning} = useCreditCardSync(subscription.creditCard);
    const [isCardAutoCreateModalOpen, setIsCardAutoCreateModalOpen] = useState(false);
    const [isInvoiceAutoCreateModalOpened, setIsInvoiceAutoCreateModalOpened] = useState(false);
    const creditCardId = subscription.creditCardId;

    const onClickCreditCard = () => {
        if (!creditCardId) {
            // setIsCardAutoCreateModalOpen(true);
            return;
        } else {
            startSync().then((result) => result && reload());
        }
    };

    const onClickInvoiceAccount = () => {};

    return (
        <ListPageDropdown>
            <button className={`btn btn-sm btn-white gap-2 ${isSyncRunning ? 'btn-disabled' : ''}`}>
                <MdRefresh fontSize={14} className={isSyncRunning ? 'animate-spin' : ''} />
                <span>최신내역 불러오기</span>
            </button>

            <ListPageDropdownMenu>
                <div
                    className={`${!subscription.creditCardId || isSyncRunning ? 'pointer-events-none opacity-50' : ''}`}
                >
                    <MethodOption
                        Icon={FcDataBackup}
                        title="결제내역 불러오기"
                        desc="카드사 로그인으로 한 번에 불러와요"
                        onClick={onClickCreditCard}
                    />
                </div>

                <div className={`${!subscription.invoiceAccounts?.length && 'pointer-events-none opacity-50'}`}>
                    <MethodOption
                        Icon={FcDataBackup}
                        title="청구서 메일 불러오기"
                        desc="구글 로그인으로 한 번에 불러와요"
                        onClick={() => setIsInvoiceAutoCreateModalOpened(true)}
                    />
                </div>
            </ListPageDropdownMenu>

            <CardAutoCreateModal
                isOpened={isCardAutoCreateModalOpen}
                onClose={() => setIsCardAutoCreateModalOpen(false)}
                onCreate={() => {
                    setIsCardAutoCreateModalOpen(false);
                    return reload();
                }}
            />

            <InvoiceAccountAutoCreateModal
                isOpened={isInvoiceAutoCreateModalOpened}
                onClose={() => setIsInvoiceAutoCreateModalOpened(false)}
                onCreate={() => {
                    toast.success('불러온 청구서 메일을 추가했어요.');
                    setIsInvoiceAutoCreateModalOpened(false);
                    return reload();
                }}
                onRetry={() => setIsInvoiceAutoCreateModalOpened(true)}
            />
        </ListPageDropdown>
    );
});
