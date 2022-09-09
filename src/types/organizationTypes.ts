import { UserDto } from '^types/userTypes';

export type CreateOrganizationRequestDto = {
  name: string;
};

export type UpdateOrganizationRequestDto = Partial<CreateOrganizationRequestDto> & {
  slug?: string;
  image?: string;
}

export type SearchOrgQueryDto = {
  keyword: string;
}

export type OrganizationDto = {
  id: number;
  name: string;
  slug: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  // memberships?: Promise<MembershipDto[]>;
  users?: UserDto[];
}
