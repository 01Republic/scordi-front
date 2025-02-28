import {memo} from 'react';
import {subscriptionApi} from '^models/Subscription/api';
import {useAddableSubscriptionsOfCreditCard} from '^models/Subscription/hook';
import {SubscriptionSelectItem} from '^models/Subscription/components/SubscriptionSelectItem';
import {SlideUpSelectModal} from '^clients/private/_modals/SlideUpSelectModal';

interface BankAccountAddSubscriptionModalProps {
    bankAccountId: number;
    isOpened: boolean;
    onClose: () => any;
    onCreate?: () => any;
}

export const BankAccountAddSubscriptionModal = memo((props: BankAccountAddSubscriptionModalProps) => {
    const {isOpened, onClose, onCreate, bankAccountId} = props;
    const {search, result, isLoading, reset} = useAddableSubscriptionsOfCreditCard();

    const onSubmit = async (selectedIds: number[]) => {
        const req = selectedIds.map((id) => subscriptionApi.update(id, {bankAccountId}));
        await Promise.allSettled(req);
    };

    const addableSubscriptions = result.items.filter((item) => item.bankAccountId !== bankAccountId);

    return (
        <SlideUpSelectModal
            isOpened={isOpened}
            onClose={onClose}
            onOpened={() => search({})}
            onClosed={() => reset()}
            onCreate={onCreate}
            isLoading={isLoading}
            items={addableSubscriptions}
            getId={(item) => item.id}
            Row={({item, onClick, isSelected}) => (
                <SubscriptionSelectItem subscription={item} onClick={onClick} isSelected={isSelected} />
            )}
            onSubmit={onSubmit}
            titleCaption="새로운 구독 연결하기"
            title="연결할 구독을 모두 선택해주세요."
            ctaInactiveText="구독 선택"
            ctaActiveText="%n개의 선택된 구독 연결하기"
            toastMessage="선택한 구독을 연결했어요."
        />
    );
});
