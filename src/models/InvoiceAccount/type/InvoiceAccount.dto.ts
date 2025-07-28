import {TypeCast} from '^types/utils/class-transformer';
import {d_day, dayAfter, firstDayOfMonth, firstDayOfYear, monthBefore, yearBefore} from '^utils/dateTime';
import {OrganizationDto} from '^models/Organization/type';
import {GoogleTokenDataDto} from '^models/GoogleTokenData/type';
import {InvoiceAppDto} from '^models/InvoiceApp/type';
import {SubscriptionDto} from '^models/Subscription/types';
import {TeamMemberDto} from '^models/TeamMember';
import {TeamDto} from '^models/Team/type';
import {InvoiceAccountUsingStatus} from './InvoiceAccountUsingStatus.enum';
import {GmailAgentTokenData} from './GmailAgentTokenData.type';

export class InvoiceAccountDto {
    id: number;
    organizationId: number;
    image: string | null;
    email: string;
    isActive: boolean; // 활성화 여부
    isSyncRunning: boolean; // 싱크 실행중 여부
    @TypeCast(() => Date) syncedStartDate: Date | null; // 연동된 이메일내역 시작일시
    @TypeCast(() => Date) syncedEndDate: Date | null; // 연동된 이메일내역 종료일시
    memo?: string | null; // 메모
    usingStatus: InvoiceAccountUsingStatus; // 사용상태
    googleTokenDataId: number | null;
    holdingMemberId: number | null;
    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;

    tokenData: GmailAgentTokenData;

    // relations
    @TypeCast(() => OrganizationDto) organization?: OrganizationDto[];
    @TypeCast(() => GoogleTokenDataDto) googleTokenData?: GoogleTokenDataDto;
    @TypeCast(() => InvoiceAppDto) invoiceApps?: InvoiceAppDto[];
    @TypeCast(() => SubscriptionDto) subscriptions?: SubscriptionDto[];
    @TypeCast(() => TeamMemberDto) holdingMember?: TeamMemberDto; // 담당자
    @TypeCast(() => TeamDto) teams?: TeamDto[]; // 사용 중인 팀

    get title() {
        const auth = this.googleTokenData;
        const email = auth?.email || this.email || '';
        return `${email} ${auth?.name && `(${auth.name})`}`;
    }

    get isManuallyCreated() {
        return !this.googleTokenDataId && !this.image;
    }

    get provider() {
        return 'Google';
    }

    get providerImg() {
        return 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png';
    }

    // [토큰] 토큰 만료일시
    get tokenExpireAt() {
        const tokenCreated = this.createdAt;
        const DURATION = 7; // 7 days (테스트모드에서는 유효기간이 1주일로 알려져 있음.)
        return dayAfter(DURATION, tokenCreated);
    }

    // [토큰] 토큰 만료여부
    get isTokenExpiredAssume() {
        return new Date().getTime() < this.tokenExpireAt.getTime();
    }

    // [토큰] 토큰 만료 D-Day
    get tokenExpireLeft() {
        return d_day(this.tokenExpireAt);
    }
}

export const getDraftInvoiceAccountFromTo = () => ({
    from: monthBefore(2, firstDayOfMonth(new Date())), // 두 달 전 1일 부터
    to: new Date(), // 오늘까지
});

export const getCreateInvoiceAccountFromTo = () => ({
    from: yearBefore(1, firstDayOfYear()), // 작년 1월 1일 부터
    to: new Date(), // 오늘까지
});
