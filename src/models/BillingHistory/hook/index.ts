import {useState} from 'react';
import {RecoilState, useRecoilState, useRecoilValue} from 'recoil';
import {Paginated} from '^types/utils/paginated.dto';
import {
    getBillingHistoriesQuery,
    getBillingHistoryQuery,
    orgBillingHistoriesQueryV3Atom,
    orgBillingHistoriesResultV3Atom,
} from '^models/BillingHistory/atom';
import {makePaginatedListHookWithAtoms} from '^hooks/util/makePaginatedListHook';
import {billingHistoryApi} from '^models/BillingHistory/api';
import {BillingHistoryDto, BillingHistoryStatus, GetBillingHistoriesParams} from '^models/BillingHistory/type';
import {SubscriptionDto} from '^models/Subscription/types';
import {BillingType, InvoiceAppDto} from '^models/InvoiceApp/type';
import {CurrencyCode} from '^types/money.type';
import {changePriceCurrency} from '^api/tasting.api/gmail/agent/parse-email-price';

export const useBillingHistories = () => useRecoilValue(getBillingHistoriesQuery);
export const useBillingHistory = () => useRecoilValue(getBillingHistoryQuery);

interface UseBillingHistoriesOption {
    resultAtom: RecoilState<Paginated<BillingHistoryDto>>;
    queryAtom: RecoilState<GetBillingHistoriesParams>;
}

export const useBillingHistoriesV3 = (option?: UseBillingHistoriesOption) => {
    const {resultAtom, queryAtom} = option || {};
    const [result, setResult] = useRecoilState(resultAtom || orgBillingHistoriesResultV3Atom);
    const [query, setQuery] = useRecoilState(queryAtom || orgBillingHistoriesQueryV3Atom);
    const [isLoading, setIsLoading] = useState(false);

    async function search(params: GetBillingHistoriesParams) {
        if (JSON.stringify(query) === JSON.stringify(params)) return;

        setIsLoading(true);
        const data = await billingHistoryApi.index(params).then((res) => res.data);
        setResult(data);
        setQuery(params);
        setIsLoading(false);
    }

    const reload = () => search(query);
    const movePage = (page: number) => search({...query, page});

    return {query, reload, result, search, movePage, isLoading};
};

// This is real !! (deprecated)
export const {paginatedListHook: useBillingHistoryList} = makePaginatedListHookWithAtoms<number, BillingHistoryDto>({
    subject: 'billingHistoryList',
    buildParams: (subscriptionId, page, pagination) => ({
        where: {subscriptionId},
        order: {id: 'DESC'},
        page,
        itemsPerPage: pagination.itemsPerPage,
    }),
    request: (_, params) => billingHistoryApi.index(params),
});

export function getBillingHistoryStatus(billingHistory: BillingHistoryDto) {
    // const billingInfo = billingHistory.emailContent?.billingInfo;

    const {issuedAt, lastRequestedAt, paidAt} = billingHistory;

    if (paidAt) return BillingHistoryStatus.PaySuccess;
    if (lastRequestedAt && !paidAt) return BillingHistoryStatus.PayFail;
    if (issuedAt && !lastRequestedAt) return BillingHistoryStatus.Info;

    // 위에서 분류되지 못한 케이스는 Unknown 으로 처리.
    return BillingHistoryStatus.Unknown;
}

/**
 * BillingHistory 로부터 결제금액 텍스트를 보여주기 위해,
 * 해당 결제내역이 어떤 "지불 유형" 인지 구분하는 정책을 정의합니다.
 *
 * 이메일 트래커 billingHistory.emailContent 내에서 상태구분
 * BillingInfo 에서 구분함.
 *  - 결제성공 : paidAt 이 있음.
 *  - 결제실패 : lastRequestedAt 이 있고 / paidAt 이 없음
 *  - 정보알림 : issuedAt 이 있고 / lastRequestedAt 이 없음
 */

export function getBillingHistoryPaidPrice(billingHistory: BillingHistoryDto) {
    const payAmount = billingHistory.payAmount;
    if (!payAmount) return '-';
    const {symbol, format, amount} = payAmount;
    return format.replace('%n', `${amount.toLocaleString()}`).replace('%u', symbol);
}

export function getInvoiceAppBillingCycle(subscription?: SubscriptionDto, invoiceApp?: InvoiceAppDto): string {
    if (!subscription && !invoiceApp) return '-';
    if (invoiceApp?.billingType === BillingType.undefined) return '-';
    if (invoiceApp) return invoiceApp?.billingType || '-';
    if (subscription) return subscription?.paymentPlan?.name || '-';
    return '-';
}

export function getTotalPriceOfEmails(histories: BillingHistoryDto[], displayCurrency = CurrencyCode.KRW) {
    // Email 로부터 생성된 결제히스토리만 걸러냅니다.
    const historyListFromEmail = histories.filter((his) => {
        const email = his.emailContent;
        const isHide = !email?.billingInfo?.payAmount;
        return email && !isHide;
    });

    // 합계 금액을 계산합니다.
    const amount = historyListFromEmail

        // Email 의 가격부분 추리기
        .map((his) => {
            const price = his.payAmount!;
            return changePriceCurrency(price.amount, price.code, displayCurrency);
        })

        // 합계 계산
        .reduce((acc, a) => acc + a, 0);

    return {
        totalPrice: {amount, currency: displayCurrency},
    };
}

export const t_paidAt = (dto: BillingHistoryDto) => {
    if (!dto.paidAt) return null;
    return new Date(dto.paidAt).toLocaleString();
};
