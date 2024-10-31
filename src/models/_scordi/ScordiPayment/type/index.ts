import {TypeCast} from '^types/utils/class-transformer';
import {OrganizationDto} from '^models/Organization/type';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {TossPaymentsPaymentDto} from '^models/_scordi/toss-payment';

// 스코디 결제의 진행상태
export enum ScordiPaymentStatus {
    INITIATED = 'INITIATED',
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
}

export function t_scordiPaymentStatus(status: ScordiPaymentStatus) {
    return (
        {
            [ScordiPaymentStatus.INITIATED]: '결제시작',
            [ScordiPaymentStatus.PENDING]: '결제중',
            [ScordiPaymentStatus.SUCCESS]: '결제성공',
            [ScordiPaymentStatus.FAILED]: '결제실패',
        }[status] || '-'
    );
}

/**
 * 스코디 결제내역
 */
export class ScordiPaymentDto {
    id: number; // 아이디
    organizationId: number | null; // 조직 ID
    scordiSubscriptionId: number | null; // 구독 ID
    scordiPlanId: number | null; // 결제플랜 ID
    planName: string; // 결제플랜명
    price: number; // 결제금액
    status: ScordiPaymentStatus; // 진행상태
    customerName: string; // 결제자 이름 또는 조직명
    customerPhone: string; // 결제자 연락처
    customerEmail: string; // 청구서 수신 메일
    customerIdentityNumber: string | null; // 사용자가 입력한 생년월일(YYMMDD) 또는 사업자번호 10자리
    cardNumber: string | null; // 사용자가 입력한 결제 카드 번호
    @TypeCast(() => TossPaymentsPaymentDto) response: TossPaymentsPaymentDto | null; // 응답메세지
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    @TypeCast(() => OrganizationDto) organization?: OrganizationDto; // 조직
    @TypeCast(() => ScordiSubscriptionDto) scordiSubscription?: ScordiSubscriptionDto; // 구독
    @TypeCast(() => ScordiPlanDto) scordiPlan?: ScordiPlanDto; // 결제플랜
    // @TypeCast(() => ScordiPaymentRefundDto) scordiPaymentRefunds: ScordiPaymentRefundDto[]; // 스코디 환불내역

    // 화폐 정보
    get currencyInfo() {
        return this.response?.currencyInfo;
    }

    // 결제요청일
    get requestedAt() {
        return this.response?.requestedAt || null;
    }

    // 결제승인일
    get approvedAt() {
        return this.response?.approvedAt || null;
    }

    // 청구서 링크
    get invoiceUrl() {
        return this.response?.receipt?.url;
    }
}

export * from './find-all.scordi-payment.query.dto';
export * from './d-pay.find-all.scordi-payment.query.dto';
export * from './CreateScordiPaymentWithCustomerKey.request.dto';
