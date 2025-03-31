import {memo} from 'react';
import {SlideUpSelectModal} from '^clients/private/_modals/SlideUpSelectModal';
import {SubscriptionSelectItem} from '^models/Subscription/components/SubscriptionSelectItem';
import {useAddableSubscriptionsOfInvoiceAccount} from '^models/Subscription/hook';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';

interface InvoiceAccountAddSubscriptionModalProps {
    invoiceAccountId: number;
    isOpened: boolean;
    onClose: () => any;
    onCreate?: () => any;
}

export const InvoiceAccountAddSubscriptionModal = memo((props: InvoiceAccountAddSubscriptionModalProps) => {
    const {isOpened, onClose, onCreate, invoiceAccountId} = props;
    const {search, result, isLoading, reset} = useAddableSubscriptionsOfInvoiceAccount();

    const onSubmit = async (selectedIds: number[]) => {
        const createConnect = (id: number) => invoiceAccountApi.subscriptionsApi.create(invoiceAccountId, id);
        const req = selectedIds.map(createConnect);
        await Promise.allSettled(req);
    };

    return (
        <SlideUpSelectModal
            isOpened={isOpened}
            onClose={onClose}
            onOpened={() => search({})}
            onClosed={() => reset()}
            onCreate={onCreate}
            isLoading={isLoading}
            items={result.items}
            getId={(item) => item.id}
            Row={({item, onClick, isSelected}) => (
                <SubscriptionSelectItem subscription={item} onClick={onClick} isSelected={isSelected} />
            )}
            onSubmit={onSubmit}
            titleCaption="새로운 구독 연결하기"
            title="어느 구독을 연결할까요?"
            ctaInactiveText="구독을 선택해주세요"
            ctaActiveText="%n개의 선택된 구독 연결하기"
            successMessage="선택한 구독을 연결했어요."
            emptyText="연결할 구독이 없어요"
        />
    );
});
InvoiceAccountAddSubscriptionModal.displayName = 'InvoiceAccountAddSubscriptionModal';
