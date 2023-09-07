import {memo} from 'react';
import {
    BillingHistoryDto,
    getBillingHistoryPaidPrice,
    getBillingHistoryStatus,
    getInvoiceAppBillingCycle,
} from '^types/billing.type';
import {yyyy_mm_dd} from '^utils/dateTime';
import {useTranslation} from 'next-i18next';

interface InvoiceTableRowProps {
    invoiceData: BillingHistoryDto;
}

export const InvoiceTableRow = memo((props: InvoiceTableRowProps) => {
    // const {t} = useTranslation('org-home', {keyPrefix: 'invoiceTable'});
    const {invoiceData: billingHistory} = props;
    const {application, invoiceApp, emailContent} = billingHistory;
    const product = application?.product || invoiceApp?.product;

    const tableTranslator = (rowKey: string, value: string) => {
        const keyPrefix = `invoiceTable.${rowKey}`;
        const {t} = useTranslation('org-home', {keyPrefix});
        return t(value);
    };

    // 결제일
    const issuedAt = yyyy_mm_dd(new Date(billingHistory.issuedAt));
    // 청구자
    const issuedTo = application?.displayName || emailContent?.sender;
    // 상태
    const paidStatus = getBillingHistoryStatus(billingHistory);
    // 지불금액
    const paidPrice = getBillingHistoryPaidPrice(billingHistory);
    // 결제 유형
    const billingCycle = getInvoiceAppBillingCycle(application, invoiceApp);

    // 서비스명
    const appLogo = product?.image;
    const appName = product?.nameEn;
    // 청구 메일
    const receivedMail = application
        ? application.billingEmail || application.publicEmail
        : emailContent?.metadata.receiver;

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
                        paidStatus === 'PaySuccess'
                            ? 'bg-green-200 text-green-700'
                            : paidStatus === 'PayFail'
                            ? 'bg-red-200 text-red-700'
                            : paidStatus === 'Info'
                            ? 'bg-blue-200 text-blue-700'
                            : 'bg-amber-200 text-amber-700'
                    }`}
                >
                    {tableTranslator('paidStatus', paidStatus)}
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

            {/* 결제주기 */}
            <td>{billingCycle}</td>

            {/*/!* 결제수단 *!/*/}
            {/*<td>-</td>*/}
            {/*<td>신용/체크카드</td>*/}

            {/* 결제금액 */}
            <td>{paidPrice}</td>

            {/* 청구 메일 */}
            <td>{receivedMail}</td>

            {/*/!* PG사 *!/*/}
            {/*<td>나이스페이</td>*/}
        </tr>
    );
});
