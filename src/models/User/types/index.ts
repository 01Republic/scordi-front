import {UsersSocialAccountDto} from '^models/User/types/userSocialAccount';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {TypeCast} from '^types/utils/class-transformer';
import {MembershipDto} from 'src/models/Membership/types';
import {UserLocale} from '^models/User/types/UserLocale.enum';

export type UserSignUpRequestDto = {
    name: string;
    phone: string;
    orgName: string;
    email: string;
    code: string;
    password: string;
    passwordConfirmation: string;
    isAgreeForServiceUsageTerm: boolean;
    isAgreeForPrivacyPolicyTerm: boolean;
};

export type UserSocialSignUpRequestDto = {
    provider: string; // 소셜로그인공급자
    uid: string; // 소셜로그인 ID
    profileImageUrl?: string | null; // 프로필이미지 URL
    name: string; // 이름
    phone: string; // 전화번호
    email: string; // 이메일
    isAgreeForServiceUsageTerm: boolean; // 서비스 이용약관 동의 여부
    isAgreeForPrivacyPolicyTerm: boolean; // 개인정보 활용 동의 여부
    isAgreeForMarketingTerm: boolean; // 마케팅 수신 동의 여부
    organizationName?: string; // 생성할 조직 이름 (없으면 사용자명으로 생성)
};

export type UserGoogleSocialSignUpRequestDtoV2 = {
    phone: string; // 전화번호
    isAgreeForServiceUsageTerm: boolean; // 서비스 이용약관 동의 여부
    isAgreeForPrivacyPolicyTerm: boolean; // 개인정보 활용 동의 여부
    isAgreeForMarketingTerm: boolean; // 마케팅 수신 동의 여부
    organizationName?: string; // 생성할 조직 이름 (없으면 사용자명으로 생성)
};

export type UserSocialSignUpInvitedRequestDto = UserSocialSignUpRequestDto & {
    organizationId: number; // 초대받은 조직 ID
};

export type UserGoogleSocialSignUpInvitedRequestDto = UserGoogleSocialSignUpRequestDtoV2 & {
    organizationId: number; // 초대받은 조직 ID
    isFromCopiedLink?: boolean;
};

export class UserDto {
    id: number;
    name: string;
    phone: string;
    profileImgUrl: string;
    lastSignedOrgId: number;
    // orgId: number;
    email: string;
    isAdmin: boolean;
    locale: UserLocale | null;
    @TypeCast(() => Date) serviceUsageTermAgreedAt: Date;
    @TypeCast(() => Date) privacyPolicyTermAgreedAt: Date;

    // 마케팅 수신 허용 여부
    get isAgreeForMarketingTerm() {
        return !!this.marketingTermAgreedAt;
    }
    @TypeCast(() => Date) marketingTermAgreedAt: Date | null; // 마케팅 수신 동의 여부

    // 이메일 알림 수신 허용 여부
    get isEmailNoticeAllowed() {
        return !!this.emailNoticeAllowedAt;
    }
    @TypeCast(() => Date) emailNoticeAllowedAt: Date | null; // 이메일 알림 수신 허용 시각

    // SMS 알림 수신 허용 여부
    get isSMSNoticeAllowed() {
        return !!this.smsNoticeAllowedAt;
    }
    @TypeCast(() => Date) smsNoticeAllowedAt: Date | null; // SMS 알림 수신 허용 시각

    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;

    // relations
    @TypeCast(() => MembershipDto) memberships?: MembershipDto[];
    @TypeCast(() => UsersSocialAccountDto) socialAccounts?: UsersSocialAccountDto[];

    findMembershipByOrgId(orgId: number) {
        if (!orgId || isNaN(orgId)) return;
        if (!this.memberships) return;

        return this.memberships.find((membership) => {
            return membership.organizationId === orgId;
        });
    }
}

export type UserLoginRequestDto = {
    email: string;
    password: string;
};

export type UserSocialLoginRequestDto = {
    provider: string; // 소셜로그인공급자
    uid: string; // 소셜로그인 ID
};

export type JwtContainer = {
    token: string;
};

export type GoogleAccessTokenContainer = {
    accessToken: string;
};

// 사용자 정보 수정
export type UserEditProfileRequestDto = {
    name?: string;
    phone?: string;
    email?: string;
    password?: string;
    passwordConfirmation?: string;
    isAgreeForMarketingTerm?: boolean; // 마케팅 수신 동의 여부
    isEmailNoticeAllowed?: boolean; // 이메일 알림 동의 여부
    isSMSNoticeAllowed?: boolean; // sms 알림 동의 여부
    locale?: UserLocale | null; // 사용자 언어 설정
};

export class SendPhoneAuthMessageDto {
    phoneNumber: string;
    code?: string;
}

export type UsersWebpushRegisterDto = {
    subscription: PushSubscription;
};

export type UsersWebpushTestDto = {
    status: number;
    code: string;
    message: string;
};

export type UserDeviceDto = {
    id: number; // 아이디
    userId: number; // 회원 ID
    isMobile: boolean; // 모바일여부
    fcmToken: string; // FCM 토큰
    createdAt: Date; // 생성일시
    updatedAt: Date; // 수정일시
    user?: UserDto; // 회원
};

export class CreateUserDeviceRequestDto {
    isMobile: boolean; // 모바일여부
    fcmToken: string; // FCM 토큰
}

export class FindAllUserByAdminDto extends FindAllQueryDto<UserDto> {
    keyword?: string;
    orgId?: number;
    notAdmin?: boolean;
}

export class UpdateUserByAdminDto {
    isAdmin?: boolean; // 관리자 여부
}

export type JobType =
    | 'PRESIDENT'
    | 'C_LEVEL'
    | 'HR_LEADER'
    | 'HR_MANAGER'
    | 'GA_LEADER'
    | 'GA_MANAGER'
    | 'ENGINEER'
    | 'ETC';

export const JOB_LABEL: Record<JobType, string> = {
    PRESIDENT: '사장',
    C_LEVEL: 'C-레벨',
    HR_LEADER: '인사팀장',
    HR_MANAGER: '인사매니저',
    GA_LEADER: '총무팀장',
    GA_MANAGER: '총무매니저',
    ENGINEER: '엔지니어',
    ETC: '기타',
};

export const utilJobLabel = (status?: JobType) => {
    return status ? JOB_LABEL[status] : '';
};

// 회원가입
export class CreateUserRequestDto {
    name: string;
    email: string;
    passWord?: string;
    passwordConfirmation?: string;
    phone: string;
    job: JobType;
    profileImageUrl?: string;

    /* 약관 동의 모달 */
    isAgreeForMarketingTerm: boolean; // 마케팅 수신 동의 여부
    isAgreeForPrivacyPolicyTerm: boolean; // 개인정보 활용 동의 여부
    isAgreeForServiceUsageTerm: boolean; // 서비스 이용약관 동의 여부
}

/* 인증번호 확인 */
export class PhoneAuthConfirmDto {
    phoneNumber: string;
    code?: string;
}

export class CreateOrganizationRequestDto {
    name: string; // 조직명
    bizInfo: {
        bizNo: string; // 사업자등록번호
        employeeScale: string; // 조직규모
    };
}

/* 유입경로 */
export class CreateUserDetailRequestDto {
    funnel: string;
    funnelEtc: string; // funnel이 기타인 경우 기타 경로 작성
}

/* API 요청 성공 시 반환 */
export interface CreateUserResponseDto {
    id: number;
    name: string;
    phone: string;
    profileImgUrl: string;
    lastSignedOrgId: number;
    email: string;
    job: JobType;
    isAdmin: boolean;
    locale: Record<string, unknown>;
    serviceUsageTermAgreedAt: string; // 서비스 이용약관 동의 여부
    privacyPolicyTermAgreedAt: string;
    marketingTermAgreedAt: {
        description: string; // 마케팅 수신 동의 여부
    };
    emailNoticeAllowedAt: {
        description: string; // 이메일 알림 수신 허용 여부
    };
    smsNoticeAllowedAt: {
        description: string; // SMS 알림 수신 허용 여부
    };
    createdAt: string;
    updatedAt: string; // 수정 일시
    detail: {
        description: string; // 회원 추가 정보
    };
    memberships: {
        description: string; // 멤버십 목록
    };
    socialAccounts: string[]; //소셜 계정 목록
    signedHistories: {
        description: string; // 접속 기록 목록
    };
}

/* API 요청 에러 */
export interface ErrorResponse {
    status: number;
    code: string;
    message: string;
    data: Record<string, any>;
}
