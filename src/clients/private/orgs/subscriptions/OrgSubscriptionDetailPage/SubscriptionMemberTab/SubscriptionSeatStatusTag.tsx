import {SubscriptionSeatStatus} from '^models/SubscriptionSeat/type';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

export const SubscriptionSeatStatusTag = memo((props: {value: SubscriptionSeatStatus | string}) => {
    const {value} = props;
    const {t} = useTranslation('subscription');

    const colorClass =
        {
            [SubscriptionSeatStatus.QUIT]: 'bg-red-200',
            [SubscriptionSeatStatus.PAID]: 'bg-green-200',
            [SubscriptionSeatStatus.FREE]: 'bg-cyan-200',
            [SubscriptionSeatStatus.NONE]: 'bg-gray-100',
        }[value] || SubscriptionSeatStatus.NONE;

    const text =
        {
            [SubscriptionSeatStatus.QUIT]: t('detail.memberStatus.quit'),
            [SubscriptionSeatStatus.PAID]: t('detail.memberStatus.paid'),
            [SubscriptionSeatStatus.FREE]: t('detail.memberStatus.free'),
            [SubscriptionSeatStatus.NONE]: t('detail.memberStatus.none'),
        }[value] || t('detail.memberStatus.none');

    return <TagUI className={colorClass}>{text}</TagUI>;
});
