import {TypeCast} from '^types/utils/class-transformer';
import {CreateMoneyRequestDto, CurrencyCode, MoneyDto} from '^models/Money';
import {OrganizationDto} from '^models/Organization/type';
import {SubscriptionDto} from '^models/Subscription/types';
import {InvoiceAppDto} from '^models/InvoiceApp/type';
import {CreditCardDto} from '^models/CreditCard/type';
import {GmailParsedItem} from '^api/tasting.api';
import {BillingCycleTerm} from '^models/Subscription/types/billingCycleType';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {IsActiveSubsParams, StartEndParams} from '^types/billing.type';
import {PartialType} from '^types/utils/partial-type';
import {rangeToArr} from '^utils/range';

export * from './create-billing-history.request.dto.v2';

// 쿼리가 가능한 엔티티. (dto 와 entity 의 형태 차이가 좀 있음)
export class BillingHistoryDto {
    get sortKey() {
        return this.issuedAt;
    }

    // 종류 (상태)
    get about(): BillingHistoryStatus {
        const {issuedAt, lastRequestedAt, paidAt} = this;

        if (paidAt) return BillingHistoryStatus.PaySuccess;
        if (lastRequestedAt && !paidAt) return BillingHistoryStatus.PayFail;
        if (issuedAt && !lastRequestedAt) return BillingHistoryStatus.Info;

        // 위에서 분류되지 못한 케이스는 Unknown 으로 처리.
        return BillingHistoryStatus.Unknown;
    }

    id: number; // ID
    uid: string | null; // UID
    emailOriginId: string | null; // Email origin ID
    organizationId: number; // 조직 ID
    subscriptionId: number | null; // 구독정보 ID
    invoiceAppId: number | null; // 인보이스 앱 ID
    creditCardId: number | null; // 결제에 사용된 카드 ID
    @TypeCast(() => Date) issuedAt: Date; // 인보이스 발행 일시
    @TypeCast(() => Date) lastRequestedAt: Date | null; // 최근 결제 요청 일시
    @TypeCast(() => Date) paidAt: Date | null; // 결제 완료 일시
    @TypeCast(() => MoneyDto) payAmount: MoneyDto | null; // 결제금액
    @TypeCast(() => MoneyDto) abroadPayAmount: MoneyDto | null; // 해외결제금액
    paymentMethod: string; // 결제수단
    memo: string | null; // 메모
    // isSuccess: boolean; // 결제완료여부

    /**
     * 인보이스 트래커 관련
     */
    invoiceUrl: string | null; // 인보이스(파일) 주소
    @TypeCast(() => GmailParsedItem) emailContent: GmailParsedItem | null; // email content

    /**
     * 카드내역 관련
     */
    cardApproveNo: string | null; // 카드 결제 승인 번호
    isDomestic: boolean | null; // 국내/해외 결제 여부
    isVATDeductible: boolean | null; // 공제/불공제 여부
    @TypeCast(() => MoneyDto) vatAmount: MoneyDto | null; // 부가세
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시
    @TypeCast(() => OrganizationDto) organization?: OrganizationDto; // 조직
    @TypeCast(() => SubscriptionDto) subscription?: SubscriptionDto; // 구독정보
    @TypeCast(() => InvoiceAppDto) invoiceApp?: InvoiceAppDto; // 인보이스 앱
    @TypeCast(() => CreditCardDto) creditCard?: CreditCardDto | null; // 결제 카드

    get isFromCard(): boolean {
        return !!this.cardApproveNo;
    }

    get isFromEmail(): boolean {
        return !this.isFromCard;
    }

    getServiceName() {
        return this.subscription?.product.name();
    }

    get pageSubject() {
        const month = this.issuedAt.getMonth() + 1;
        const day = this.issuedAt.getDate();
        return `${month}월 ${day}일의 결제내역`;
    }

    get title() {
        if (this.emailContent) return this.emailContent.title;
        if (this.isFromCard) return this.paymentMethod;

        const serviceName = this.getServiceName();
        const cycleTerm = this.subscription?.getCycleTerm() || null;
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

    getPriceIn(currencyCode = CurrencyCode.KRW) {
        if (!this.payAmount) return 0;
        return this.payAmount.toDisplayPrice(currencyCode);
    }

    getCreditCard() {
        return this.creditCardId === this.subscription?.creditCardId ? this.subscription?.creditCard : this.creditCard;
    }

    getPaymentMethod() {
        const creditCard = this.getCreditCard();
        return this.subscription?.creditCard?.label ?? this.paymentMethod;
    }

    get subtype() {
        if (this.emailOriginId) return BillingHistorySubtype.EMAIL_INVOICE;
        if (!this.emailOriginId) return BillingHistorySubtype.CARD_RECEIPT;
        return BillingHistorySubtype.MANUAL;
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

export function t_billingHistoryStatusForDashboard(status: BillingHistoryStatus): string {
    switch (status) {
        case BillingHistoryStatus.PaySuccess:
            return '완료';
        case BillingHistoryStatus.PayWait:
            return '예정';
        case BillingHistoryStatus.PayFail:
            return '실패';
        default:
            return '';
    }
}

// DEPRECATED => CreateBillingHistoryRequestDtoV2
export class CreateBillingHistoryRequestDto {
    paidAt: Date | string; // 결제일시
    payAmount: CreateMoneyRequestDto; // 결제금액
    abroadPayAmount?: CreateMoneyRequestDto; // 해외 결제 금액
    uid?: string; // 결제 승인 번호 / 인보이스 번호 등 결제 관련 고유 번호
    creditCardId: number; // 결제에 사용된 카드 ID
    invoiceUrl?: string; // 인보이스(파일) 주소
    memo?: string; // 메모
    isDomestic?: boolean; // 국내/해외 결제 여부
    isVATDeductible?: boolean; // 공제/불공제 여부
    vatAmount?: CreateMoneyRequestDto; // 부가세
}

export * from './create-billing-history.request.dto.v2';

// DEPRECATED => UpdateBillingHistoryRequestDtoV2
export class UpdateBillingHistoryRequestDto extends PartialType(CreateBillingHistoryRequestDto) {
    // // @ts-ignore
    // paidAt?: string; // datetime string
}

export * from './update-billing-history.request.dto.v2';

export class CreateBillingHistoryStandAloneRequestDto {
    billingCycleId!: number; // 결제주기 ID
    paidAt!: Date; // 결제일시
    payAmount!: CreateMoneyRequestDto; // 결제금액
    // isSuccess!: boolean; // 결제완료여부
    // invoiceUrl?: string | null; // 인보이스(파일) 주소
}

export class StatusParams {
    status?: StatusQueryOptions;
}

export enum StatusQueryOptions {
    Success = 'success',
    Pending = 'pending',
    Failed = 'failed',
}

export type GetBillingHistoriesParams = FindAllQueryDto<BillingHistoryDto> &
    StartEndParams &
    StatusParams &
    IsActiveSubsParams;

export class FindAllBillingHistoriesQueryDto extends FindAllQueryDto<BillingHistoryDto> {
    startDate?: string; // 결제내역 조회범위 시작날짜
    endDate?: string; // 결제내역 조회범위 종료날짜
    isActiveSubscription?: boolean; // 동기화된 구독만
    status?: StatusQueryOptions; // 결제 상태
}

export enum BillingHistorySubtype {
    EMAIL_INVOICE = 'EMAIL_INVOICE',
    MANUAL = 'MANUAL',
    CARD_RECEIPT = 'CARD_RECEIPT',
}

/**
 * BillingHistoryStatus API DTO
 */
export * from './billing-history-status.controller.dto';
