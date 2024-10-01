import React, {memo} from 'react';
import {InvoiceAppDto} from '^models/InvoiceApp/type';
import {Avatar} from '^components/Avatar';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '../pageAtoms';
import {currencyFormat, getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {getTotalPriceOfEmails} from '^models/BillingHistory/hook';

interface InvoiceAppItemProps {
    invoiceApp: InvoiceAppDto;
}

export const InvoiceAppItem = memo((props: InvoiceAppItemProps) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const {invoiceApp} = props;
    const {product, billingHistories = []} = invoiceApp;
    const {totalPrice} = getTotalPriceOfEmails(billingHistories, displayCurrency);

    return (
        <li>
            <div className="grid grid-cols-6 py-3 px-3 -mx-3 rounded-box cursor-pointer hover:bg-neutral">
                <div className="col-span-4 flex items-center gap-4">
                    <Avatar src={product?.image} className="w-9 h-9 outline outline-offset-1 outline-slate-100" />
                    <div className="flex-1">
                        <p className="text-xs text-gray-500">{product?.nameEn}</p>
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
