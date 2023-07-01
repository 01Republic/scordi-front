import React, {memo} from 'react';
import {
    changePriceCurrency,
    currencyFormat,
    getCurrencySymbol,
    Price,
} from '^api/tasting.api/gmail/agent/parse-email-price';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';

interface ItemPriceProps {
    price: Price;
}

export const HeadingPrice = memo((props: ItemPriceProps) => {
    const {price} = props;
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const symbol = getCurrencySymbol(displayCurrency);
    const amount = changePriceCurrency(price.amount, price.currency, displayCurrency);

    return (
        <p className="text-3xl font-bold mb-12">
            {price.hide ? (
                <span className="text-gray-500">-</span>
            ) : (
                <>
                    <small className="mr-1">{symbol}</small>
                    <span>{currencyFormat(amount || 0, displayCurrency)}</span>
                </>
            )}
        </p>
    );
});
