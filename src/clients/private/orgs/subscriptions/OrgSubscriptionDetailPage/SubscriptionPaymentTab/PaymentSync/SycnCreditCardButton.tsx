import React, {memo, useState} from 'react';
import {MethodOption} from '^clients/private/_layouts/_shared/ListPageMainDropdown';
import {useCreditCardSync} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionPaymentTab/PaymentSync/atom';
import {SubscriptionDto} from '^models/Subscription/types';
import {CardAutoCreateModal} from '^clients/private/_modals/credit-cards';
import {LoadableBox} from '^components/util/loading';
import {Database} from 'lucide-react';

interface SycnCreditCardButtonProps {
    subscription: SubscriptionDto;
    reload: () => any;
}

export const SycnCreditCardButton = memo((props: SycnCreditCardButtonProps) => {
    const {subscription, reload} = props;
    const {startSync, isSyncRunning} = useCreditCardSync(subscription.creditCard);
    const creditCardId = subscription.creditCardId;
    const [isCardAutoCreateModalOpen, setIsCardAutoCreateModalOpen] = useState(false);

    const onClickCreditCard = () => {
        if (!creditCardId) {
            // setIsCardAutoCreateModalOpen(true);
            return;
        } else {
            startSync().then((result) => result && reload());
        }
    };

    return (
        <LoadableBox isLoading={isSyncRunning} loadingType={2} noPadding spinnerPos="center">
            <div
                className={`${
                    !subscription.creditCardId || isSyncRunning ? 'pointer-events-none opacity-50' : 'relative'
                }`}
            >
                <MethodOption
                    Icon={Database}
                    title="결제내역 불러오기"
                    desc="카드사 로그인으로 한 번에 불러와요"
                    onClick={onClickCreditCard}
                />
                <CardAutoCreateModal
                    isOpened={isCardAutoCreateModalOpen}
                    onClose={() => setIsCardAutoCreateModalOpen(false)}
                    onCreate={() => {
                        setIsCardAutoCreateModalOpen(false);
                        return reload();
                    }}
                />
            </div>
        </LoadableBox>
    );
});
