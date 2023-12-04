import {memo, useEffect, useState} from 'react';
import {
    c_SubscriptionStatus,
    SubscriptionDto,
    subscriptionStatusOptions,
    t_SubscriptionStatus,
} from '^models/Subscription/types';
import {SubscriptionStatus} from '^models/Subscription/types';
import {subscriptionApi} from '^models/Subscription/api';

interface SubscriptionStatusSelectProps {
    subscription: SubscriptionDto;
}

export const SubscriptionStatusSelect = memo((props: SubscriptionStatusSelectProps) => {
    const [tagName, setTagName] = useState<SubscriptionStatus>();
    const [className, setClassName] = useState<SubscriptionStatus>();
    const {subscription} = props;

    if (!subscription) return <></>;

    const subscriptionName = tagName && t_SubscriptionStatus(tagName);
    const subscriptionClassName = className && c_SubscriptionStatus(className);

    useEffect(() => {
        setTagName(subscription.status);
        setClassName(subscription.status);
    }, []);

    const onChange = (status: SubscriptionStatus) => {
        setTagName(status);
        setClassName(status);

        // 구독 업데이트 api
        subscriptionApi.update(subscription.id, {status: status});
    };

    const options = subscriptionStatusOptions();
    return (
        <div className="dropdown relative">
            <div tabIndex={0} className={`${subscriptionClassName} btn btn-xs border-0 cursor-pointer px-5 m-1`}>
                <span className="font-normal">{subscriptionName}</span>
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu py-2 px-5 border shadow bg-base-100 rounded-box absolute top-8 -left-4"
            >
                {options.map((option, i) => (
                    <li
                        onClick={() => onChange(option.status)}
                        value={option.status}
                        className="border-0 cursor-pointer mb-1"
                        key={i}
                    >
                        <span className={`${option?.className} btn-xs px-5`}>{option.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
});
