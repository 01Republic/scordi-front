import {CreateOrganizationRequestDto, OrganizationDto} from '^types/organization.type';
import {MembershipDto} from '^types/membership.type';

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

export type UserDto = {
    id: number;
    name: string;
    phone: string;
    orgId: number;
    orgName: string;
    email: string;
    isAdmin: boolean;
    serviceUsageTermAgreedAt: string;
    privacyPolicyTermAgreedAt: string;
    createdAt: string;
    updatedAt: string;
};

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

export type UserEditProfileRequestDto = {
    name?: string;
    phone?: string;
    email?: string;
    orgName?: string;
    password?: string;
    passwordConfirmation?: string;
};

export type SendPhoneAuthMessageDto = {
    phoneNumber: string;
    code?: string;
};
