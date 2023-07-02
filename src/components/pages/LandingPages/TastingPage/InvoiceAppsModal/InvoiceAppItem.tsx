import React, {memo} from 'react';
import {InvoiceAppDto} from '^types/invoiceApp.type';
import {Avatar} from '^components/Avatar';
import {getTotalPriceOfEmails} from '^types/billing.type';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '../pageAtoms';
import {currencyFormat, getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';

interface InvoiceAppItemProps {
    invoiceApp: InvoiceAppDto;
}

export const InvoiceAppItem = memo((props: InvoiceAppItemProps) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const {invoiceApp} = props;
    const {prototype: proto, billingHistories} = invoiceApp;
    const {totalPrice} = getTotalPriceOfEmails(invoiceApp.billingHistories, displayCurrency);

    return (
        <li>
            <div className="grid grid-cols-5 py-3 w-full">
                <div className="col-span-3 flex items-center gap-4">
                    <Avatar src={proto.image} className="w-9 h-9" />
                    <div>
                        <p className="text-xs text-gray-500">{proto.name}</p>
                        <p className="text-[16px]">
                            <small className="mr-0.5">{getCurrencySymbol(totalPrice.currency)}</small>
                            <span className="font-semibold">
                                {currencyFormat(totalPrice.amount || 0, displayCurrency)}
                            </span>
                        </p>
                    </div>
                </div>
                <div className="col-span-2"></div>
            </div>
        </li>
    );
});
