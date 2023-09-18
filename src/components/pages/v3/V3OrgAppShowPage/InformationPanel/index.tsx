import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useCurrentApp} from '^v3/V3OrgAppShowPage/atom';
import {PrototypeAvatar} from '^components/pages/LandingPages/TastingPage/TastingItemDetailModal/PrototypeAvatar';
import {useBillingHistoriesV3} from '^hooks/useBillingHistories';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {BillingHistoryManager} from '^models/BillingHistory';
import {PriceHeader} from '^v3/V3OrgAppShowPage/InformationPanel/PriceHeader';
import {MobileInfoList} from '^v3/share/MobileInfoList';
import {MobileInfoListItem} from '^v3/share/MobileInfoList/Item';
import {monthAfter, yearAfter, yyyy_mm_dd, yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {billingTypeToCycleTerm, InvoiceAppDto} from '^types/invoiceApp.type';
import {BillingCycleTerm} from '^types/subscriptionBillingCycle.type';
import {SubscriptionDto} from '^types/subscription.type';
import {BillingHistoryDto} from '^types/billing.type';
import {Currency, MoneyDto} from '^types/money.type';

// 정기결제금액 *
// 결제주기 *
// TODO: 0. 무료플랜 여부
// TODO: 0. 카테고리
export const InformationPanel = memo(() => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const {currentApp, isLoading, getBillingType, appType} = useCurrentApp();
    const {result} = useBillingHistoriesV3();

    const billingType = getBillingType(true);
    const BillingHistory = BillingHistoryManager.init(result.items).validateToListing();
    const latestIssue = BillingHistory.paymentOnly().latestIssue();
    const totalPrice = latestIssue.getTotalPrice(displayCurrency);
    const lastPaidHistory = BillingHistory.lastPaidHistory();

    // TODO: paidAt 에 문제가 있음. (1) 시간이 안나옴. (2) issuedAt 과 날짜가 다름(시간잘리는과정에서 생긴문제일듯). (3) issuedAt 보다 신뢰도가 떨어짐.
    const lastPaidAt = lastPaidHistory ? new Date(lastPaidHistory.issuedAt) : null;
    const nextPay =
        appType === 'Subscription'
            ? getNextPayDateForSubscription(currentApp as SubscriptionDto, lastPaidAt, lastPaidHistory)
            : getNextPayDateForInvoiceApp(currentApp as InvoiceAppDto, lastPaidAt, lastPaidHistory);

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <div className="w-full h-[40px]" />
                {isLoading ? (
                    <p className="text-center">loading ...</p>
                ) : (
                    <div>
                        {currentApp && <PrototypeAvatar proto={currentApp.product} />}
                        <PriceHeader totalPrice={totalPrice} billingType={billingType} />

                        <MobileInfoList>
                            {/*<MobileInfoListItem label="카테고리" />*/}
                            {appType === 'Subscription' && <MobileInfoListItem label="현재 플랜" />}
                            <MobileInfoListItem label="결제수단" value={lastPaidHistory?.paymentMethod} />
                            <MobileInfoListItem
                                label="해외결제금액"
                                value={
                                    <span>
                                        {lastPaidHistory?.payAmount?.text}{' '}
                                        <span className="text-gray-500">({lastPaidHistory?.payAmount?.code})</span>
                                    </span>
                                }
                            />

                            {lastPaidAt && (
                                <MobileInfoListItem label="마지막 결제일" value={yyyy_mm_dd_hh_mm(lastPaidAt)} />
                            )}
                            <MobileInfoListItem
                                label="다음 결제 예정일"
                                value={nextPay.nextPayDate ? yyyy_mm_dd(nextPay.nextPayDate) : '-'}
                            />
                            <MobileInfoListItem
                                label="결제 예정 금액"
                                value={
                                    <span>
                                        {nextPay.payAmount?.text}{' '}
                                        <span className="text-gray-500">({nextPay.payAmount?.code})</span>
                                    </span>
                                }
                            />
                        </MobileInfoList>
                    </div>
                )}
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});

function getNextPayDateForInvoiceApp(item: InvoiceAppDto, lastPaidAt: Date | null, latestHistory: BillingHistoryDto) {
    if (!lastPaidAt)
        return {
            nextPayDate: null,
            payAmount: {
                text: ``, // 금액 관련 원본 텍스트
                format: '%u%n', // 원본 문자열 형식
                amount: 0, // 금액
                code: Currency.USD, // 화폐 코드
                symbol: '$', // 화폐 기호
                exchangeRate: 1, // 달러 환율
            },
        };

    const cycleTerm = billingTypeToCycleTerm((item as InvoiceAppDto).billingType);

    const nextPayDate = (() => {
        if (cycleTerm === BillingCycleTerm.yearly) return yearAfter(1, lastPaidAt);
        if (cycleTerm === BillingCycleTerm.monthly) return monthAfter(1, lastPaidAt);
        return null;
    })();

    return {nextPayDate, payAmount: latestHistory.payAmount};
}

function getNextPayDateForSubscription(
    item: SubscriptionDto,
    lastPaidAt: Date | null,
    latestHistory: BillingHistoryDto,
) {
    const nextPayDate = item.nextBillingDate ? new Date(item.nextBillingDate) : null;
    const payAmount = ((): MoneyDto => {
        const lastAmount = latestHistory.payAmount;
        const amount = item.nextBillingAmount;
        if (lastAmount) {
            if (lastAmount.amount === item.nextBillingAmount) return lastAmount;
            const text = lastAmount.format.replace('%n', `${item.nextBillingAmount}`).replace('%u', lastAmount?.symbol);
            return {...lastAmount, amount, text};
        } else {
            return {
                text: `$${amount.toFixed(2)}`, // 금액 관련 원본 텍스트
                format: '%u%n', // 원본 문자열 형식
                amount, // 금액
                code: Currency.USD, // 화폐 코드
                symbol: '$', // 화폐 기호
                exchangeRate: 1, // 달러 환율
            };
        }
    })();

    return {nextPayDate, payAmount};
}
