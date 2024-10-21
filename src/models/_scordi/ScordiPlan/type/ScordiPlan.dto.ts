import {TypeCast} from '^types/utils/class-transformer';

// 스코디 결제주기 유형
export enum ScordiPlanStepType {
    Month = 'Month',
    Year = 'Year',
}

/**
 * 스코디 결제플랜
 */
export class ScordiPlanDto {
    id: number; // 아이디
    name: string; // 플랜명
    price: number; // 가격
    stepType: ScordiPlanStepType; // 결제주기 유형
    stepSize: number; // 결제주기 사이즈
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시
}
