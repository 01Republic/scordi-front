import React, {memo} from 'react';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {SubscriptionSeatStatus} from '^models/SubscriptionSeat/type';

export const SubscriptionSeatStatusTag = memo((props: {value: SubscriptionSeatStatus | string}) => {
    const {value} = props;

    const colorClass =
        {
            [SubscriptionSeatStatus.QUIT]: 'bg-red-200',
            [SubscriptionSeatStatus.PAID]: 'bg-green-200',
            [SubscriptionSeatStatus.FREE]: 'bg-cyan-200',
            [SubscriptionSeatStatus.NONE]: 'bg-gray-100',
        }[value] || SubscriptionSeatStatus.NONE;

    const text =
        {
            [SubscriptionSeatStatus.QUIT]: '해지',
            [SubscriptionSeatStatus.PAID]: '유료',
            [SubscriptionSeatStatus.FREE]: '무료',
            [SubscriptionSeatStatus.NONE]: '미정',
        }[value] || SubscriptionSeatStatus.NONE;

    return <TagUI className={colorClass}>{text}</TagUI>;
});
