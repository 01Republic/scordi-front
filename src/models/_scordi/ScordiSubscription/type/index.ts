import {TypeCast} from '^types/utils/class-transformer';
import {OrganizationDto} from '^models/Organization/type';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {ScordiPaymentDto} from '^models/_scordi/ScordiPayment/type';
import {yyyy_mm_dd} from '^utils/dateTime';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

/**
 * 스코디 구독
 */
export class ScordiSubscriptionDto {
    id: number; // 아이디
    organizationId: number; // 조직 ID
    scordiPlanId: number; // 결제플랜 ID
    isActive: boolean; // 활성화 여부
    @TypeCast(() => Date) startAt: Date | null; // 시작일
    @TypeCast(() => Date) finishAt: Date | null; // 만료일
    nextSubscriptionId: number | null; // 다음으로 적용될 구독 (갱신) ID

    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    @TypeCast(() => OrganizationDto) organization?: OrganizationDto; // 조직
    @TypeCast(() => ScordiPlanDto) scordiPlan: ScordiPlanDto; // 결제플랜
    @TypeCast(() => ScordiPaymentDto) scordiPayments?: ScordiPaymentDto[]; // 스코디 결제내역
    @TypeCast(() => ScordiSubscriptionDto) nextSubscription?: ScordiSubscriptionDto; // 다음으로 적용될 구독 (갱신)

    getNextDate() {
        if (this.finishAt) return this.finishAt;
        return this.startAt ? this.scordiPlan.getNextDate(this.startAt) : null;
    }

    get isFinished() {
        const finishAt = this.finishAt;

        if (!finishAt) return false;

        const today = yyyy_mm_dd(new Date());
        const limit = yyyy_mm_dd(finishAt);

        return limit <= today;
    }
}

export class FindAllScordiSubscriptionsDto extends FindAllQueryDto<ScordiSubscriptionDto> {
    //
}

export class FindAllScordiSubscriptionsForAdminDto extends FindAllQueryDto<ScordiSubscriptionDto> {
    //
}

export class FindAllScordiSubscriptionsQueryDto extends FindAllQueryDto<ScordiSubscriptionDto> {
    //
}

export * from './CreateScordiSubscription.request.dto';
export * from './UpdateScordiSubscription.request.dto';
