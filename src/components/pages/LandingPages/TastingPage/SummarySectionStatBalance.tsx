import React, {memo, useEffect, useState} from 'react';
import {changePriceCurrency, getCurrencySymbol, Price} from '^api/tasting.api/gmail/agent/parse-email-price';
import {useRecoilState, useRecoilValue} from 'recoil';
import {displayCurrencyAtom, gmailItemsAtom, gmailItemsLoadedAtom} from './pageAtoms';
import {CountUp} from 'countup.js';
import {Currency} from '^types/crawler';
import {useTranslation} from 'next-i18next';

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

export const SummarySectionStatBalance = memo(() => {
    const isLoaded = useRecoilValue(gmailItemsLoadedAtom);
    const {t} = useTranslation('publicTasting');
    const {totalPrice} = useSummaryStatBalance('total-balance');

    return (
        <div className="stats bg-[#fafafa] shadow-xl md:w-[20%]">
            <div className="stat place-items-center py-7">
                <div className="stat-title !text-black !opacity-100 font-semibold mb-3">
                    {t('summary_stat.balance.label')}
                </div>
                <div
                    className={`stat-value !text-3xl ${
                        !isLoaded ? 'w-full bg-slate-300 rounded-full animate-pulse' : ''
                    }`}
                >
                    {isLoaded && <small className="mr-1">{getCurrencySymbol(totalPrice.currency)}</small>}
                    <span id="total-balance" className="!text-4xl" />
                    &nbsp;
                </div>
            </div>
        </div>
    );
});
