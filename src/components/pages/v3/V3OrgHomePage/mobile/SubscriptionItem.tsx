import React, {memo} from 'react';
import {SubscriptionDto} from '^types/subscription.type';
import {InvoiceAppDto} from '^types/invoiceApp.type';
import {Avatar} from '^components/Avatar';
import {currencyFormat, getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {getTotalPriceOfEmails} from '^types/billing.type';
import {dateSortBy} from '^components/util/date';

interface SubscriptionItemProps {
    item: SubscriptionDto | InvoiceAppDto;
}

export const SubscriptionItem = memo((props: SubscriptionItemProps) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const {item} = props;
    const {product: product, billingHistories = []} = item;

    const [lastHistory] = billingHistories.sort(dateSortBy('DESC', (his) => his.issuedAt));
    const {totalPrice} = getTotalPriceOfEmails(billingHistories, displayCurrency);

    return (
        <div className="flex items-center gap-4 px-3 py-2.5 -mx-3 bg-base-100 text-gray-700 cursor-pointer hover:bg-neutral">
            <Avatar src={product.image} className="w-8 h-8 outline outline-offset-1 outline-slate-100" />
            <div className="flex-1">
                <p className="text-xs text-gray-500">{product.nameEn}</p>
                <p className="text-[16px]">
                    <small className="mr-0.5">{getCurrencySymbol(totalPrice.currency)}</small>
                    <span className="font-semibold">{currencyFormat(totalPrice.amount || 0, displayCurrency)}</span>
                </p>
            </div>
            <div></div>
        </div>
    );
});
