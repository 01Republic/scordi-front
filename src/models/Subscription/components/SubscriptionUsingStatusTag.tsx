import {memo} from 'react';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {c_SubscriptionUsingStatus, SubscriptionUsingStatus, t_SubscriptionUsingStatus} from '../types';

export const SubscriptionUsingStatusTag = memo((props: {value: string | SubscriptionUsingStatus}) => {
    const {value} = props;
    const colorClass = c_SubscriptionUsingStatus(value as SubscriptionUsingStatus);
    const text = t_SubscriptionUsingStatus(value as SubscriptionUsingStatus);

    return <TagUI className={colorClass}>{text}</TagUI>;
});
