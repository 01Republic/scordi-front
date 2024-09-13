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

    findMemberShipByOrgId(orgId: number) {
        if (!orgId || !this.memberships) return null;

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

export type CreateUserDeviceRequestDto = {
    isMobile: boolean; // 모바일여부
    fcmToken: string; // FCM 토큰
};

export type FindAllUserByAdminDto = FindAllQueryDto<UserDto> & {
    keyword?: string;
    orgId?: number;
    notAdmin?: boolean;
};
