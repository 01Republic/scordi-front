import {ApplicationDto} from '^types/application.type';
import {OrganizationDto} from '^types/organization.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {GmailItem} from '^api/tasting.api';
import {InvoiceAppDto} from '^types/invoiceApp.type';
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
    paidAt: string | null; // 결제 완료 일시
    payAmount: MoneyDto | null; // 결제금액
    paymentMethod: string; // 결제수단
    // isSuccess: boolean; // 결제완료여부
    invoiceUrl?: string | null; // 인보이스(파일) 주소
    createdAt: string; // 생성일시
    updatedAt: string; // 수정일시
    organization?: OrganizationDto; // 조직
    application?: ApplicationDto; // 구독정보
    invoiceApp?: InvoiceAppDto; // 인보이스 앱
    emailContent: GmailItem | null; // email content
};

export function getTotalPriceOfEmails(histories: BillingHistoryDto[], displayCurrency = Currency.KRW) {
    // Email 로부터 생성된 결제히스토리만 걸러냅니다.
    const historyListFromEmail = histories.filter((his) => {
        const email = his.emailContent;
        return email && !email.price.hide && !isNaN(email.price.amount);
    });

    // 합계 금액을 계산합니다.
    const amount = historyListFromEmail

        // Email 의 가격부분 추리기
        .map((his) => {
            const price = his.emailContent!.price;
            return changePriceCurrency(price.amount, price.currency, displayCurrency);
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

export type GetBillingSchedulesParams = FindAllQueryDto<BillingSchedule> & StartEndParams;
export type GetBillingHistoriesParams = FindAllQueryDto<BillingHistoryDto> & StartEndParams;
