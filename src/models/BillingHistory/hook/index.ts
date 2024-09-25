import {RecoilState, useRecoilState, useRecoilValue} from 'recoil';
import {makePaginatedListHookWithAtoms} from '^hooks/util/makePaginatedListHook';
import {SubscriptionDto} from '^models/Subscription/types';
import {BillingType, InvoiceAppDto} from '^models/InvoiceApp/type';
import {CurrencyCode} from '^models/Money';
import {changePriceCurrencyV2} from '^api/tasting.api/gmail/agent/parse-email-price';
import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {useAlert} from '^hooks/useAlert';
import {useToast} from '^hooks/useToast';
import {
    BillingHistoryDto,
    BillingHistoryStatus,
    FindAllBillingHistoriesQueryDto,
    GetBillingHistoriesParams,
    UpdateBillingHistoryRequestDto,
} from '../type';
import {billingHistoryApi} from '../api';
import {
    billingHistoriesAtom,
    billingHistoryListInSiblingsAtom,
    billingHistoryListOfCreditCardAtom,
    billingHistoryListOfSubscriptionAtom,
    billingHistoryLoadingState,
    getBillingHistoryQuery,
} from '../atom';

export const useBillingHistoriesV3 = () => useBillingHistories(billingHistoriesAtom);
export const useBillingHistory = () => useRecoilValue(getBillingHistoryQuery);

// 구독 상세모달 / 결제내역
export const useBillingHistoryListOfSubscription = () => useBillingHistories(billingHistoryListOfSubscriptionAtom);

// 결제내역 상세모달 / 결제내역
export const useBillingHistoryListInSiblings = () => useBillingHistories(billingHistoryListInSiblingsAtom);

// 결제수단 상세페이지 / 결제내역
export const useBillingHistoryListOfCreditCard = () => useBillingHistoriesOfOrg(billingHistoryListOfCreditCardAtom);

// [deprecated] useBillingHistoriesOfOrg 로 대체될 예정
const useBillingHistories = (
    atoms: PagedResourceAtoms<BillingHistoryDto, GetBillingHistoriesParams>,
    mergeMode = false,
) => {
    return usePagedResource(atoms, {
        endpoint: (params) => billingHistoryApi.index(params),
        useOrgId: false,
        mergeMode,
        getId: 'id',
    });
};

const useBillingHistoriesOfOrg = (
    atoms: PagedResourceAtoms<BillingHistoryDto, FindAllBillingHistoriesQueryDto>,
    mergeMode = false,
) => {
    return usePagedResource(atoms, {
        endpoint: (params, orgId) => billingHistoryApi.indexOfOrg(orgId, params),
        useOrgId: true,
        mergeMode,
        getId: 'id',
    });
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
            return changePriceCurrencyV2(price, displayCurrency);
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

export function useBillingHistoryV2(atom: RecoilState<BillingHistoryDto | null>) {
    const [billingHistory, setBillingHistory] = useRecoilState(atom);
    const [isLoading, setIsLoading] = useRecoilState(billingHistoryLoadingState);
    const {alert} = useAlert();
    const {toast} = useToast();

    const loadBillingHistory = (id: number) => {
        setIsLoading(true);
        const request = billingHistoryApi.show(id);
        request.then((res) => setBillingHistory(res.data));
        request.finally(() => setIsLoading(false));
    };

    const updateBillingHistory = async (data: UpdateBillingHistoryRequestDto) => {
        if (!billingHistory) {
            toast.error('알 수 없는 결제내역');
            return;
        }

        const {id} = billingHistory;

        setIsLoading(true);
        const res = billingHistoryApi.update(id, data);
        res.then(() => toast.success('변경되었습니다.')).then(() => loadBillingHistory(id));
        res.finally(() => setIsLoading(false));
        return res;
    };

    const deleteBillingHistory = async (onConfirm?: () => void) => {
        if (!billingHistory) {
            toast.error('알 수 없는 결제내역');
            return;
        }

        const {id} = billingHistory;

        return alert.destroy({
            title: '결제내역을 정말 삭제할까요?',
            showSuccessAlertOnFinal: false,
            onConfirm: async () => {
                setIsLoading(true);
                const res = billingHistoryApi.destroy(id);

                res.then(() => toast.success('삭제했습니다.')).then(() => {
                    onConfirm && onConfirm();
                    setBillingHistory(null);
                });
                res.finally(() => setIsLoading(false));
                return res;
            },
        });
    };

    return {billingHistory, loadBillingHistory, updateBillingHistory, deleteBillingHistory, isLoading};
}
