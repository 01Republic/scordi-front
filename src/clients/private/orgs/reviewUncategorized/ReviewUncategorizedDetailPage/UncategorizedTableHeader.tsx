import { memo } from 'react';

export const UncategorizedTableHeader = memo(() => {
    return (
        <tr className="bg-slate-100">
            <th className="py-3 text-left">일시</th>
            <th className="py-3 text-left">상태</th>
            <th className="py-3 text-left">내용</th>
            <th className="py-3 text-right">지출금액</th>
            <th className="py-3 text-left">연결된 구독</th>
        </tr>
    );
});
UncategorizedTableHeader.displayName = 'UncategorizedTableHeader';
