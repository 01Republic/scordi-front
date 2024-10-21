import {TypeCast} from '^types/utils/class-transformer';
import {OrganizationDto} from '^models/Organization/type';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';

// 스코디 결제의 진행상태
export enum ScordiPaymentStatus {
    INITIATED = 'INITIATED',
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
}

/**
 * 스코디 결제내역
 */
export class ScordiPaymentDto {
    id: number; // 아이디
    organizationId: number; // 조직 ID
    scordiSubscriptionId: number; // 구독 ID
    scordiPlanId: number; // 결제플랜 ID
    planName: string; // 결제플랜명
    price: number; // 결제금액
    status: ScordiPaymentStatus; // 진행상태
    response: string | null; // 응답메세지
    createdAt: Date; // 생성일시
    updatedAt: Date; // 수정일시
    @TypeCast(() => OrganizationDto) organization?: OrganizationDto; // 조직
    @TypeCast(() => ScordiSubscriptionDto) scordiSubscription?: ScordiSubscriptionDto; // 구독
    @TypeCast(() => ScordiPlanDto) scordiPlan?: ScordiPlanDto; // 결제플랜
    // @TypeCast(() => ScordiPaymentRefundDto) scordiPaymentRefunds: ScordiPaymentRefundDto[]; // 스코디 환불내역
}
