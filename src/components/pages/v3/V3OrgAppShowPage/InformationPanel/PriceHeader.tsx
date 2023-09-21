import React, {memo} from 'react';
import {Currency} from '^types/crawler';
import {t_BillingType} from '^types/invoiceApp.type';
import {t_BillingCycleTerm} from '^types/subscriptionBillingCycle.type';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {currencyFormat, getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';

interface PriceHeaderProps {
    totalPrice: {amount: number; currency: Currency};
    billingType: ReturnType<typeof t_BillingType> | ReturnType<typeof t_BillingCycleTerm> | '?' | '';
}

export const PriceHeader = memo((props: PriceHeaderProps) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const {totalPrice, billingType} = props;

    return (
        <div>
            <p className="text-3xl font-bold mb-12">
                <small className="mr-1">{getCurrencySymbol(totalPrice.currency)}</small>
                <span>{currencyFormat(totalPrice.amount || 0, displayCurrency)}</span>

                <span className="ml-2 text-lg font-normal text-gray-500">/ {billingType}</span>
            </p>
        </div>
    );
});
