import { CreateOrganizationRequestDto, OrganizationDto } from '^types/organizationTypes';
import { MembershipDto } from '^types/membershipTypes';

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
