import React, {memo} from 'react';
import {changePriceCurrencyV2, currencyFormat, getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from './pageAtoms';
import {CurrencyCode, MoneyDto} from '^models/Money';
import {BillingHistoryDto, BillingHistoryStatus} from '^models/BillingHistory/type';
import {AlertCircle, Info} from 'lucide-react';

interface RowPriceTextProps {
    billingHistory: BillingHistoryDto;
    status: BillingHistoryStatus;
}

export const EmailParsedTableRowPriceText = memo((props: RowPriceTextProps) => {
    const {billingHistory, status} = props;
    const {payAmount, emailContent} = billingHistory;

    switch (status) {
        case BillingHistoryStatus.PaySuccess:
            return <PriceTextSuccess payAmount={payAmount!} />; // PaySuccess 조건에서는 payAmount 가 반드시 존재함
        case BillingHistoryStatus.PayFail:
            return <PriceTextFail payAmount={payAmount} />; // PayFail 조건에서는 payAmount 가 반드시 존재함
        case BillingHistoryStatus.Info:
            return <PriceTextInfo />;
        case BillingHistoryStatus.Unknown:
        default:
            return <PriceTextUnknown />;
    }
});

const PriceTextUnknown = memo(() => {
    return <span className="text-gray-500">-</span>;
});

const PriceTextInfo = memo(() => {
    return (
        <span className="text-scordi-light relative -top-[4px]">
            <Info />
        </span>
    );
});

const PriceTextSuccess = memo(({payAmount}: {payAmount?: MoneyDto}) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    return (
        <>
            <small className="mr-1">{getCurrencySymbol(displayCurrency)}</small>
            <span>
                {currencyFormat(
                    changePriceCurrencyV2(payAmount || ({} as MoneyDto), displayCurrency) || 0,
                    displayCurrency,
                )}
            </span>
        </>
    );
});

const PriceTextFail = memo(({payAmount}: {payAmount: MoneyDto | null}) => {
    // const displayCurrency = useRecoilValue(displayCurrencyAtom);

    return (
        <span className="text-error relative -top-[4px]">
            <AlertCircle />
        </span>
    );
    // return (
    //     <>
    //         <small className="mr-1">{getCurrencySymbol(displayCurrency)}</small>
    //         <span>
    //             {currencyFormat(
    //                 changePriceCurrency(payAmount.amount, payAmount.code, displayCurrency) || 0,
    //                 displayCurrency,
    //             )}
    //         </span>
    //     </>
    // );
});
