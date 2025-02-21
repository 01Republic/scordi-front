import {memo} from 'react';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {c_SubscriptionUsingStatus, SubscriptionUsingStatus, t_SubscriptionUsingStatus} from '../types';

interface SubscriptionUsingStatusTagProps {
    value: string | SubscriptionUsingStatus;
    className?: string;
}

export const SubscriptionUsingStatusTag = memo((props: SubscriptionUsingStatusTagProps) => {
    const {value, className = ''} = props;
    const colorClass = c_SubscriptionUsingStatus(value as SubscriptionUsingStatus);
    const text = t_SubscriptionUsingStatus(value as SubscriptionUsingStatus);
    return <TagUI className={`${colorClass} ${className}`}>{text}</TagUI>;
});
