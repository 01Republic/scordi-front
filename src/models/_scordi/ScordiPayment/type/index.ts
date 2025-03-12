import {TypeCast} from '^types/utils/class-transformer';
import {OrganizationDto} from '^models/Organization/type';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {TossPaymentsPaymentDto} from '^models/_scordi/toss-payment';
import {dateSortBy} from '^components/util/date';

/**
 * 스코디 결제의 진행상태
 * ---
 * 스코디 결제의 진행상태 상태입니다. 아래와 같은 상태 값을 가질 수 있습니다. 상태 변화 흐름이 궁금하다면 흐름도를 살펴보세요.
 * - INITIATED: 결제를 생성하면 가지게 되는 초기 상태입니다. 결제 처리를 요청하기 전까지는 INITIATED 상태를 유지합니다. (READY)
 * - PENDING: 결제 처리가 진행중인 상태입니다. (IN_PROGRESS, WAITING_FOR_DEPOSIT)
 * - SUCCESS: 인증된 결제수단 정보, 고객 정보로 요청한 결제가 승인된 상태입니다. (DONE)
 * - FAILED: 결제 승인이 실패한 상태입니다. (ABORTED, EXPIRED)
 * - CANCELED: 승인된 결제가 취소된 상태입니다.
 * - PARTIAL_CANCELED: 승인된 결제가 부분 취소된 상태입니다.
 */
export enum ScordiPaymentStatus {
    INITIATED = 'INITIATED',
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    CANCELED = 'CANCELED',
    PARTIAL_CANCELED = 'PARTIAL_CANCELED',
}

export function t_scordiPaymentStatus(status: ScordiPaymentStatus) {
    return (
        {
            [ScordiPaymentStatus.INITIATED]: '결제시작',
            [ScordiPaymentStatus.PENDING]: '결제중',
            [ScordiPaymentStatus.SUCCESS]: '결제성공',
            [ScordiPaymentStatus.FAILED]: '결제실패',
            [ScordiPaymentStatus.CANCELED]: '취소됨',
            [ScordiPaymentStatus.PARTIAL_CANCELED]: '부분취소',
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

    // 결제취소일
    get canceledAt(): Date | null {
        const cancels = this.response?.cancels || undefined;
        const lastCancel = cancels?.sort(dateSortBy('DESC'))?.[0];
        return lastCancel?.canceledAt || null;
    }

    // 잔액
    get remainAmount() {
        return this.response?.balanceAmount ?? this.price;
    }

    // 청구서 링크
    get invoiceUrl() {
        return this.response?.receipt?.url;
    }
}

export * from './find-all.scordi-payment.query.dto';
export * from './d-pay.find-all.scordi-payment.query.dto';
export * from './CreateScordiPaymentWithCustomerKey.request.dto';
