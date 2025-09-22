import React, {memo, useState} from 'react';
import {BottomActionBar} from '^_components/BottomAction/BottomActionBar';
import {CheckboxHandler} from '^hooks/useCheckboxHandler';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {BottomActionBarButton} from '^_components/BottomAction/BottomActionBarButton';
import {Combine, Split} from 'lucide-react';
import {SplitBillingHistoryModal} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionPaymentTab/BottomActionSection/SplitBillingHistoryModal';
import {useSplitByBillingHistories} from '^models/Subscription/hook';
import {useCurrentSubscription} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {useRouter} from 'next/router';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';
import {toast} from 'react-hot-toast';
import Tippy from '@tippyjs/react';

interface BottomActionBarFieldProps {
    checkboxHandler: CheckboxHandler<BillingHistoryDto>;
    billingHistory: BillingHistoryDto[];
}

export const BottomActionBarField = memo((props: BottomActionBarFieldProps) => {
    const {checkboxHandler: ch, billingHistory} = props;
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

    const tippyMessage =
        checkedItems.length <= 1 ? '두개 이상 선택 시 분리가 가능합니다' : '분리가 필요한 결제내역만 선택해주세요';

    return (
        <BottomActionBar itemCount={itemCount} onClear={onClear}>
            {checkedItems.length <= 1 || billingHistory.length === checkedItems.length ? (
                <Tippy content={tippyMessage}>
                    <div className="flex gap-1 text-gray-400 bg-gray-200 btn btn-sm no-animation btn-animation hover:!bg-gray-150">
                        <Split />
                        구독 분리
                    </div>
                </Tippy>
            ) : (
                <BottomActionBarButton Icon={<Split />} buttonText="구독 분리" onClick={() => setIsOpenModal(true)} />
            )}

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
