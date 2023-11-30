import {memo, useEffect, useState} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {SubscriptionStatus} from '^models/Subscription/types';
import {
    Option,
    options,
} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns/SubscriptionStatus/type';

interface SubscriptionStatusSelectProps {
    subscription: SubscriptionDto;
}

export const SubscriptionStatusSelect = memo((props: SubscriptionStatusSelectProps) => {
    const {subscription} = props;
    const [tagName, setTagName] = useState<Option>();

    useEffect(() => {
        const defaultTag = options.find((option) => {
            return option.status === subscription.status;
        });

        setTagName(defaultTag);
    }, []);

    const onChange = (status: SubscriptionStatus) => {
        const selectedTag = options.find((option) => {
            return option.status === status;
        });
        setTagName(selectedTag);
    };

    return (
        <>
            <div className="dropdown">
                <div tabIndex={0} className={`!${tagName?.className} btn btn-xs !border-0 cursor-pointer px-5 m-auto`}>
                    <span className="font-normal">{tagName?.name}</span>
                </div>

                <ul className="dropdown-content z-[1] py-2 px-5 shadow bg-base-100 rounded-box flex flex-col gap-1">
                    {options.map((option) => (
                        <li
                            onClick={() => onChange(option.status)}
                            value={option.status}
                            className={`!${tagName?.className} btn btn-xs !border-0 cursor-pointer px-5 m-auto`}
                        >
                            <span className="font-normal">{option.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
});
