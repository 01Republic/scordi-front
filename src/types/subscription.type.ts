import {ProductDto} from '^types/product.type';
import {OrganizationDto} from '^types/organization.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {SubscriptionPaymentPlanDto} from '^types/subscriptionPaymentPlan.type';
import {
    BillingCycleTerm,
    Locale,
    SubscriptionBillingCycleDto,
    t_BillingCycleTerm,
} from '^types/subscriptionBillingCycle.type';
import {InvoiceDataDto} from '^components/ApplicationConnectStage/dto/fetched.responses.dto';
import {WorkspaceDto} from '^types/workspace.type';
import {BillingHistoryDto} from '^types/billing.type';
import {TypeCast} from '^types/utils/class-transformer';
import {BillingType, billingTypeToCycleTerm} from '^types/invoiceApp.type';
import {monthAfter, yearAfter} from '^utils/dateTime';
import {MoneyDto} from '^types/money.type';
import {InvoiceAccountDto} from '^types/invoiceAccount.type';
import {CreditCardDto} from '^models/CreditCard/credit-cards.type';

// ConnectStatus 연동상태.
export enum ConnectStatus {
    applied = 'APPLIED',
    pending = 'PENDING',
    success = 'SUCCESS',
    failure = 'FAILURE',
}

export function t_ConnectStatus(status: ConnectStatus) {
    switch (status) {
        case ConnectStatus.applied:
            return '연동(준비중)';
        case ConnectStatus.pending:
            return '연동(처리중)';
        case ConnectStatus.success:
            return `연동 완료(자동)`;
        case ConnectStatus.failure:
            return '연동(오류)';
        default:
            return '';
    }
}

export class SubscriptionDto {
    id: number;
    connectStatus: ConnectStatus;
    isActive: boolean; // 활성화 여부
    isSyncRunning: boolean; // 싱크 실행중 여부
    // displayName: string;
    // profileImage: string | null; // 조직 프로필 이미지 주소
    // connectedSlug: string | null; // 워크스페이스 Slug (연동서비스 내에서)
    organizationId: number;
    productId: number;
    invoiceAccountId: number | null;
    workspaceId: number;
    paymentPlanId: number | null;
    billingCycleId: number | null;
    creditCardId: number | null;
    assumedBillingType: BillingType; // 인보이스 추정 결제 주기
    isFreeTier: boolean;
    @TypeCast(() => Date) registeredAt?: Date | null; // 사용 시작일
    nextBillingDate: string | null; // 다음결제일
    nextBillingAmount: number; // 결제예정금액
    accountCount: number;
    paidMemberCount: number;
    usedMemberCount: number;
    publicEmail: string | null; // 공개 이메일
    billingEmail: string | null; // 결제 이메일

    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;

    @TypeCast(() => OrganizationDto)
    organization?: OrganizationDto;

    @TypeCast(() => ProductDto)
    product: ProductDto;

    @TypeCast(() => WorkspaceDto)
    workspace: WorkspaceDto;

    paymentPlan?: SubscriptionPaymentPlanDto | null;

    @TypeCast(() => SubscriptionBillingCycleDto) billingCycle: SubscriptionBillingCycleDto | null;
    @TypeCast(() => BillingHistoryDto) billingHistories?: BillingHistoryDto[];
    @TypeCast(() => InvoiceAccountDto) invoiceAccount?: InvoiceAccountDto;
    accounts?: [];
    @TypeCast(() => CreditCardDto) creditCard?: CreditCardDto;

    getCycleTerm() {
        return this.billingCycle?.term || billingTypeToCycleTerm(this.assumedBillingType);
    }

    getBillingType(standalone = false, locale = Locale.ko) {
        const cycleTerm = this.getCycleTerm();
        return t_BillingCycleTerm(cycleTerm, standalone, locale) || '';
    }

    getNextPayDate(lastPaidAt?: Date | null) {
        // 프리티어인지 확인하고, 프리티어라면 무료플랜으로 응답한다.
        if (this.isFreeTier) return null;

        // 서버에서 보내준 데이터에 입력되어 있으면, 이 데이터를 우선적으로 쓴다.
        if (this.nextBillingDate) return new Date(this.nextBillingDate);

        // lastPaidAt 이 주어지지 않았다면 무료플랜으로 응답한다.
        if (!lastPaidAt) return null;

        // cycleTerm 을 통해 계산한다.
        const cycleTerm = this.getCycleTerm();

        // // 월반복결제
        // // 연반복결제
        // // 1회성결제
        // // 알수없음: 무료플랜처럼 취급
        switch (cycleTerm) {
            case BillingCycleTerm.yearly:
                return yearAfter(1, lastPaidAt);
            case BillingCycleTerm.monthly:
                return monthAfter(1, lastPaidAt);
            default:
                return null;
        }
    }

    getNextPayAmount(lastHistory?: BillingHistoryDto | null) {
        // 프리티어인지 확인하고, 프리티어라면 무료플랜으로 응답한다.
        if (this.isFreeTier) return null;

        // 마지막 결제내역이 주어지지 않으면, 무료처럼 응답한다.
        if (!lastHistory || !lastHistory.payAmount) return null;

        const lastAmount = lastHistory.payAmount;

        // 마지막 결제금액과 다음 결제금액은 기본적으로 동일한 스펙을 공유할 것으로 가정한다.
        const nextAmount = MoneyDto.dup(lastAmount);

        // nextBillingAmount 에 값이 있다면, 이것을 우선으로 적용하고
        // 값이 없는 경우, 마지막 결제금액을 그대로 다음 결제금액으로 사용한다.
        nextAmount.changeAmount(this.nextBillingAmount || lastAmount.amount);

        return nextAmount;
    }
}

export type FindAllSubscriptionsQuery = FindAllQueryDto<SubscriptionDto>;

export type CreateSubscriptionRequestDto = {
    sign?: string | null; // 연동계정 Sign
    organizationId: number; // 조직 ID
    productId: number; // 프로토타입 ID
    connectedSlug: string; // 워크스페이스 Slug (연동서비스 내에서)
    displayName: string; // 워크스페이스 이름 (연동서비스 내에서)
    creditCardId?: number | null; // 카드 ID
    // paymentPlanId: number; // 결제플랜 ID
    // billingCycleId: number; // 결제주기 ID
    // isFreeTier: boolean; // 프리티어 여부
    // registeredAt: Date | string; // 사용시작일
    // paidMemberCount: number; // 결제되는 사용자 수
    // usedMemberCount?: number; // 사용중인 사용자 수
};

export type CreateSubscriptionRequestDto2 = {
    isFreeTier: boolean; // 프리티어 여부
    paidMemberCount: number; // 결제되는 사용자 수
    usedMemberCount?: number; // 사용중인 사용자 수
};

export type CreateSubscriptionByInvoicesRequestDto = {
    displayName: string; // 조직이름 (연동서비스 내에서)
    organizationId: number; // 조직 ID
    productId: number; // 프로토타입 ID
    paymentPlanId: number; // 결제플랜 ID
    billingCycleId: number; // 결제주기 ID
    isFreeTier: boolean; // 프리티어 여부
    registeredAt: Date | string; // 사용시작일
    paidMemberCount: number; // 결제되는 사용자 수
    invoiceDataList: InvoiceDataDto[];
};

export type UpdateSubscriptionRequestDto = Partial<
    Omit<CreateSubscriptionRequestDto, 'organizationId' | 'productId'>
> & {
    connectStatus?: ConnectStatus; // 연동상태
    isActive?: boolean; // 활성화 여부
};

// export const applicationMockDataList: SubscriptionDto[] = [
//   {
//     id: 1,
//     productId: 1,
//     isFreeTier: false,
//     paymentPlan: 'business',
//     billingCycle: 'monthly',
//     registeredAt: new Date(),
//     accountCount: 4,
//     product: applicationPrototypeMockDataList.find(app => app.id === 1)!,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 2,
//     productId: 2,
//     isFreeTier: true,
//     paymentPlan: 'free',
//     billingCycle: 'undef',
//     registeredAt: new Date(),
//     accountCount: 3,
//     product: applicationPrototypeMockDataList.find(app => app.id === 2)!,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];
