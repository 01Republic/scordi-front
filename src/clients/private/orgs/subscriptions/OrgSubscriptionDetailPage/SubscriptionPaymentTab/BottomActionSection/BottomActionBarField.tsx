import React, {memo, useState} from 'react';
import {BottomActionBar} from '^_components/BottomAction/BottomActionBar';
import {CheckboxHandler} from '^hooks/useCheckboxHandler';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {BottomActionBarButton} from '^_components/BottomAction/BottomActionBarButton';
import {Split} from 'lucide-react';
import {SplitBillingHistoryModal} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionPaymentTab/BottomActionSection/SplitBillingHistoryModal';
import {useSplitByBillingHistories} from '^models/Subscription/hook';
import {useCurrentSubscription} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {useRouter} from 'next/router';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';
import {toast} from 'react-hot-toast';

interface BottomActionBarFieldProps {
    checkboxHandler: CheckboxHandler<BillingHistoryDto>;
}

export const BottomActionBarField = memo((props: BottomActionBarFieldProps) => {
    const {checkboxHandler: ch} = props;
    const router = useRouter();
    const {currentSubscription: subscription} = useCurrentSubscription();
    const [isOpenModal, setIsOpenModal] = useState(false);

    if (!subscription) return <></>;
    const {mutateAsync, isPending} = useSplitByBillingHistories(subscription.id);

    const checkedItems = ch.checkedItems;
    const itemCount = checkedItems.length;
    const onClear = ch.clearAll;

    const onSplitSubscription = () => {
        const billingHistoryIds = checkedItems.map((item) => item.id);
        mutateAsync(
            {billingHistoryIds},
            {
                onSuccess: (res) => {
                    const {data: createSubscription} = res;
                    router.push(
                        OrgSubscriptionDetailPageRoute.path(createSubscription.organizationId, createSubscription.id) +
                            '?tab=payment',
                    );
                },
            },
        ).then(() => toast.success('구독분리가 완료되었어요.'));
    };

    return (
        <BottomActionBar itemCount={itemCount} onClear={onClear}>
            <BottomActionBarButton Icon={<Split />} buttonText="구독 분리" onClick={() => setIsOpenModal(true)} />

            {isOpenModal && (
                <SplitBillingHistoryModal
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                    checkedItems={checkedItems}
                    subscription={subscription}
                    onClick={onSplitSubscription}
                    isLoading={isPending}
                />
            )}
        </BottomActionBar>
    );
});
