import {UserDto} from '^types/user.type';
import {MembershipDto} from './membership.type';

export type CreateOrganizationRequestDto = {
    name: string;
};

export type UpdateOrganizationRequestDto = Partial<CreateOrganizationRequestDto> & {
    slug?: string;
    image?: File | string;
    address?: string;
    addressDetail?: string;
};

export type SearchOrgQueryDto = {
    keyword: string;
};

export type OrganizationDto = {
    id: number;
    name: string;
    slug: string;
    image?: string;
    address?: string | null;
    addressDetail?: string | null;
    createdAt: Date;
    updatedAt: Date;
    memberships?: MembershipDto[];
    users?: UserDto[];
};
