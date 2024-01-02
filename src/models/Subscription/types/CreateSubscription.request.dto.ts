import {TypeCast} from '^types/utils/class-transformer';
import {SubscriptionStatus} from '^models/Subscription/types/SubscriptionStatus';
import {CreateMoneyWithSubscriptionRequestDto} from '^types/money.type';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {RecurringTypeOptions} from '^models/Subscription/types/RecurringTypeOptions';

export class CreateSubscriptionRequestDto {
    organizationId: number; // 조직 ID
    productId: number; // 프로덕트 ID
    workspaceId?: number | null; // 워크스페이스 ID
    creditCardId?: number | null; // 카드 ID
    masterId?: number; // 관리자 팀 멤버 ID
    status?: SubscriptionStatus; // 구독 상태
    alias?: string; // 구독 별칭
    desc?: string; // 구독 설명
    recurringTypeTagId?: number; // 과금 방식 태그 ID
    billingCycleTagId?: number; // 결제 주기 태그 ID
    memo?: string; // 메모

    recurringTypeOption?: RecurringTypeOptions; // 과금 방식
    billingCycleOption?: BillingCycleOptions; // 결제 주기

    // 현재 결제 금액
    @TypeCast(() => CreateMoneyWithSubscriptionRequestDto)
    currentBillingAmount?: CreateMoneyWithSubscriptionRequestDto;

    isFreeTier?: boolean; // 프리티어 여부(Default: false)
    isPerUser?: boolean; // 유저가 기록한 인당 과금 여부
    @TypeCast(() => Date) registeredAt?: Date; // 사용시작일(Default: 현재)

    // sign?: string | null; // 연동계정 Sign
    // organizationId: number; // 조직 ID
    // productId: number; // 프로토타입 ID
    // connectedSlug: string; // 워크스페이스 Slug (연동서비스 내에서)
    // displayName: string; // 워크스페이스 이름 (연동서비스 내에서)
    // creditCardId?: number | null; // 카드 ID
    // // paymentPlanId: number; // 결제플랜 ID
    // // billingCycleId: number; // 결제주기 ID
    // // isFreeTier: boolean; // 프리티어 여부
    // // registeredAt: Date | string; // 사용시작일
    // // paidMemberCount: number; // 결제되는 사용자 수
    // // usedMemberCount?: number; // 사용중인 사용자 수
}

export class CreateSubscriptionRequestDto2 {
    isFreeTier: boolean; // 프리티어 여부
    paidMemberCount: number; // 결제되는 사용자 수
    usedMemberCount?: number; // 사용중인 사용자 수
}
