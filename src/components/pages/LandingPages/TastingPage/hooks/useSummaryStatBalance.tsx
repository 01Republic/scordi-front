import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {CountUp} from 'countup.js';
import {changePriceCurrency, Price} from '^api/tasting.api/gmail/agent/parse-email-price';
import {Currency} from '^types/crawler';
import {displayCurrencyAtom} from '../pageAtoms';
import {useDraftResult} from './useDraft';
import {BillingHistoryDto} from '^models/BillingHistory/type';

export const getTotalBalance = (histories: BillingHistoryDto[], displayCurrency: Currency) => {
    let amount = 0;
    histories.forEach((history) => {
        const item = history.emailContent;
        const price = history.payAmount;
        if (!item || !price || isNaN(price.amount)) return;

        amount += changePriceCurrency(price.amount, price.code, displayCurrency);
    });
    return amount;
};

export const useSummaryStatBalance = (counterElemId: string) => {
    const {billingHistories} = useDraftResult();
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const [totalPrice, setTotalPrice] = useState<Pick<Price, 'amount' | 'currency'>>({
        amount: 0,
        currency: Currency.KRW,
    });

    useEffect(() => {
        if (billingHistories.length === 0) return;
        const amount = getTotalBalance(billingHistories, displayCurrency);
        setTotalPrice({amount, currency: displayCurrency});
    }, [billingHistories, displayCurrency]);

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
