import {MoneyDto} from '^models/Money';
import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';

interface ItemPriceProps {
    price: MoneyDto | null;
}

export const HeadingPrice = memo((props: ItemPriceProps) => {
    const {price} = props;
    const displayCurrency = useRecoilValue(displayCurrencyAtom);

    const isHide = !price;
    const symbol = getCurrencySymbol(displayCurrency);
    const amount = !price ? 0 : price.toDisplayPrice(displayCurrency);

    return (
        <p className="text-3xl font-bold mb-12">
            {isHide ? (
                <span className="text-gray-500">-</span>
            ) : (
                <>
                    <small className="mr-1">{symbol}</small>
                    <span>{amount.toLocaleString()}</span>
                </>
            )}
        </p>
    );
});
