import {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {eventCut} from '^utils/event';
import {subscriptionApi} from '^models/Subscription/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';

interface RemoveProductSubscriptionButtonProps {
    subscription: SubscriptionDto;
    onFinish: () => any;
}

export const RemoveProductSubscriptionButton = memo((props: RemoveProductSubscriptionButtonProps) => {
    const {subscription, onFinish} = props;

    const onClick = () => {
        console.log('RemoveProductSubscriptionButton.subscription', subscription);
        if (confirm('이 구독을 정말 삭제할까요?\n\n이 작업은 복구가 불가능합니다.\n정말 삭제할까요?')) {
            subscriptionApi
                .destroy(subscription.id)
                .then(() => toast.success('삭제되었어요'))
                .then(() => onFinish())
                .catch(errorToast);
        }
    };

    return (
        <a
            className="bg-red-100/70 text-red-500 hover:bg-red-400 hover:text-white active:bg-red-600 active:text-white"
            onClick={(e) => {
                eventCut(e);
                onClick();
            }}
        >
            삭제하기
        </a>
    );
});
RemoveProductSubscriptionButton.displayName = 'RemoveProductSubscriptionButton';
