import {TypeCast} from '^types/utils/class-transformer';
import {OrganizationDto} from '^models/Organization/type';
import {TossPaymentsBillingDto} from '../../toss-payment';

// PG
export enum PaymentProvider {
    TossPayment = 'TossPayment',
}

/**
 * 스코디 결제수단 (빌링키)
 */
export class ScordiPaymentMethodDto {
    id: number; // 아이디
    organizationId: number; // 조직 ID
    provider: PaymentProvider; // PG
    // private mId: string; // 상점 ID
    isActive: boolean; // 활성 여부
    // private authKey: string; // 인증키
    // private billingKey: string; // 빌링키
    customerKey: string; // 구매자 ID (~~ orgId)
    @TypeCast(() => Date) authenticatedAt: Date; // 인증완료시각
    cardCompany: string; // 카드 발급사
    cardNumber: string; // 카드 번호 (마스킹됨)
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시
    @TypeCast(() => TossPaymentsBillingDto) response: TossPaymentsBillingDto; // 빌링키 등록 결과 객체
    @TypeCast(() => OrganizationDto) organization?: OrganizationDto; // 조직
}
