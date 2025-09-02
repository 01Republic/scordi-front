import {memo} from 'react';
import {CircleAlert, Info} from 'lucide-react';
import {BillingHistoryStatusTagUI} from '^models/BillingHistory/components/BillingHistoryStatusTagUI';

interface UncategorizedTableRowProps {
    item: any;
    onClick?: () => void;
}

export const UncategorizedTableRow = memo((props: UncategorizedTableRowProps) => {
    const {item, onClick} = props;

    return (
        <>
            <tr className="group text-sm cursor-pointer hover:!bg-scordi-50" onClick={onClick}>
                {/* 일시 */}
                <td>{item.date}</td>

                {/* 상태 */}
                <td>
                    <BillingHistoryStatusTagUI billingHistory={item} />
                </td>

                {/* 내용 */}
                <td>{item.content}</td>

                {/* 지출금액 */}
                <td className="text-right">{item.amount}</td>

                {/* 연결된 구독 */}
                <td>
                    <div className="flex items-center gap-1">
                        <CircleAlert className="size-5 stroke-1" />
                        <span>{item.subscription}</span>
                    </div>
                </td>
            </tr>
        </>
    );
});
UncategorizedTableRow.displayName = 'BankAccountTableRow';
