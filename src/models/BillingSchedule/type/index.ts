// 쿼리가 가능한 엔티티. (dto 와 entity 의 형태 차이가 좀 있음)
import {TypeCast} from '^types/utils/class-transformer';
import {BillingType} from '^models/InvoiceApp/type';
import {Currency, CurrencyList, MoneyDto} from '^types/money.type';
import {SubscriptionDto} from '^models/Subscription/types';
import {BillingHistoryStatus, IsActiveSubsParams, StartEndParams} from '^types/billing.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

// 쿼리가 가능한 엔티티. (dto 와 entity 의 형태 차이가 좀 있음)
export class BillingScheduleDto {
    organizationId!: number;
    subscriptionId!: number;
    productId!: number;
    paymentPlanId!: number;
    billingCycleId!: number;
    isSuccess!: boolean;
    isOverdue!: boolean;
    billingDate!: string;
    billingAmount!: number;
    isFreeTier!: boolean;
    isPerUser!: boolean;
    unitPrice!: number;
    paidMemberCount!: number;
}

export class BillingScheduleShallowDto {
    get sortKey() {
        return this.billingDate;
    }

    billingHistoryId: number; // 결제내역 ID
    organizationId: number; // 조직 ID
    subscriptionId: number; // 구독 ID
    orgName: string | null; // 조직명
    serviceName: string | null; // 서비스명

    @TypeCast(() => Date)
    lastIssuedAt: Date; // 마지막 청구서 발행일

    assumedBillingType: BillingType; // 추정 결제주기

    @TypeCast(() => Date)
    billingDate: Date; // 결제일

    @TypeCast(() => MoneyDto)
    payAmount: MoneyDto | null; // 결제금액
    // planName: string;
    // cycleName: string;
    // isSuccess: boolean;
    isOverdue: boolean; // 결제일 지남
    isDead: boolean; // 종료됨
    // billingAmount: number;
    // isFreeTier: boolean;
    // isPerUser: boolean;
    // unitPrice: number;
    // paidMemberCount: number;

    @TypeCast(() => SubscriptionDto)
    subscription: SubscriptionDto;

    // 결제가 안됐는데(결제기록이 존재하지 않음) 그대로 시간이 지나버린 건.
    // -> '지금까지 결제한 금액'으로 놓기에는 어색하여, '앞으로 결제될 금액'에서 보여짐.
    somethingWrong() {
        return !this.isDead && this.isOverdue;
    }

    mightBeWillPay() {
        return !this.isDead && !this.isOverdue;
    }

    get pageSubject() {
        const month = this.billingDate.getMonth() + 1;
        const day = this.billingDate.getDate();
        return `${month}월 ${day}일 예정분`;
    }

    getStatus() {
        if (!this.payAmount || this.payAmount.amount <= 0) return BillingHistoryStatus.Info;
        if (this.isOverdue && this.isDead) return BillingHistoryStatus.PaySuccess;
        if (this.isOverdue && !this.isDead) return BillingHistoryStatus.PayFail;
        if (!this.isOverdue && !this.isDead) return BillingHistoryStatus.Info;
        if (!this.isOverdue && this.isDead) return BillingHistoryStatus.Unknown;

        // 위에서 분류되지 못한 케이스는 Unknown 으로 처리.
        return BillingHistoryStatus.Unknown;
    }

    getPriceIn(currencyCode = Currency.KRW) {
        if (!this.payAmount) return 0;
        // 얻으려는 화폐와 기록된 화폐가 같으면 그대로 가격을 반환하고
        if (this.payAmount.code === currencyCode) return this.payAmount.amount;

        // 얻으려는 화폐와 기록된 화폐가 다르면, 달러로 변환후 환율을 적용한다.
        const currency = Object.values(CurrencyList).find((item) => item.code === currencyCode);
        return this.payAmount.dollar * (currency?.exchangeRate || 1);
    }
}

export type GetBillingSchedulesParams = FindAllQueryDto<BillingScheduleDto> & StartEndParams & IsActiveSubsParams;
