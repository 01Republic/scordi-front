import React, {memo} from 'react';
import {MoneyDto} from '^models/Money';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {BillingHistoryDto, BillingHistoryStatus} from '^models/BillingHistory/type';
import {AlertCircle, Info} from 'lucide-react';

interface PriceTextProps {
    billingHistory: BillingHistoryDto;
    status: BillingHistoryStatus;
}

export const PriceText = memo((props: PriceTextProps) => {
    const {billingHistory, status} = props;
    const {payAmount, emailContent} = billingHistory;

    if (!payAmount) return <PriceTextUnknown />;

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
                <Info />
            </span>
            {payAmount && (
                <div className="text-gray-300">
                    <small className="mr-1">{getCurrencySymbol(displayCurrency)}</small>
                    <span>{payAmount.toDisplayPrice(displayCurrency).toLocaleString()}</span>
                </div>
            )}
        </div>
    );
});

const PriceTextSuccess = memo(({payAmount}: {payAmount: MoneyDto}) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);

    return (
        <>
            {payAmount ? (
                <>
                    <small className="mr-1">{getCurrencySymbol(displayCurrency)}</small>
                    <span>{payAmount.toDisplayPrice(displayCurrency).toLocaleString()}</span>
                </>
            ) : (
                <span className="text-gray-500 text-sm">관리자에게 문의하세요</span>
            )}
        </>
    );
});

const PriceTextFail = memo(({payAmount}: {payAmount: MoneyDto}) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    return (
        <div className="flex items-end gap-2">
            <span className="text-error relative -top-[4px]">
                <AlertCircle />
            </span>
            <div className="text-gray-300">
                <small className="mr-1">{getCurrencySymbol(displayCurrency)}</small>
                <span>{payAmount.toDisplayPrice(displayCurrency).toLocaleString()}</span>
            </div>
        </div>
    );
});
