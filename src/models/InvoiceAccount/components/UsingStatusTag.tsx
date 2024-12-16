import {memo} from 'react';
import {InvoiceAccountUsingStatus} from '^models/InvoiceAccount/type';
import {TagUI} from '^v3/share/table/columns/share/TagUI';

// 인보이스 계정 - 사용상태 : Tag UI
export const UsingStatusTag = memo((props: {value: InvoiceAccountUsingStatus | string}) => {
    const {value} = props;

    const colorClass =
        {
            [InvoiceAccountUsingStatus.UnDef]: 'bg-gray-100',
            [InvoiceAccountUsingStatus.NoUse]: 'bg-blue-100',
            [InvoiceAccountUsingStatus.InUse]: 'bg-green-200',
            [InvoiceAccountUsingStatus.Expired]: 'bg-red-200',
        }[value] || 'bg-gray-100';

    const text =
        {
            [InvoiceAccountUsingStatus.UnDef]: '미정',
            [InvoiceAccountUsingStatus.NoUse]: '미사용',
            [InvoiceAccountUsingStatus.InUse]: '사용중',
            [InvoiceAccountUsingStatus.Expired]: '만료됨',
        }[value] || '???';

    return <TagUI className={colorClass}>{text}</TagUI>;
});
