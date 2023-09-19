import {UserDto} from '^types/user.type';
import {MembershipDto} from './membership.type';
import {Type} from 'class-transformer';

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

export class OrganizationDto {
    id: number;
    name: string;
    slug: string;
    image?: string;
    address?: string | null;
    addressDetail?: string | null;
    @Type(() => Date) createdAt: Date;
    @Type(() => Date) updatedAt: Date;

    memberships?: MembershipDto[];
    users?: UserDto[];
}
