import {MethodOption} from '^clients/private/_layouts/_shared/ListPageMainDropdown';
import {CardAutoCreateModal} from '^clients/private/_modals/credit-cards';
import {useCreditCardSync} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionPaymentTab/PaymentSync/atom';
import {LoadableBox} from '^components/util/loading';
import {SubscriptionDto} from '^models/Subscription/types';
import {Database} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo, useState} from 'react';

interface SycnCreditCardButtonProps {
    subscription: SubscriptionDto;
    reload: () => any;
}

export const SycnCreditCardButton = memo((props: SycnCreditCardButtonProps) => {
    const {subscription, reload} = props;
    const {startSync, isSyncRunning} = useCreditCardSync(subscription.creditCard);
    const creditCardId = subscription.creditCardId;
    const [isCardAutoCreateModalOpen, setIsCardAutoCreateModalOpen] = useState(false);
    const {t} = useTranslation('subscription');

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
                    title={t('detail.paymentSync.creditCard.title')}
                    desc={t('detail.paymentSync.creditCard.desc')}
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
