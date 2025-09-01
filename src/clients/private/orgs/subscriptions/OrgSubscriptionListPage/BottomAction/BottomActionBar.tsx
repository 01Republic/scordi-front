import {useState} from 'react';
import {RotateCcw, Combine} from 'lucide-react';
import Tippy from '@tippyjs/react';
import {CheckboxHandler} from '^hooks/useCheckboxHandler';
import {SubscriptionDto} from '^models/Subscription/types/Subscription.dto';
import {MergeSubscriptionModal} from './MergeSubscriptionModal';

interface BottomActionBarProps {
    items: SubscriptionDto[];
    onClear: () => void;
}

export const BottomActionBar = (props: BottomActionBarProps) => {
    const {items, onClear} = props;
    const itemCount = items.length;
    const [isMergeSubscriptionModal, setIsMergeSubscriptionModal] = useState(false);

    const uniqueProductCount = new Set(items.map((subscription) => subscription.productId)).size;

    const canMerge = itemCount >= 2 && uniqueProductCount === 1;

    const tippyMessage =
        itemCount < 2
            ? '두개 이상 선택 시 병합이 가능합니다'
            : uniqueProductCount > 1
            ? '서로 다른 구독은 병합할 수 없습니다'
            : '';

    return (
        <div className="flex justify-center items-center w-full text-14">
            <div className="flex flex-row gap-3 items-center px-6 py-1 bg-white rounded-full border border-gray-300 shadow-lg min-w-md">
                <span className="text-gray-600">{itemCount}개 선택됨</span>

                {canMerge ? (
                    <button
                        className="flex gap-1 btn btn-sm no-animation btn-animation btn-white"
                        onClick={() => setIsMergeSubscriptionModal(true)}
                    >
                        <Combine />
                        구독 병합
                    </button>
                ) : (
                    <Tippy content={tippyMessage}>
                        <div className="flex gap-1 text-gray-400 bg-gray-200 btn btn-sm no-animation btn-animation hover:!bg-gray-150">
                            <Combine />
                            구독 병합
                        </div>
                    </Tippy>
                )}

                <RotateCcw className="text-gray-500 cursor-pointer hover:text-red-400" onClick={onClear} />
            </div>
            <MergeSubscriptionModal
                isOpened={isMergeSubscriptionModal}
                onClose={() => setIsMergeSubscriptionModal(false)}
                subscriptions={items}
                onClear={onClear}
            />
        </div>
    );
};
