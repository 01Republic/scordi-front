import React, {memo} from 'react';
import {ScordiPaymentDto, ScordiPaymentStatus, t_scordiPaymentStatus} from '^models/_scordi/ScordiPayment/type';
import {CurrencyCode} from '^models/Money';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {LinkTo} from '^components/util/LinkTo';
import Tippy from '@tippyjs/react';
import {dPayScordiPaymentsApi} from '^models/_scordi/ScordiPayment/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';

interface DPayPaymentTableRowProps {
    payment: ScordiPaymentDto;
    secretCode: string;
    reload: () => Promise<any>;
}

export const DPayPaymentTableRow = memo((props: DPayPaymentTableRowProps) => {
    const {payment, secretCode, reload} = props;

    const response = payment.response;
    const card = response?.card;
    const company = response?.cardIssuerCompany;

    const currency = payment.currencyInfo;
    const currencyExchange = currency?.code || CurrencyCode.KRW;
    const currencySymbol = currency?.symbol || '₩';

    const invoiceUrl = payment.invoiceUrl;

    const cancelPayment = () => {
        return confirmed(confirm2('이 결제를 취소할까요?'))
            .then(() => dPayScordiPaymentsApi.cancel(payment.id, secretCode))
            .then(() => toast.success('취소되었어요.'))
            .then(() => reload())
            .catch(errorToast);
    };

    return (
        <tr className="relative" onClick={() => console.log(payment)}>
            <td className="fixed-left">{payment.approvedAt ? yyyy_mm_dd_hh_mm(payment.approvedAt) : '-'}</td>
            <td>{payment.canceledAt ? yyyy_mm_dd_hh_mm(payment.canceledAt) : '-'}</td>
            <td>{response?.orderId || '-'}</td>
            <td>{payment.planName}</td>
            <td className={payment.canceledAt ? '!text-red-500 !font-semibold' : ''}>
                {t_scordiPaymentStatus(payment.status)}
            </td>
            <td className="text-center">
                {!payment.canceledAt && (
                    <LinkTo
                        className="btn3 btn-xs !border-red-300 !hover:border-red-500 !text-red-500 !bg-red-50 !hover:bg-red-200 transition-all"
                        onClick={() => cancelPayment()}
                    >
                        취소
                    </LinkTo>
                )}
            </td>
            <td className="text-center">
                <LinkTo href={invoiceUrl} target="_blank" className="btn3 btn-xs">
                    보기
                </LinkTo>
            </td>
            <td>{payment.customerName || '-'}</td>
            <td>{payment.customerEmail || '-'}</td>
            <td>{payment.customerPhone || '-'}</td>
            <td>
                <div className="flex flex-col items-end justify-center gap-[1px]">
                    {payment.canceledAt && (
                        <span className="text-10 line-through text-red-500 leading-none">
                            {payment.price.toLocaleString()}
                        </span>
                    )}
                    <span className="font-bold leading-none">{payment.remainAmount.toLocaleString()}</span>
                </div>
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
