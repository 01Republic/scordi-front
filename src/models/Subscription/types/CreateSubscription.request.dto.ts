export class CreateSubscriptionRequestDto {
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
}

export class CreateSubscriptionRequestDto2 {
    isFreeTier: boolean; // 프리티어 여부
    paidMemberCount: number; // 결제되는 사용자 수
    usedMemberCount?: number; // 사용중인 사용자 수
}
