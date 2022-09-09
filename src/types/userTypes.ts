import { CreateOrganizationRequestDto, OrganizationDto } from '^types/organizationTypes';
import { MembershipDto } from '^types/membershipTypes';

export type UserSignUpRequestDto = {
  name: string;
  email: string;
  password: string;
  // organization: CreateOrganizationRequestDto;
};

export type UserDto = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  memberships?: MembershipDto[];
  organizations?: OrganizationDto[];
};

export type UserLoginRequestDto = {
  email: string;
  password: string;
};

export type JwtContainer = {
  token: string;
};
