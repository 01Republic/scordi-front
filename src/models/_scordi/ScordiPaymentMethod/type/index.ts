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
    organizationId: number | null; // 조직 ID
    provider: PaymentProvider; // PG
    // private mId: string; // 상점 ID
    isActive: boolean; // 활성 여부
    // private authKey: string; // 인증키
    // private billingKey: string; // 빌링키
    customerKey: string; // 구매자 ID (~~ orgId)
    @TypeCast(() => Date) authenticatedAt: Date; // 인증완료시각
    cardCompany: string; // 카드 발급사
    cardNumber: string; // 카드 번호 (마스킹됨)
    @TypeCast(() => Date) expiredAt: Date | null; // 만료일시 (만료된 카드의 경우)
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시
    @TypeCast(() => Date) deletedAt: Date | null; // 삭제 일시 (soft-delete)
    @TypeCast(() => TossPaymentsBillingDto) response: TossPaymentsBillingDto; // 빌링키 등록 결과 객체
    @TypeCast(() => OrganizationDto) organization?: OrganizationDto; // 조직

    asCardCompany() {
        return this.response.asCardCompany();
    }

    cardNumbers() {
        const n1 = this.cardNumber.slice(0, 4);
        const n2 = this.cardNumber.slice(4, 8);
        const n3 = this.cardNumber.slice(8, 12);
        const n4 = this.cardNumber.slice(-4);
        return [n1, n2, n3, n4];
    }

    get fullCardNumber() {
        return this.cardNumbers().join('-');
    }
}

export * from './FindAllScordiPaymentMethod.query.dto';
export * from './CreateScordiPaymentMethod.request.dto';
export * from './UpdateScordiPaymentMethod.request.dto';
