import { memo } from 'react';
import { CreditCardUsingStatus } from '^models/CreditCard/type';
import { TagUI } from '^v3/share/table/columns/share/TagUI';

export const UsingStatusTag = memo((props: {value: CreditCardUsingStatus | string}) => {
    const {value} = props;

    const colorClass =
        {
            [CreditCardUsingStatus.UnDef]: 'bg-gray-100',
            [CreditCardUsingStatus.NoUse]: 'bg-blue-100',
            [CreditCardUsingStatus.InUse]: 'bg-green-200',
            [CreditCardUsingStatus.Expired]: 'bg-red-200',
        }[value] || 'bg-gray-100';

    const text =
        {
            [CreditCardUsingStatus.UnDef]: '미정',
            [CreditCardUsingStatus.NoUse]: '미사용',
            [CreditCardUsingStatus.InUse]: '사용중',
            [CreditCardUsingStatus.Expired]: '만료됨',
        }[value] || '???';

    return <TagUI className={colorClass}>{text}</TagUI>;
});
