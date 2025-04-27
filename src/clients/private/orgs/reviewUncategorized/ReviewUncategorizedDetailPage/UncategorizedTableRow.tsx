import {BillingHistoryStatusTagUI} from '^models/BillingHistory/components/BillingHistoryStatusTagUI';
import {Info} from 'lucide-react';
import {memo} from 'react';

interface UncategorizedTableRowProps {
    item: any;
    onClick?: () => void;
}

export const UncategorizedTableRow = memo((props: UncategorizedTableRowProps) => {
    const {item, onClick} = props;

    return (
        <>
            <tr className="group text-sm py-2 cursor-pointer hover:!bg-scordi-50" onClick={onClick}>
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
                        <span>
                            <Info className="w-4 h-4" />
                        </span>
                        {item.subscription}
                    </div>
                </td>
            </tr>
        </>
    );
});
UncategorizedTableRow.displayName = 'BankAccountTableRow';
