import {CreateOrganizationRequestDto, OrganizationDto} from '^types/organization.type';
import {MembershipDto} from '^types/membership.type';

export type UserSignUpRequestDto = {
    name: string;
    phone: string;
    orgName: string;
    email: string;
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
