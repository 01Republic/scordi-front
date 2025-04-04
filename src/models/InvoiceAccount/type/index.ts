import {InvoiceAppDto} from '^models/InvoiceApp/type';
import {GmailQueryOptions} from '^api/tasting.api';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {TypeCast} from '^types/utils/class-transformer';
import {SubscriptionDto} from '^models/Subscription/types';
import {OrganizationDto} from '^models/Organization/type';
import {d_day, dayAfter, firstDayOfMonth, firstDayOfYear, monthBefore, yearBefore} from '^utils/dateTime';
import {GoogleTokenDataDto} from '^models/GoogleTokenData/type';
import {PartialType} from '^types/utils/partial-type';
import {TeamMemberDto} from '^models/TeamMember';
import {TeamDto} from '^models/Team/type';

export type GmailAgentTokenData = {
    accessToken: string; //Gmail Access Token
    refreshToken: string; // Gmail Refresh Token
    expireAt: Date; // When Gmail Token expire at
};

// 사용상태
export enum InvoiceAccountUsingStatus {
    UnDef, // undefined (default)
    NoUse, // 미사용
    InUse, // 사용중
    Expired, // 만료
}

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

export class CreateInvoiceAccountRequestDto {
    email: string; // 이메일
    image?: string | null; // 프로필 이미지
    // provider?: MailProvider = MailProvider.Google;
    tokenData: GmailAgentTokenData; // 인증 토큰
    gmailQueryOptions: GmailQueryOptions; // 지메일 쿼리
}

export class CreateInvoiceAccountDto {
    email: string;
    holdingMemberId?: number | null;
    memo?: string | null; // 메모
    usingStatus?: InvoiceAccountUsingStatus; // 사용상태
}

export class UpdateInvoiceAccountDto extends PartialType(CreateInvoiceAccountDto) {}

export class CreateInvoiceAccountRequestDto2 {
    code: string; // 구글 1회성 코드
    gmailQueryOptions: GmailQueryOptions; // 지메일 쿼리
}

export class SyncInvoiceAccountRequestDto {
    tokenData: GmailAgentTokenData; // 인증 토큰
}

export class ReConnectInvoiceAccountRequestDto {
    code: string; // 구글 1회성 코드
}

export const getDraftInvoiceAccountFromTo = () => ({
    from: monthBefore(2, firstDayOfMonth(new Date())), // 두 달 전 1일 부터
    to: new Date(), // 오늘까지
});

export const getCreateInvoiceAccountFromTo = () => ({
    from: yearBefore(1, firstDayOfYear()), // 작년 1월 1일 부터
    to: new Date(), // 오늘까지
});

export class FindAllInvoiceAccountQueryDto extends FindAllQueryDto<InvoiceAccountDto> {
    keyword?: string;
}

export * from './gmail.type';
