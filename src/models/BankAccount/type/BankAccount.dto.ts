import {TypeCast} from '^types/utils/class-transformer';
import {BankAccountKind} from './BankAccountKind.enum';
import {BankAccountUsingStatus} from './BankAccountUsingStatus.enum';
import {SubscriptionDto} from '^models/Subscription/types';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {CreditCardDto} from '^models/CreditCard/type';
import {TeamMemberDto} from '^models/TeamMember';
import {OrganizationDto} from '^models/Organization/type';

/**
 * 계좌
 */
export class BankAccountDto {
    id: number;
    organizationId: number; // 조직 ID
    holdingMemberId: number | null; // 담당자 ID
    isPersonal: boolean; // 법인 여부
    bank: string | null; // 은행
    kind: BankAccountKind; // 계좌 종류
    /**
     * 예금구분 (resAccountDeposit)
     * -
     * - DEPOSIT_TRUST : 10:예금/신탁(구분안됨), 11:수시입출, 12: 예금(거치식)/적금(저축성), 13:신탁, 14:적금/신탁(구분안됨), 19:기타, 99:Error
     * - FOREIGN_CURRENCY : 20:외화, 99:Error
     * - FUND : 30:펀드, 99:Error
     * - LOAN : 40:대출, 99:Error
     */
    depositCode: string | null;
    number: string; // 계좌번호
    displayNumber: string | null; // 계좌번호(표시용)
    name: string; // 계좌명(종류)
    alias: string | null; // 계좌별칭
    currencyCode: string; // 결제통화 (default: "KRW")
    usingStatus: BankAccountUsingStatus; // 사용상태 (0: UnDef, 1: NoUse, 2: InUse, 3: Expired) - sortable
    memo: string | null; // 메모
    @TypeCast(() => Date) startDate: Date | null; // 신규일
    @TypeCast(() => Date) endDate: Date | null; // 만기일
    @TypeCast(() => Date) lastTransDate: Date | null; // 최종거래일
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    /**
     * 대출계좌
     */

    isOverDraft: boolean; // 마이너스 통장 여부
    loanKind: string | null; // 대출종류 (isOverDraft: true 일때)
    loanBalance: string | null; // 대출잔액 (isOverDraft: true 일때)
    @TypeCast(() => Date) loanStartDate: Date | null; // 대출신규일 (isOverDraft: true 일때)
    @TypeCast(() => Date) loanEndDate: Date | null; // 대출만기일 (isOverDraft: true 일때)

    /**
     * 관계형
     */

    @TypeCast(() => OrganizationDto) organization?: Promise<OrganizationDto>; // 조직
    @TypeCast(() => TeamMemberDto) holdingMember?: TeamMemberDto; // 담당자
    @TypeCast(() => CreditCardDto) creditCards?: CreditCardDto[]; // 연결된 카드
    @TypeCast(() => BillingHistoryDto) billingHistories?: BillingHistoryDto[]; // 거래 내역
    @TypeCast(() => SubscriptionDto) subscriptions?: SubscriptionDto[]; // 연결된 구독
}
