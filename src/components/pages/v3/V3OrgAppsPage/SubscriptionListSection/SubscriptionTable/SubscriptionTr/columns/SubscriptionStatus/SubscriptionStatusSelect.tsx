import {memo} from 'react';
import {
    c_SubscriptionStatus,
    SubscriptionDto,
    subscriptionStatusOptions,
    t_SubscriptionStatus,
} from '^models/Subscription/types';
import {SubscriptionStatus} from '^models/Subscription/types';
import {subscriptionApi} from '^models/Subscription/api';
import {useDropdown} from '^hooks/useDropdown';
import {useToast} from '^hooks/useToast';

interface SubscriptionStatusSelectProps {
    subscription: SubscriptionDto;
    onChange: (value: SubscriptionStatus) => any;
}

export const SubscriptionStatusSelect = memo((props: SubscriptionStatusSelectProps) => {
    const {toast} = useToast();
    const {setSelectEl, setReferenceEl, styles, attributes} = useDropdown();
    const {subscription, onChange} = props;

    if (!subscription) return <></>;

    const onClick = (status: SubscriptionStatus) => {
        if (status == subscription.status) return;

        // 구독 업데이트 api
        subscriptionApi
            .update(subscription.id, {status: status})
            .then(() => onChange(status))
            .finally(() => toast.success('수정했습니다'));
    };

    const options = subscriptionStatusOptions();

    return (
        <div className="dropdown relative">
            <div
                ref={setReferenceEl}
                tabIndex={0}
                className={`${c_SubscriptionStatus(subscription.status)} btn btn-xs border-0 cursor-pointer px-5 m-1`}
            >
                <span className="font-normal">{t_SubscriptionStatus(subscription.status)}</span>
            </div>
            <ul
                ref={setSelectEl}
                style={styles.popper}
                {...attributes.popper}
                tabIndex={0}
                className="dropdown-content !z-[1] menu py-2 px-5 border shadow bg-base-100 rounded-box"
            >
                {options.map((option, i) => (
                    <li
                        onClick={() => onClick(option.status)}
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
