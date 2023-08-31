import {SubscriptionDto} from '^types/subscription.type';
import {OrganizationDto} from '^types/organization.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {GmailItem} from '^api/tasting.api';
import {BillingType, InvoiceAppDto} from '^types/invoiceApp.type';
import {changePriceCurrency} from '^api/tasting.api/gmail/agent/parse-email-price';
import {Currency} from '^types/crawler';
import {CreateMoneyRequestDto, MoneyDto} from '^types/money.type';

// 쿼리가 가능한 엔티티. (dto 와 entity 의 형태 차이가 좀 있음)
export class BillingSchedule {
    organizationId!: number;
    applicationId!: number;
    prototypeId!: number;
    paymentPlanId!: number;
    billingCycleId!: number;
    isSuccess!: boolean;
    isOverdue!: boolean;
    billingDate!: string;
    billingAmount!: number;
    isFreeTier!: boolean;
    isPerUser!: boolean;
    unitPrice!: number;
    paidMemberCount!: number;
}

export type BillingScheduleShallowDto = {
    organizationId: number;
    applicationId: number;
    prototypeId: number;
    paymentPlanId: number;
    billingCycleId: number;
    orgName: string;
    serviceName: string;
    planName: string;
    cycleName: string;
    isSuccess: boolean;
    isOverdue: boolean;
    billingDate: string;
    billingAmount: number;
    isFreeTier: boolean;
    isPerUser: boolean;
    unitPrice: number;
    paidMemberCount: number;
};

export type BillingHistoryDto = {
    id: number; // ID
    uid: string | null; // UID
    organizationId: number; // 조직 ID
    applicationId: number | null; // 구독정보 ID
    invoiceAppId: number | null; // 인보이스 앱 ID
    issuedAt: Date; // 인보이스 발행 일시
    lastRequestedAt: Date | null; // 최근 결제 요청 일시
    paidAt: Date | null; // 결제 완료 일시
    payAmount: MoneyDto | null; // 결제금액
    paymentMethod: string; // 결제수단
    // isSuccess: boolean; // 결제완료여부
    invoiceUrl?: string | null; // 인보이스(파일) 주소
    createdAt: string; // 생성일시
    updatedAt: string; // 수정일시
    organization?: OrganizationDto; // 조직
    application?: SubscriptionDto; // 구독정보
    invoiceApp?: InvoiceAppDto; // 인보이스 앱
    emailContent: GmailItem | null; // email content
};

// This used on Front-end Only.
export enum BillingHistoryStatus {
    Unknown = 'Unknown', // 구분되지 않음.
    Info = 'Info', // 정보성
    Warning = 'Warning', // 결고성
    PayWait = 'PayWait', // 결제 대기
    PaySuccess = 'PaySuccess', // 결제 완료
    PayFail = 'PayFail', // 결제 실패
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
export function getBillingHistoryStatus(billingHistory: BillingHistoryDto) {
    // const billingInfo = billingHistory.emailContent?.billingInfo;

    const {issuedAt, lastRequestedAt, paidAt} = billingHistory;

    if (paidAt) return BillingHistoryStatus.PaySuccess;
    if (lastRequestedAt && !paidAt) return BillingHistoryStatus.PayFail;
    if (issuedAt && !lastRequestedAt) return BillingHistoryStatus.Info;

    // 위에서 분류되지 못한 케이스는 Unknown 으로 처리.
    return BillingHistoryStatus.Unknown;
}

export function getBillingHistoryPaidPrice(billingHistory: BillingHistoryDto) {
    const payAmount = billingHistory.payAmount;
    if (!payAmount) return '-';
    const {symbol, format, amount} = payAmount;
    return format.replace('%n', `${amount.toLocaleString()}`).replace('%u', symbol);
}

export function getInvoiceAppBillingCycle(subscription?: SubscriptionDto, invoiceApp?: InvoiceAppDto): string {
    if (!subscription && !invoiceApp) return '-';
    if (invoiceApp?.billingType === BillingType.UNDEF) return '-';
    if (invoiceApp) return invoiceApp?.billingType || '-';
    if (subscription) return subscription?.paymentPlan?.name || '-';
    return '-';
}

export function getTotalPriceOfEmails(histories: BillingHistoryDto[], displayCurrency = Currency.KRW) {
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

export class CreateBillingHistoryRequestDto {
    paidAt!: Date; // 결제일시
    payAmount!: CreateMoneyRequestDto; // 결제금액
    invoiceUrl?: string | null; // 인보이스(파일) 주소
}

interface Type<T = any> extends Function {
    new (...args: any[]): T;
}
// const PartialType = <T>(classRef: Type<T>): Partial<T> => classRef;
function PartialType<T>(classRef: Type<T>): Type<Partial<T>> {
    return classRef;
}
export class UpdateBillingHistoryRequestDto extends PartialType(CreateBillingHistoryRequestDto) {
    // @ts-ignore
    paidAt: string | undefined; // datetime string
}

export class CreateBillingHistoryStandAloneRequestDto {
    billingCycleId!: number; // 결제주기 ID
    paidAt!: Date; // 결제일시
    payAmount!: CreateMoneyRequestDto; // 결제금액
    // isSuccess!: boolean; // 결제완료여부
    // invoiceUrl?: string | null; // 인보이스(파일) 주소
}

export type StartEndParams = {
    startDate?: string;
    endDate?: string;
};

export enum StatusQueryOptions {
    Success = 'success',
    Pending = 'pending',
    Failed = 'failed',
}

export type StatusParams = {
    status?: StatusQueryOptions;
};

export type GetBillingSchedulesParams = FindAllQueryDto<BillingSchedule> & StartEndParams;
export type GetBillingHistoriesParams = FindAllQueryDto<BillingHistoryDto> & StartEndParams & StatusParams;
