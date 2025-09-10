import {ScordiPlanNextStrategy, ScordiPlanStepType} from './ScordiPlan.dto';
import {DPayPlanData} from './DPayPlanData';

export class CreateScordiPlanRequestDto {
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
    extraData: null | string | DPayPlanData; // 추가적인 데이터
}
