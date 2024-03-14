import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {currencyFormat, getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {SubscriptionDto} from '^models/Subscription/types';
import {MoneyDto} from '^models/Money';

interface PriceHeaderV2Props {
    subscription: SubscriptionDto;
}

export const PriceHeaderV2 = memo((props: PriceHeaderV2Props) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const symbol = getCurrencySymbol(displayCurrency);
    const {subscription} = props;

    const currentBillingAmount = subscription.currentBillingAmount || MoneyDto.dup({amount: 0});
    const billingAmount = currentBillingAmount.toDisplayPrice(displayCurrency);
    const billingCycleTypeText = subscription.getBillingCycleTypeText();

    return (
        <p className="text-3xl font-bold mb-12">
            <small className="mr-1">{symbol}</small>
            <span>{currencyFormat(billingAmount || 0, displayCurrency)}</span>

            <span className="ml-2 text-lg font-normal text-gray-500">/ {billingCycleTypeText}</span>
        </p>
    );
});
PriceHeaderV2.displayName = 'PriceHeaderV2';
