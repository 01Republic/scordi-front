import {UserDto} from '^types/user.type';
import {MembershipDto} from './membership.type';
import {TypeCast} from '^types/utils/class-transformer';

export type CreateOrganizationRequestDto = {
    name: string;
};

export type UpdateOrganizationRequestDto = Partial<CreateOrganizationRequestDto> & {
    name?: string;
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
    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;

    memberships?: MembershipDto[];
    users?: UserDto[];
}
