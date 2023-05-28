import {memo} from 'react';
import {BillingHistoryDto} from '^types/billing.type';
import {yyyy_mm_dd} from '^utils/dateTime';

interface InvoiceTableRowProps {
    invoiceData: BillingHistoryDto;
}

export const InvoiceTableRow = memo((props: InvoiceTableRowProps) => {
    const {invoiceData: billingHistory} = props;
    const {application} = billingHistory;

    // 결제일
    const issuedAt = yyyy_mm_dd(new Date(billingHistory.issuedAt));
    // 청구자
    const issuedTo = application?.displayName;
    // 상태
    const paidStatus = billingHistory.isSuccess ? 'Completed' : 'Failure';
    // 서비스명
    const appLogo = application?.prototype.image;
    const appName = application?.prototype.name;

    return (
        <tr className="text-sm">
            <th>
                <label>
                    <input type="checkbox" className="checkbox checkbox-sm" />
                </label>
            </th>

            {/* 결제일/청구자 */}
            <td>
                <div>
                    <p className="text-sm font-bold">{issuedAt}</p>
                    <p className="text-sm opacity-50">{issuedTo}</p>
                </div>
            </td>

            {/* 상태 */}
            <td>
                <div
                    className={`badge h-6 border-none rounded-lg text-xs ${
                        billingHistory.isSuccess ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
                    }`}
                >
                    {paidStatus}
                </div>
            </td>

            {/* 서비스명 */}
            <td>
                <div className="flex items-center gap-4">
                    <div className="avatar">
                        <div className="mask mask-circle w-8 h-8">
                            <img
                                src={appLogo || 'https://daisyui.com/tailwind-css-component-profile-2@56w.png'}
                                alt={`${appName} service logo`}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="text-sm">{appName}</div>
                    </div>
                </div>
            </td>

            {/* 타입 */}
            <td>정기결제(연간)</td>

            {/* 결제수단 */}
            <td>-</td>
            {/*<td>신용/체크카드</td>*/}

            {/* 결제금액 */}
            <td>₩328,999</td>

            {/* 청구 메일 */}
            <td>diana@01repbulic.io</td>

            {/* PG사 */}
            <td>나이스페이</td>
        </tr>
    );
});
