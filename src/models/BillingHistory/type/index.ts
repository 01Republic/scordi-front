import {TypeCast} from '^types/utils/class-transformer';
import {CreateMoneyRequestDto, CurrencyCode, CurrencyList, MoneyDto} from '^types/money.type';
import {OrganizationDto} from '^models/Organization/type';
import {SubscriptionDto} from '^models/Subscription/types';
import {InvoiceAppDto} from '^models/InvoiceApp/type';
import {CreditCardDto} from '^models/CreditCard/type';
import {GmailParsedItem} from '^api/tasting.api';
import {BillingCycleTerm} from '^models/Subscription/types/billingCycleType';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {IsActiveSubsParams, StartEndParams} from '^types/billing.type';

export * from './create-billing-history.request.dto.v2';

// 쿼리가 가능한 엔티티. (dto 와 entity 의 형태 차이가 좀 있음)
export class BillingHistoryDto {
    get sortKey() {
        return this.issuedAt;
    }

    id: number; // ID
    uid: string | null; // UID
    emailOriginId: string | null; // Email origin ID
    organizationId: number; // 조직 ID
    subscriptionId: number | null; // 구독정보 ID
    invoiceAppId: number | null; // 인보이스 앱 ID
    creditCardId?: number | null; // 결제에 사용된 카드 ID
    @TypeCast(() => Date) issuedAt: Date; // 인보이스 발행 일시
    @TypeCast(() => Date) lastRequestedAt: Date | null; // 최근 결제 요청 일시
    @TypeCast(() => Date) paidAt: Date | null; // 결제 완료 일시
    @TypeCast(() => MoneyDto) payAmount: MoneyDto | null; // 결제금액
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
    isDomestic: boolean | null; // 국내/해외 결제 여부
    isVATDeductible: boolean | null; // 공제/불공제 여부
    @TypeCast(() => MoneyDto) vat: MoneyDto | null; // 부가세
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시
    @TypeCast(() => OrganizationDto) organization?: OrganizationDto; // 조직
    @TypeCast(() => SubscriptionDto) subscription?: SubscriptionDto; // 구독정보
    @TypeCast(() => InvoiceAppDto) invoiceApp?: InvoiceAppDto; // 인보이스 앱
    @TypeCast(() => CreditCardDto) creditCard?: CreditCardDto | null; // 결제 카드

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
        // 얻으려는 화폐와 기록된 화폐가 같으면 그대로 가격을 반환하고
        if (this.payAmount.code === currencyCode) return this.payAmount.amount;

        // 얻으려는 화폐와 기록된 화폐가 다르면, 달러로 변환후 환율을 적용한다.
        const currency = Object.values(CurrencyList).find((item) => item.code === currencyCode);
        return this.payAmount.dollar * (currency?.exchangeRate || 1);
    }

    getCreditCard() {
        return this.creditCardId === this.subscription?.creditCardId ? this.subscription?.creditCard : this.creditCard;
    }

    getPaymentMethod() {
        const creditCard = this.getCreditCard();
        return this.subscription?.creditCard?.label ?? this.paymentMethod;
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

export class CreateBillingHistoryRequestDto {
    paidAt!: Date; // 결제일시
    payAmount!: CreateMoneyRequestDto; // 결제금액
    uid?: string; // 결제 승인 번호 / 인보이스 번호 등 결제 관련 고유 번호
    creditCardId!: number; // 결제에 사용된 카드 ID
    invoiceUrl?: string; // 인보이스(파일) 주소
    memo?: string; // 메모
    isDomestic?: boolean; // 국내/해외 결제 여부
    isVATDeductible?: boolean; // 공제/불공제 여부
    vat?: CreateMoneyRequestDto; // 부과세
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

export type StatusParams = {
    status?: StatusQueryOptions;
};

export enum StatusQueryOptions {
    Success = 'success',
    Pending = 'pending',
    Failed = 'failed',
}

export type GetBillingHistoriesParams = FindAllQueryDto<BillingHistoryDto> &
    StartEndParams &
    StatusParams &
    IsActiveSubsParams;
