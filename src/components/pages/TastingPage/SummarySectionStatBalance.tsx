import React, {memo, useEffect, useState} from 'react';
import {changePriceCurrency, Currency, getCurrencySymbol, Price} from '^api/tasting.api/gmail/agent/parse-email-price';
import {useRecoilState, useRecoilValue} from 'recoil';
import {displayCurrencyAtom, gmailItemsAtom, gmailItemsLoadedAtom} from './pageAtoms';
import {CountUp} from 'countup.js';

export const SummarySectionStatBalance = memo(() => {
    const gmailItems = useRecoilValue(gmailItemsAtom);
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const isLoaded = useRecoilValue(gmailItemsLoadedAtom);
    const [totalPrice, setTotalPrice] = useState<Pick<Price, 'amount' | 'currency'>>({
        amount: 0,
        currency: Currency.USD,
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
        // if (!totalPrice.amount) return;
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
        const countUp = new CountUp('total-balance', totalPrice.amount, option);
        setTimeout(() => countUp.start(), 0);
    }, [totalPrice]);

    return (
        <div className="stats shadow md:w-[20%]">
            <div className="stat place-items-center">
                <div className="stat-title">Total balance</div>
                <div className={`stat-value ${!isLoaded ? 'w-full bg-slate-300 rounded-full animate-pulse' : ''}`}>
                    {isLoaded && <small className="mr-1">{getCurrencySymbol(totalPrice.currency)}</small>}
                    <span id="total-balance" />
                    &nbsp;
                </div>
            </div>
        </div>
    );
});
