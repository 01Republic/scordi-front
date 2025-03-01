import {TypeCast} from '^types/utils/class-transformer';
import {monthAfter, yearAfter} from '^utils/dateTime';

// 스코디 결제주기 유형
export enum ScordiPlanStepType {
    Month = 'Month',
    Year = 'Year',
}

// 플랜 만기시 전략
export enum ScordiPlanNextStrategy {
    RECURRING = 'RECURRING',
    BLOCK = 'BLOCK',
}

/**
 * 스코디 결제플랜
 */
export class ScordiPlanDto {
    id: number; // 아이디
    name: string; // 플랜명
    price: number; // 가격
    regularPrice: number; // 정가
    isPublic: boolean; // 공개 전시 플랜 여부
    isActive: boolean; // 플랜 운영 여부
    isCustomInquired: boolean; // 도입문의 플랜 여부
    stepType: ScordiPlanStepType; // 결제주기 유형
    stepSize: number; // 결제주기 사이즈
    nextStrategy: ScordiPlanNextStrategy; // 플랜 만기시 전략
    secretCode: string; // 쿠폰코드
    priority: number; // 전시간 정렬 우선순위
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    // 다음 결제일 계산 : 플랜의 스펙을 구성하기에 따라 만료되지 않는 경우가 존재 할 수 있고, 이 경우 null 값을 반환합니다.
    getNextDate(startDate: Date) {
        if (this.stepType === ScordiPlanStepType.Month) {
            return monthAfter(this.stepSize, startDate);
        }
        if (this.stepType === ScordiPlanStepType.Year) {
            return yearAfter(this.stepSize, startDate);
        }
        return null;
    }

    get isFreeTrial() {
        return this.regularPrice === 0;
    }

    // 할인율 (0 ~ 1)
    get discountRatio() {
        if (this.regularPrice <= this.price) return 0;

        const diff = this.regularPrice - this.price;
        return diff / this.regularPrice;
    }

    // 부가세
    get vat() {
        return this.price * 0.1;
    }

    // 최종 결제금액
    get finalPrice() {
        return Math.floor(this.price + this.vat);
    }

    getStepText(option: StepTextOption = {}) {
        const {noStepText = '무관', format = '%n%u'} = option;

        if (this.stepSize <= 0) return noStepText;

        const num = this.stepSize.toLocaleString();
        const unit = t_planStepType(this.stepType, {
            [ScordiPlanStepType.Month]: '개월',
            [ScordiPlanStepType.Year]: '년',
        });

        return format.replaceAll('%n', num).replaceAll('%u', unit);
    }

    static groupByPriority(plans: ScordiPlanDto[]) {
        return plans.reduce<Record<number, ScordiPlanDto[]>>((group, plan) => {
            group[plan.priority] ||= [];
            group[plan.priority].push(plan);
            return group;
        }, {});
    }
}

interface StepTextOption {
    noStepText?: string;
    format?: string;
}

export function t_planStepType(
    stepType: ScordiPlanStepType,
    dic: {[key in ScordiPlanStepType]?: string} = {
        [ScordiPlanStepType.Month]: '월',
        [ScordiPlanStepType.Year]: '연',
    },
): string {
    dic[ScordiPlanStepType.Month] ??= '월';
    dic[ScordiPlanStepType.Year] ??= '연';
    return dic[stepType]!;
}
