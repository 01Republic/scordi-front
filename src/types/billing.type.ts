import {SubscriptionDto} from '^types/subscription.type';
import {OrganizationDto} from '^types/organization.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {GmailParsedItem} from '^api/tasting.api';
import {BillingType, InvoiceAppDto} from '^types/invoiceApp.type';
import {changePriceCurrency} from '^api/tasting.api/gmail/agent/parse-email-price';
import {CurrencyDto} from '^types/crawler';
import {CreateMoneyRequestDto, CurrencyList, MoneyDto, Currency} from '^types/money.type';
import {TypeCast} from '^types/utils/class-transformer';
import {BillingCycleTerm} from '^types/subscriptionBillingCycle.type';
import {CreditCardDto} from '^models/CreditCard/credit-cards.type';

// 쿼리가 가능한 엔티티. (dto 와 entity 의 형태 차이가 좀 있음)
export class BillingScheduleDto {
    organizationId!: number;
    subscriptionId!: number;
    productId!: number;
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

export class BillingScheduleShallowDto {
    get sortKey() {
        return this.billingDate;
    }

    billingHistoryId: number; // 결제내역 ID
    organizationId: number; // 조직 ID
    subscriptionId: number; // 구독 ID
    orgName: string | null; // 조직명
    serviceName: string | null; // 서비스명

    @TypeCast(() => Date)
    lastIssuedAt: Date; // 마지막 청구서 발행일

    assumedBillingType: BillingType; // 추정 결제주기

    @TypeCast(() => Date)
    billingDate: Date; // 결제일

    @TypeCast(() => MoneyDto)
    payAmount: MoneyDto | null; // 결제금액
    // planName: string;
    // cycleName: string;
    // isSuccess: boolean;
    isOverdue: boolean; // 결제일 지남
    isDead: boolean; // 종료됨
    // billingAmount: number;
    // isFreeTier: boolean;
    // isPerUser: boolean;
    // unitPrice: number;
    // paidMemberCount: number;

    @TypeCast(() => SubscriptionDto)
    subscription: SubscriptionDto;

    // 결제가 안됐는데(결제기록이 존재하지 않음) 그대로 시간이 지나버린 건.
    // -> '지금까지 결제한 금액'으로 놓기에는 어색하여, '앞으로 결제될 금액'에서 보여짐.
    somethingWrong() {
        return !this.isDead && this.isOverdue;
    }

    mightBeWillPay() {
        return !this.isDead && !this.isOverdue;
    }

    get pageSubject() {
        const month = this.billingDate.getMonth() + 1;
        const day = this.billingDate.getDate();
        return `${month}월 ${day}일 예정분`;
    }

    getStatus() {
        if (!this.payAmount || this.payAmount.amount <= 0) return BillingHistoryStatus.Info;
        if (this.isOverdue && this.isDead) return BillingHistoryStatus.PaySuccess;
        if (this.isOverdue && !this.isDead) return BillingHistoryStatus.PayFail;
        if (!this.isOverdue && !this.isDead) return BillingHistoryStatus.Info;
        if (!this.isOverdue && this.isDead) return BillingHistoryStatus.Unknown;

        // 위에서 분류되지 못한 케이스는 Unknown 으로 처리.
        return BillingHistoryStatus.Unknown;
    }

    getPriceIn(currencyCode = Currency.KRW) {
        if (!this.payAmount) return 0;
        // 얻으려는 화폐와 기록된 화폐가 같으면 그대로 가격을 반환하고
        if (this.payAmount.code === currencyCode) return this.payAmount.amount;

        // 얻으려는 화폐와 기록된 화폐가 다르면, 달러로 변환후 환율을 적용한다.
        const currency = Object.values(CurrencyList).find((item) => item.code === currencyCode);
        return this.payAmount.dollar * (currency?.exchangeRate || 1);
    }
}

export class BillingHistoryDto {
    get sortKey() {
        return this.issuedAt;
    }

    id: number; // ID
    uid: string | null; // UID
    organizationId: number; // 조직 ID
    subscriptionId: number | null; // 구독정보 ID
    invoiceAppId: number | null; // 인보이스 앱 ID
    creditCardId: number | null; // 결제에 사용된 카드 ID

    @TypeCast(() => Date)
    issuedAt: Date; // 인보이스 발행 일시

    @TypeCast(() => Date)
    lastRequestedAt: Date | null; // 최근 결제 요청 일시

    @TypeCast(() => Date)
    paidAt: Date | null; // 결제 완료 일시

    @TypeCast(() => MoneyDto)
    payAmount: MoneyDto | null; // 결제금액

    paymentMethod: string; // 결제수단
    // isSuccess: boolean; // 결제완료여부
    invoiceUrl?: string | null; // 인보이스(파일) 주소

    @TypeCast(() => Date)
    createdAt: Date; // 생성일시

    @TypeCast(() => Date)
    updatedAt: Date; // 수정일시

    @TypeCast(() => OrganizationDto)
    organization?: OrganizationDto; // 조직

    @TypeCast(() => SubscriptionDto)
    subscription: SubscriptionDto; // 구독정보
    invoiceApp?: InvoiceAppDto; // 인보이스 앱
    @TypeCast(() => CreditCardDto)
    creditCard: CreditCardDto;

    @TypeCast(() => GmailParsedItem)
    emailContent: GmailParsedItem | null; // email content

    getServiceName() {
        return this.subscription.product.name();
    }

    get pageSubject() {
        const month = this.issuedAt.getMonth() + 1;
        const day = this.issuedAt.getDate();
        return `${month}월 ${day}일의 결제내역`;
    }

    get title() {
        if (this.emailContent) return this.emailContent.title;

        const serviceName = this.getServiceName();
        const cycleTerm = this.subscription.getCycleTerm();
        const term =
            {
                [BillingCycleTerm.yearly]: () => `${this.issuedAt.getFullYear()}년 결제분`,
                [BillingCycleTerm.monthly]: () => `${this.issuedAt.getMonth() + 1}월 결제분`,
            }[cycleTerm!] || (() => '(제목 없음)');

        return [serviceName, term()].join(' ');
    }

    from() {
        if (this.emailContent) return this.emailContent.metadata.from;
        return this.getServiceName();
    }

    getAttachments() {
        if (this.emailContent) return this.emailContent.attachments;
        if (this.invoiceUrl) return [{url: this.invoiceUrl, fileName: 'File 1'}];
        return [];
    }

    getEmailContents() {
        if (!this.emailContent) return [];
        const content = this.emailContent.content;
        return content instanceof Array ? content : [content];
    }

    getPriceIn(currencyCode = Currency.KRW) {
        if (!this.payAmount) return 0;
        // 얻으려는 화폐와 기록된 화폐가 같으면 그대로 가격을 반환하고
        if (this.payAmount.code === currencyCode) return this.payAmount.amount;

        // 얻으려는 화폐와 기록된 화폐가 다르면, 달러로 변환후 환율을 적용한다.
        const currency = Object.values(CurrencyList).find((item) => item.code === currencyCode);
        return this.payAmount.dollar * (currency?.exchangeRate || 1);
    }

    getCreditCard() {
        return this.creditCardId === this.subscription.creditCardId ? this.subscription.creditCard : this.creditCard;
    }

    getPaymentMethod() {
        const creditCard = this.getCreditCard();
        return this.subscription.creditCard?.label ?? this.paymentMethod;
    }
}

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
    if (invoiceApp?.billingType === BillingType.undefined) return '-';
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

export type CreateBillingHistoryRequestDto2 = {
    uid: string;
    issuedDate: Date;
    paidDate?: Date | null;
    paymentMethod: string;
    amount: CurrencyDto;
    isSuccessfulPaid: boolean;
    receiptUrl: string;
};

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

export type FromToQueryDto = {
    from: Date; // 기간 시작일
    to: Date; // 기간 종료일
};

export type IsActiveSubsParams = {
    isActiveSubscription?: boolean; // 동기화된 구독만
};

export type GetBillingSchedulesParams = FindAllQueryDto<BillingScheduleDto> & StartEndParams & IsActiveSubsParams;
export type GetBillingHistoriesParams = FindAllQueryDto<BillingHistoryDto> &
    StartEndParams &
    StatusParams &
    IsActiveSubsParams;
