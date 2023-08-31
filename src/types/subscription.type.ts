import {ProductDto} from '^types/product.type';
import {OrganizationDto} from '^types/organization.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {SubscriptionPaymentPlanDto} from '^types/subscriptionPaymentPlan.type';
import {SubscriptionBillingCycleDto} from '^types/subscriptionBillingCycle.type';
import {InvoiceDataDto} from '^components/ApplicationConnectStage/dto/fetched.responses.dto';

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

export type SubscriptionDto = {
    id: number;
    connectStatus: ConnectStatus;
    isSyncRunning: boolean; // 싱크 실행중 여부
    displayName: string;
    profileImage: string | null; // 조직 프로필 이미지 주소
    connectedSlug: string | null; // 워크스페이스 Slug (연동서비스 내에서)
    organizationId: number;
    productId: number;
    paymentPlanId: number | null;
    billingCycleId: number | null;
    isFreeTier: boolean;
    registeredAt: Date; // 사용 시작일
    nextBillingDate: string | null; // 다음결제일
    nextBillingAmount: number; // 결제예정금액
    accountCount: number;
    paidMemberCount: number;
    usedMemberCount: number;
    publicEmail: string | null; // 공개 이메일
    billingEmail: string | null; // 결제 이메일
    createdAt: Date;
    updatedAt: Date;
    organization?: OrganizationDto;
    product: ProductDto;
    paymentPlan?: SubscriptionPaymentPlanDto | null;
    billingCycle?: SubscriptionBillingCycleDto | null;
    paymentHistories?: [];
    accounts?: [];
};

export type FindAllSubscriptionsQuery = FindAllQueryDto<SubscriptionDto>;

export type CreateSubscriptionRequestDto = {
    sign?: string | null; // 연동계정 Sign
    organizationId: number; // 조직 ID
    productId: number; // 프로토타입 ID
    connectedSlug: string; // 워크스페이스 Slug (연동서비스 내에서)
    displayName: string; // 워크스페이스 이름 (연동서비스 내에서)
    // paymentPlanId: number; // 결제플랜 ID
    // billingCycleId: number; // 결제주기 ID
    // isFreeTier: boolean; // 프리티어 여부
    // registeredAt: Date | string; // 사용시작일
    // paidMemberCount: number; // 결제되는 사용자 수
    // usedMemberCount?: number; // 사용중인 사용자 수
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
