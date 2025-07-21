import {memo} from 'react';
import {X} from 'lucide-react';
import {SubscriptionDto} from '^models/Subscription/types';
import {BasicModal} from '^components/modals/_shared/BasicModal';
import {MergeSubscriptionItem} from './MergeSubscriptionItem';
import {useCheckboxHandler} from '^hooks/useCheckboxHandler';

interface MergeSubscriptionModalProps {
    isOpened: boolean;
    onClose: () => void;
    subscriptions: SubscriptionDto[];
}

export const MergeSubscriptionModal = memo((props: MergeSubscriptionModalProps) => {
    const {isOpened, onClose, subscriptions} = props;
    const items = useCheckboxHandler<SubscriptionDto>([], (sub) => sub.id);

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
                <ul className="flex overflow-y-auto overflow-x-hidden flex-col gap-4 py-3 w-full max-h-80 border-t border-b border-gray-300">
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
                    className={`btn btn-md text-16 ${items.checkedItems.length === 0 ? 'btn-disabled2' : 'btn-scordi'}`}
                >
                    선택 완료
                </button>
            </div>
        </BasicModal>
    );
});
