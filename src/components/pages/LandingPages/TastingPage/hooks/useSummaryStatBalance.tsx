import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {CountUp} from 'countup.js';
import {displayCurrencyAtom, gmailItemsAtom} from '../pageAtoms';
import {changePriceCurrency, Price} from '^api/tasting.api/gmail/agent/parse-email-price';
import {Currency} from '^types/crawler';

export const useSummaryStatBalance = (counterElemId: string) => {
    const gmailItems = useRecoilValue(gmailItemsAtom);
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const [totalPrice, setTotalPrice] = useState<Pick<Price, 'amount' | 'currency'>>({
        amount: 0,
        currency: Currency.KRW,
    });

    useEffect(() => {
        if (gmailItems.length === 0) return;
        // console.log({gmailItems});
        let amount = 0;
        gmailItems.forEach((item) => {
            const {price} = item;
            if (price.hide) return;
            if (isNaN(price.amount)) {
                console.log('priceAmount', price.amount);
                console.log('item', item);
            }
            amount += changePriceCurrency(price.amount, price.currency, displayCurrency);
        });
        setTotalPrice({amount, currency: displayCurrency});
    }, [gmailItems, displayCurrency]);

    useEffect(() => {
        if (!totalPrice?.amount) return;
        // const amount = currencyFormat(totalPrice.amount, totalPrice.currency);
        const option = {
            duration: 0.5,
            decimalPlaces: 0,
            separator: ',',
            decimal: '.',
        };
        if (totalPrice.currency === Currency.USD) {
            option.decimalPlaces = 2;
        }
        const countUp = new CountUp(counterElemId, totalPrice.amount, option);
        setTimeout(() => countUp.start(), 0);
    }, [totalPrice]);

    return {totalPrice};
};
