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
import {MdOutlineRefresh} from 'react-icons/md';

interface AddPaymentHistoryDropdownProps {
    reload: () => any;
}

export const AddPaymentHistoryDropdown = memo((props: AddPaymentHistoryDropdownProps) => {
    const {reload} = props;
    const [isCardAutoCreateModalOpen, setIsCardAutoCreateModalOpen] = useState(false);
    const [isInvoiceAutoCreateModalOpened, setIsInvoiceAutoCreateModalOpened] = useState(false);

    return (
        <ListPageDropdown>
            <button className={'btn btn-outline btn-sm text-14 bg-white'} onClick={() => console.log(true)}>
                <MdOutlineRefresh />
                &nbsp;최신내역 불러오기
            </button>

            <ListPageDropdownMenu>
                <MethodOption
                    Icon={FcDataBackup}
                    title="결제내역 불러오기"
                    desc="카드사 로그인으로 한 번에 불러와요"
                    onClick={() => setIsCardAutoCreateModalOpen(true)}
                />

                <MethodOption
                    Icon={FcDataBackup}
                    title="청구서 메일 불러오기"
                    desc="구글 로그인으로 한 번에 불러와요"
                    onClick={() => setIsInvoiceAutoCreateModalOpened(true)}
                />
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
