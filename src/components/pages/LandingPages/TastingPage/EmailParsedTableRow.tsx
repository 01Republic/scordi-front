import React, {memo} from 'react';
import {
    changePriceCurrencyV2,
    currencyFormat,
    getCurrencySymbol,
    Price,
} from '^api/tasting.api/gmail/agent/parse-email-price';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from './pageAtoms';
import {useTastingItemDetailModal} from './TastingItemDetailModal';
import {BillingInfo} from '^api/tasting.api';
import {BillingHistoryDto} from '^models/BillingHistory/type';

interface EmailParsedTableRowProps {
    date: Date;
    serviceName: string;
    title: string;
    attachments: {
        uid: string;
        fileName: string;
        url: string;
    }[];
    sender: string;
    price: Price;
}

export const EmailParsedTableRow = memo((props: {billingHistory: BillingHistoryDto}) => {
    // const {date, serviceName, title, attachments, sender, price} = props;
    const {billingHistory} = props;
    const {setModal} = useTastingItemDetailModal();
    const displayCurrency = useRecoilValue(displayCurrencyAtom);

    const date = billingHistory.issuedAt;
    const payAmount = billingHistory.payAmount;
    const item = billingHistory.emailContent!;
    const serviceName = item.provider;
    const title = item.title;
    const attachments = item.attachments || [];
    const sender = item.metadata.sender || item.metadata.from?.replace(/.*<(.+)>/, '$1');

    return (
        <tr onClick={() => setModal(billingHistory)}>
            <td>
                <p className="text-gray-700">{date.toLocaleString()}</p>
            </td>
            <td>
                <div className="flex items-center space-x-3">
                    {/*<div className="avatar">*/}
                    {/*    <div className="mask mask-squircle w-12 h-12">*/}
                    {/*        <img src="/tailwind-css-component-profile-5@56w.png" alt="Avatar Tailwind CSS Component" />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div>
                        <div className="font-bold capitalize">{serviceName}</div>
                        <div className="text-sm opacity-50">{sender}</div>
                    </div>
                </div>
            </td>
            <td>
                <p className="mb-1.5">{title}</p>
                <div className="flex space-x-1">
                    {attachments.map((attachment, i) => (
                        <span key={i} className="badge badge-ghost badge-sm">
                            {attachment.fileName}
                        </span>
                    ))}
                </div>
            </td>
            <td>
                <p className="text-right">
                    {!payAmount ? (
                        <span className="text-gray-500">-</span>
                    ) : (
                        <>
                            <small className="mr-1">{getCurrencySymbol(displayCurrency)}</small>
                            <span>
                                {currencyFormat(
                                    changePriceCurrencyV2(payAmount, displayCurrency) || 0,
                                    displayCurrency,
                                )}
                            </span>
                        </>
                    )}
                </p>
            </td>
            <th>{/*<button className="btn btn-ghost btn-xs">details</button>*/}</th>
        </tr>
    );
});
