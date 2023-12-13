import {BillingType, billingTypeToCycleTerm} from '^models/InvoiceApp/type';
import {TypeCast} from '^types/utils/class-transformer';
import {TagDto} from '^models/Tag/type';
import {OrganizationDto} from '^models/Organization/type';
import {WorkspaceDto} from '^models/Workspace/type/workspace.type';
import {ProductDto} from '^models/Product/type';
import {monthAfter, yearAfter} from '^utils/dateTime';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {CreditCardDto} from '^models/CreditCard/type';
import {TeamMemberDto} from '^models/TeamMember/type';
import {MoneyDto} from '^types/money.type';
import {BillingCycleTerm, Locale, SubscriptionBillingCycleDto, t_BillingCycleTerm} from './billingCycleType';
import {ConnectStatus} from './ConnectStatus';
import {SubscriptionStatus} from './SubscriptionStatus';
import {SubscriptionPaymentPlanDto} from './paymentPlanType';

export class SubscriptionDto {
    id: number;
    connectStatus: ConnectStatus; // 연동상태
    status: SubscriptionStatus; // 구독 상태
    recurringTypeTagId: number | null; // 과금 방식 태그 ID
    isActive: boolean; // 활성화 여부
    isSyncRunning: boolean; // 싱크 실행중 여부
    workspaceId: number | null; // 서비스 내 조직 ID
    organizationId: number; // 스코디 조직 ID
    productId: number; // 프로토타입 ID
    // invoiceAccountId: number | null;
    creditCardId: number | null; // 결제 카드 ID
    masterId?: number; // 관리자 ID
    isFreeTier: boolean; // 프리티어 여부
    paymentPlanId: number | null; // 결제플랜 ID
    billingCycleId: number | null; // 결제주기 ID
    assumedBillingType: BillingType; // 인보이스 추정 결제 주기
    @TypeCast(() => Date) registeredAt?: Date | null; // 사용 시작일
    nextBillingDate: string | null; // 다음결제일
    nextBillingAmount: number; // 결제예정금액
    accountCount: number; // 멤버계정수
    paidMemberCount: number; // 결제되는 사용자 수
    usedMemberCount: number; // 사용중인 사용자 수
    publicEmail: string | null; // 공개 이메일
    billingEmail: string | null; // 결제 이메일
    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;

    @TypeCast(() => TagDto) recurringTypeTag?: TagDto; // 과금 방식
    @TypeCast(() => OrganizationDto) organization?: OrganizationDto; // 조직
    @TypeCast(() => WorkspaceDto) workspace?: WorkspaceDto; // 워크스페이스
    @TypeCast(() => ProductDto) product: ProductDto; // 프로토타입 (eager load)
    @TypeCast(() => SubscriptionPaymentPlanDto) paymentPlan?: SubscriptionPaymentPlanDto; // 결제플랜
    @TypeCast(() => SubscriptionBillingCycleDto) billingCycle?: SubscriptionBillingCycleDto; // 결제주기
    @TypeCast(() => BillingHistoryDto) billingHistories?: BillingHistoryDto[]; // 결제내역
    @TypeCast(() => InvoiceAccountDto) invoiceAccounts?: InvoiceAccountDto[]; // 인보이스 계정
    @TypeCast(() => CreditCardDto) creditCard?: CreditCardDto; // 결제 카드
    @TypeCast(() => TeamMemberDto) master?: TeamMemberDto; // 관리자 (담당자)
    @TypeCast(() => TeamMemberDto) teamMembers?: TeamMemberDto[]; // 사용 중인 팀 멤버
    accounts?: [];

    getCycleTerm() {
        return this.billingCycle?.term || billingTypeToCycleTerm(this.assumedBillingType);
    }

    getRecurringTypeText(standalone = false) {
        if (typeof this.billingCycle?.term === 'undefined') {
            return (
                this.recurringTypeTag?.name ||
                t_BillingCycleTerm(billingTypeToCycleTerm(this.assumedBillingType), standalone)
            );
        }

        return (
            t_BillingCycleTerm(this.billingCycle?.term, standalone) ||
            this.recurringTypeTag?.name ||
            t_BillingCycleTerm(billingTypeToCycleTerm(this.assumedBillingType), standalone)
        );
    }

    getBillingType(standalone = false, locale = Locale.ko) {
        const cycleTerm = this.getCycleTerm();
        return t_BillingCycleTerm(cycleTerm, standalone, locale) || '';
    }

    getNextPayDate(lastPaidAt?: Date | null) {
        // 프리티어인지 확인하고, 프리티어라면 무료플랜으로 응답한다.
        if (this.isFreeTier) return null;

        // 서버에서 보내준 데이터에 입력되어 있으면, 이 데이터를 우선적으로 쓴다.
        if (this.nextBillingDate) return new Date(this.nextBillingDate);

        // lastPaidAt 이 주어지지 않았다면 무료플랜으로 응답한다.
        if (!lastPaidAt) return null;

        // cycleTerm 을 통해 계산한다.
        const cycleTerm = this.getCycleTerm();

        // // 월반복결제
        // // 연반복결제
        // // 1회성결제
        // // 알수없음: 무료플랜처럼 취급
        switch (cycleTerm) {
            case BillingCycleTerm.yearly:
                return yearAfter(1, lastPaidAt);
            case BillingCycleTerm.monthly:
                return monthAfter(1, lastPaidAt);
            default:
                return null;
        }
    }

    getNextPayAmount(lastHistory?: BillingHistoryDto | null) {
        // 프리티어인지 확인하고, 프리티어라면 무료플랜으로 응답한다.
        if (this.isFreeTier) return null;

        // 마지막 결제내역이 주어지지 않으면, 무료처럼 응답한다.
        if (!lastHistory || !lastHistory.payAmount) return null;

        const lastAmount = lastHistory.payAmount;

        // 마지막 결제금액과 다음 결제금액은 기본적으로 동일한 스펙을 공유할 것으로 가정한다.
        const nextAmount = MoneyDto.dup(lastAmount);

        // nextBillingAmount 에 값이 있다면, 이것을 우선으로 적용하고
        // 값이 없는 경우, 마지막 결제금액을 그대로 다음 결제금액으로 사용한다.
        nextAmount.changeAmount(this.nextBillingAmount || lastAmount.amount);

        return nextAmount;
    }
}
