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
import {TeamMemberDto, TeamMemberSubscriptionDto} from '^models/TeamMember/type';
import {MoneyDto} from '^models/Money';
import {BillingCycleTerm, Locale, SubscriptionBillingCycleDto, t_BillingCycleTerm} from './billingCycleType';
import {ConnectStatus} from './ConnectStatus';
import {SubscriptionStatus} from './SubscriptionStatus';
import {SubscriptionPaymentPlanDto} from './paymentPlanType';
import {BillingCycleOptions, t_SubscriptionBillingCycleType} from '^models/Subscription/types/BillingCycleOptions';
import {PricingModelOptions} from '^models/Subscription/types/PricingModelOptions';
import {SubscriptionConnectMethod} from '^models/Subscription/types/ConnectMethod';
import {VendorManagerDto} from '^models/VendorManager/type';
import {VendorCompanyDto} from '^models/VendorCompany/type';

export class SubscriptionDto {
    id: number;
    connectStatus: ConnectStatus; // 연동상태
    status: SubscriptionStatus; // 구독 상태
    alias: string; // 별칭
    desc: string | null; // 메모
    isActive: boolean; // 활성화 여부
    isFreeTier: boolean; // 프리티어 여부
    assumedBillingType: BillingType; // 인보이스 추정 결제 주기

    /**
     * 아래 option 프로퍼티는
     * user customizable 한  tag 가 아닌,  static enum 값들입니다.
     */
    billingCycleType: BillingCycleOptions; // 결제 주기
    pricingModel: PricingModelOptions; // 과금 방식
    connectMethod: SubscriptionConnectMethod; // 연동 방식

    @TypeCast(() => Date) registeredAt?: Date | null; // 사용 시작일
    nextBillingDate: string | null; // 다음결제일
    nextBillingAmount: number; // 결제예정금액
    nextComputedBillingDate: string | null; // 다음결제일 (최종 계산결과)
    @TypeCast(() => MoneyDto) currentBillingAmount: MoneyDto | null; // 현재 결제 금액
    @TypeCast(() => Date) lastPaidAt: Date | null; // 최신 결제일
    isPerUser: boolean; // 인당 과금 여부
    accountCount: number; // 멤버계정수
    paidMemberCount: number; // 결제되는 사용자 수 (라이선스에 따른 총 시트 수)
    usedMemberCount: number; // 사용중인 사용자 수 (라이선스에서 사용중인 시트 수)
    publicEmail: string | null; // 공개 이메일
    billingEmail: string | null; // 결제 이메일

    workspaceId: number | null; // 서비스 내 조직 ID
    organizationId: number; // 스코디 조직 ID
    productId: number; // 프로토타입 ID
    paymentPlanId: number | null; // 결제플랜 ID
    billingCycleId: number | null; // 결제주기 ID
    creditCardId: number | null; // 결제 카드 ID
    masterId?: number; // 관리자 ID
    recurringTypeTagId: number | null; // 과금 방식 태그 ID
    billingCycleTagId: number | null; // 결제 주기 태그 ID

    isSyncRunning: boolean; // 싱크 실행중 여부
    // invoiceAccountId: number | null;

    vendorCompanyId: number | null; // 파트너 벤더사 ID
    vendorManagerId: number | null; // 파트너 벤더사 담당자 ID

    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;

    @TypeCast(() => OrganizationDto) organization?: OrganizationDto; // 조직
    @TypeCast(() => WorkspaceDto) workspace?: WorkspaceDto; // 워크스페이스
    @TypeCast(() => ProductDto) product: ProductDto; // 프로토타입 (eager load)
    @TypeCast(() => SubscriptionPaymentPlanDto) paymentPlan?: SubscriptionPaymentPlanDto; // 결제플랜
    @TypeCast(() => SubscriptionBillingCycleDto) billingCycle?: SubscriptionBillingCycleDto; // 결제주기
    @TypeCast(() => BillingHistoryDto) billingHistories?: BillingHistoryDto[]; // 결제내역
    @TypeCast(() => InvoiceAccountDto) invoiceAccounts?: InvoiceAccountDto[]; // 인보이스 계정
    @TypeCast(() => CreditCardDto) creditCard?: CreditCardDto; // 결제 카드

    @TypeCast(() => TeamMemberSubscriptionDto) teamMemberSubscriptions?: TeamMemberSubscriptionDto[]; // 사용 중인 팀 멤버 (연결)
    @TypeCast(() => TeamMemberDto) teamMembers?: TeamMemberDto[]; // 사용 중인 팀 멤버

    @TypeCast(() => TeamMemberDto) master?: TeamMemberDto; // 관리자 (담당자)
    // @TypeCast(() => SignedHistoryDto) signedHistories?: SignedHistoryDto[]; // 접속 기록 목록
    @TypeCast(() => TagDto) recurringTypeTag?: TagDto; // 과금 방식 태그
    @TypeCast(() => TagDto) billingCycleTag?: TagDto; // 결제 주기 태그
    @TypeCast(() => VendorCompanyDto) vendorCompany?: VendorCompanyDto; // 파트너 벤더사
    @TypeCast(() => VendorManagerDto) vendorManager?: VendorManagerDto; // 파트너 벤더사 담당자

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

    // nextComputedBillingDate 속성과 다른 점은, 임의의 특정 결제일을 입력으로 받아 상대적인 차기 결제일을 반환합니다.
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

    // 직접 추가한 구독의 결제 주기를 텍스트로 변환합니다.
    getBillingCycleTypeText(standalone = false, locale = Locale.ko) {
        return t_SubscriptionBillingCycleType(this.billingCycleType);
    }
}
