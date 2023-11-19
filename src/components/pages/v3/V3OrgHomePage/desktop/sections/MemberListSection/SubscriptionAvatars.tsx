import {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';

interface SubscriptionAvatarsProps {
    subscriptions: SubscriptionDto[];
    max?: number;
}

export const SubscriptionAvatars = memo((props: SubscriptionAvatarsProps) => {
    const {subscriptions, max = 3} = props;

    const etcSize = subscriptions.length - max;

    return (
        <div className="avatar-group -space-x-3 overflow-visible">
            {subscriptions.slice(0, max).map((subscription, i) => (
                <div
                    key={i}
                    className="avatar rounded-full bg-white border-[3px] tooltip tooltip-bottom overflow-visible"
                    data-tip={subscription.product.nameEn}
                >
                    <div className="w-6 h-6">
                        <img
                            className="mask mask-circle"
                            src={subscription.product.image}
                            alt={subscription.product.nameEn}
                            loading="lazy"
                        />
                    </div>
                </div>
            ))}
            {etcSize > 0 && (
                <div className="avatar placeholder">
                    <div className="w-6 h-6 bg-neutral-focus text-neutral-content">
                        <span className="text-xs">+{etcSize}</span>
                    </div>
                </div>
            )}
            {subscriptions.length == 0 && (
                <div
                    className="avatar rounded-full placeholder tooltip tooltip-bottom overflow-visible"
                    data-tip="팀 연결 필요"
                >
                    <div className="w-6 h-6 bg-neutral-focus text-neutral-content rounded-full">
                        <span className="text-xs">?</span>
                    </div>
                </div>
            )}
        </div>
    );
});
SubscriptionAvatars.displayName = 'SubscriptionAvatars';
