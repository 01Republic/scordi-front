import {BillingHistoryDto, BillingHistoryStatus} from '^types/billing.type';
import React, {memo} from 'react';
import {BsInfoCircle} from 'react-icons/bs';
import {MoneyDto} from '^types/money.type';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {changePriceCurrency, currencyFormat, getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {BiError} from 'react-icons/bi';

interface PriceTextProps {
    billingHistory: BillingHistoryDto;
    status: BillingHistoryStatus;
}

export const PriceText = memo((props: PriceTextProps) => {
    const {billingHistory, status} = props;
    const {payAmount, emailContent} = billingHistory;

    switch (status) {
        case BillingHistoryStatus.PaySuccess:
            return <PriceTextSuccess payAmount={payAmount!} />; // PaySuccess 조건에서는 payAmount 가 반드시 존재함
        case BillingHistoryStatus.PayFail:
            return <PriceTextFail payAmount={payAmount!} />; // PayFail 조건에서는 payAmount 가 반드시 존재함
        case BillingHistoryStatus.Info:
            return <PriceTextInfo payAmount={payAmount} />;
        case BillingHistoryStatus.Unknown:
        default:
            return <PriceTextUnknown />;
    }
});

interface BillingListPriceTextProps {
    amount?: MoneyDto | null;
    status: BillingHistoryStatus;
}
export const BillingListPriceText = memo((props: BillingListPriceTextProps) => {
    const {amount, status} = props;

    switch (status) {
        case BillingHistoryStatus.PaySuccess:
            return <PriceTextSuccess payAmount={amount!} />; // PaySuccess 조건에서는 payAmount 가 반드시 존재함
        case BillingHistoryStatus.PayFail:
            return <PriceTextFail payAmount={amount!} />; // PayFail 조건에서는 payAmount 가 반드시 존재함
        case BillingHistoryStatus.Info:
            return <PriceTextInfo payAmount={amount || null} />;
        case BillingHistoryStatus.Unknown:
        default:
            return <PriceTextUnknown />;
    }
});

const PriceTextUnknown = memo(() => {
    return <span className="text-gray-500">-</span>;
});

const PriceTextInfo = memo(({payAmount}: {payAmount: MoneyDto | null}) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    return (
        <div className="flex items-end gap-2">
            <span className="text-scordi-light relative -top-[4px]">
                <BsInfoCircle />
            </span>
            {payAmount && (
                <div className="text-gray-300">
                    <small className="mr-1">{getCurrencySymbol(displayCurrency)}</small>
                    <span>
                        {currencyFormat(
                            changePriceCurrency(payAmount.amount, payAmount.code, displayCurrency) || 0,
                            displayCurrency,
                        )}
                    </span>
                </div>
            )}
        </div>
    );
});

const PriceTextSuccess = memo(({payAmount}: {payAmount: MoneyDto}) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    return (
        <>
            <small className="mr-1">{getCurrencySymbol(displayCurrency)}</small>
            <span>
                {currencyFormat(
                    changePriceCurrency(payAmount.amount, payAmount.code, displayCurrency) || 0,
                    displayCurrency,
                )}
            </span>
        </>
    );
});

const PriceTextFail = memo(({payAmount}: {payAmount: MoneyDto}) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    return (
        <div className="flex items-end gap-2">
            <span className="text-error relative -top-[4px]">
                <BiError />
            </span>
            <div className="text-gray-300">
                <small className="mr-1">{getCurrencySymbol(displayCurrency)}</small>
                <span>
                    {currencyFormat(
                        changePriceCurrency(payAmount.amount, payAmount.code, displayCurrency) || 0,
                        displayCurrency,
                    )}
                </span>
            </div>
        </div>
    );
});
