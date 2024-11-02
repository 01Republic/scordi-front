import React, {memo} from 'react';
import {ScordiPaymentDto, t_scordiPaymentStatus} from '^models/_scordi/ScordiPayment/type';
import {CurrencyCode} from '^models/Money';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {LinkTo} from '^components/util/LinkTo';
import Tippy from '@tippyjs/react';

interface DPayPaymentTableRowProps {
    payment: ScordiPaymentDto;
}

export const DPayPaymentTableRow = memo((props: DPayPaymentTableRowProps) => {
    const {payment} = props;

    const response = payment.response;
    const card = response?.card;
    const company = response?.cardIssuerCompany;

    const currency = payment.currencyInfo;
    const currencyExchange = currency?.code || CurrencyCode.KRW;
    const currencySymbol = currency?.symbol || '₩';

    const invoiceUrl = payment.invoiceUrl;

    return (
        <tr className="relative" onClick={() => console.log(payment)}>
            <td className="fixed-left">{payment.approvedAt ? yyyy_mm_dd_hh_mm(payment.approvedAt) : '-'}</td>
            <td>-</td>
            <td>{response?.orderId || '-'}</td>
            <td>{payment.planName}</td>
            <td>{t_scordiPaymentStatus(payment.status)}</td>
            {/*<td>취소하기</td>*/}
            <td className="text-center">
                <LinkTo href={invoiceUrl} target="_blank" className="btn3 btn-xs">
                    보기
                </LinkTo>
            </td>
            <td>{payment.customerName || '-'}</td>
            <td>{payment.customerEmail || '-'}</td>
            <td>{payment.customerPhone || '-'}</td>
            <td className="text-right">
                <span className="font-bold">{payment.price.toLocaleString()}</span>
            </td>
            {/*<td>취소액</td>*/}
            <td>
                <Tippy content={response?.fullCardNumber}>
                    <div>
                        {response?.method || '-'} / {card?.number.slice(-4) || '-'}
                    </div>
                </Tippy>
            </td>
            <td>{company?.displayName || '-'}</td>
            <td>{card?.approveNo || '-'}</td>
            {/*<td>취소자</td>*/}
        </tr>
    );
});
DPayPaymentTableRow.displayName = 'DPayPaymentTableRow';
