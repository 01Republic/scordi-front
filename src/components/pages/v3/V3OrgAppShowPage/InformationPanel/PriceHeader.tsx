import React, {memo} from 'react';
import {t_BillingType} from '^types/invoiceApp.type';
import {t_BillingCycleTerm} from '^types/subscriptionBillingCycle.type';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {currencyFormat, getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';

interface PriceHeaderProps {
    totalPrice: number;
    billingType: ReturnType<typeof t_BillingType> | ReturnType<typeof t_BillingCycleTerm> | '?' | '';
}

export const PriceHeader = memo((props: PriceHeaderProps) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const symbol = getCurrencySymbol(displayCurrency);
    const {totalPrice, billingType} = props;

    return (
        <p className="text-3xl font-bold mb-12">
            <small className="mr-1">{symbol}</small>
            <span>{currencyFormat(totalPrice, displayCurrency)}</span>

            <span className="ml-2 text-lg font-normal text-gray-500">/ {billingType}</span>
        </p>
    );
});
PriceHeader.displayName = 'PriceHeader';
