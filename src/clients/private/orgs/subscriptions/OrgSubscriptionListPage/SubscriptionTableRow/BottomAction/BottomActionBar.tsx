import {MergeSubscriptionModal} from '^clients/private/orgs/subscriptions/OrgSubscriptionListPage/SubscriptionTableRow/BottomAction/MergeSubscriptionModal';
import {CheckboxHandler} from '^hooks/useCheckboxHandler';
import {SubscriptionDto} from '^models/Subscription/types/Subscription.dto';
import {Merge, RotateCcw} from 'lucide-react';
import {useState} from 'react';

interface BottomActionBarProps {
    items: CheckboxHandler<SubscriptionDto>;
    onClear: () => void;
}

export const BottomActionBar = (props: BottomActionBarProps) => {
    const {items, onClear} = props;
    const itemCount = items.checkedItems.length;
    const [isMergeSubscriptionModal, setIsMergeSubscriptionModal] = useState(false);
    return (
        <div className="flex justify-center items-center w-full text-14">
            <div className="flex flex-row gap-3 items-center px-6 py-1 bg-white rounded-full border border-gray-300 shadow-lg min-w-md">
                <span className="text-gray-600">{itemCount}개 선택됨</span>
                <button
                    className={`flex gap-1 btn btn-sm no-animation btn-animation ${
                        itemCount < 2 ? 'btn-disabled2' : 'btn-white'
                    }`}
                    onClick={() => setIsMergeSubscriptionModal(true)}
                >
                    <Merge />
                    구독 병합
                </button>
                <RotateCcw className="text-gray-500 cursor-pointer hover:text-red-400" onClick={onClear} />
            </div>
            <MergeSubscriptionModal
                isOpened={isMergeSubscriptionModal}
                onClose={() => setIsMergeSubscriptionModal(false)}
                subscriptions={items.checkedItems}
            />
        </div>
    );
};
