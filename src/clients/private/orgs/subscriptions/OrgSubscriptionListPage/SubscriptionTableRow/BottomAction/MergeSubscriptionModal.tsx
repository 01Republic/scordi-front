import React, {memo} from 'react';
import {X} from 'lucide-react';
import {SubscriptionDto} from '^models/Subscription/types';
import {BasicModal} from '^components/modals/_shared/BasicModal';
import {MergeSubscriptionItem} from './MergeSubscriptionItem';
import {useCheckboxHandler} from '^hooks/useCheckboxHandler';
import {useMergeSubscriptions} from '^models/Subscription/hook';
import {toast} from 'react-hot-toast';
import {confirm2, confirmed} from '^components/util/dialog';
import {errorToast} from '^api/api';

interface MergeSubscriptionModalProps {
    isOpened: boolean;
    onClose: () => void;
    subscriptions: SubscriptionDto[];
    onClear: () => void;
}

export const MergeSubscriptionModal = memo((props: MergeSubscriptionModalProps) => {
    const {isOpened, onClose, subscriptions, onClear} = props;
    const items = useCheckboxHandler<SubscriptionDto>([], (sub) => sub.id);
    const {mutateAsync: mergeSubscriptions, isPending} = useMergeSubscriptions();

    const selectedId = items.checkedItems[0]?.id;
    const unselectedIds = subscriptions.filter((sub) => sub.id !== selectedId).map((sub) => sub.id);

    const onMerge = () => {
        const mergeConfirm = () => {
            return confirm2(
                '선택한 구독이 대표 구독이 됩니다.',
                <div className="text-16">
                    선택되지 않은 구독은 대표 구독으로 병합 후 목록에서 제거되며,
                    <br />
                    병합된 내역은 복구할 수 없습니다.
                    <br />
                    구독을 병합할까요?
                </div>,
                'warning',
            );
        };

        confirmed(mergeConfirm(), '병합 취소')
            .then(() =>
                mergeSubscriptions({
                    id: selectedId,
                    data: {
                        subscriptionIds: unselectedIds,
                    },
                }),
            )
            .then(() => toast.success('구독을 병합했어요.'))
            .then(() => onClear())
            .then(() => onClose())
            .catch(errorToast)
            .finally(() => {
                onClear();
                onClose();
            });
    };

    return (
        <BasicModal open={isOpened} onClose={onClose}>
            <div className="flex flex-col gap-5 justify-between p-8 max-w-xl modal-box keep-all">
                <section className="flex flex-col gap-1 w-full">
                    <div className="flex justify-between items-start w-full">
                        <header className="font-semibold text-20">대표 구독 선택</header>
                        <X className="cursor-pointer size-6" onClick={onClose} />
                    </div>
                    <span className="text-gray-700 text-14">
                        대표 구독을 기준으로 결제 내역이 합쳐져요. <br /> 마지막 결제일과 금액을 꼭 확인하고
                        선택해주세요.
                    </span>
                </section>
                <ul className="flex overflow-y-auto flex-col gap-4 py-3 w-full max-h-80 border-t border-b border-gray-300">
                    {subscriptions.map((subscription) => {
                        return (
                            <MergeSubscriptionItem
                                subscription={subscription}
                                isChecked={items.isChecked(subscription)}
                                onCheck={(checked) => {
                                    items.checkAll(false);
                                    if (checked) items.checkOne(subscription, true);
                                }}
                            />
                        );
                    })}
                </ul>
                <button
                    onClick={onMerge}
                    className={`btn btn-md text-16 ${
                        items.checkedItems.length === 0 ? 'btn-disabled2' : 'btn-scordi'
                    } ${isPending ? 'link_to-loading' : ''}`}
                >
                    선택 완료
                </button>
            </div>
        </BasicModal>
    );
});
