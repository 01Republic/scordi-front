import {AccountDto} from '^types/account.type';
import {SubscriptionDto} from '^types/subscription.type';
import {ProductDto} from '^types/product.type';
import {OrganizationDto} from '^types/organization.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

export class WorkspaceDto {
    id: number;
    displayName: string;
    slug: string;
    profileImageUrl: string;
    roles: WorkspaceRole[];
    billingPageUrl?: string | null;
    membersPageUrl?: string | null;
    orgPageUrl?: string | null;
    publicEmail?: string | null;
    billingEmail?: string | null;
    description?: string | null;
    organizationId: number;
    organization: OrganizationDto;
    syncAccountId: number;
    syncAccount: AccountDto;
    productId: number;
    product: ProductDto;
    subscriptions?: SubscriptionDto[] | null;
}

export type FindAllWorkspacesQuery = FindAllQueryDto<WorkspaceDto>;

export type CreateWorkspaceRequestDto = {
    displayName: string;
    slug: string;
    profileImageUrl: string;
    billingPageUrl?: string | null;
    membersPageUrl?: string | null;
    orgPageUrl?: string | null;
    publicEmail?: string | null;
    billingEmail?: string | null;
    description?: string | null;
};

export type UpdateWorkspaceRequestDto = Partial<Omit<CreateWorkspaceRequestDto, 'displayName' | 'slug'>>;

export enum WorkspaceRoleType {
    OWNER = 'owner',
    ADMIN = 'admin',
    MEMBER = 'member',
    INVITED = 'invited',
}

export type WorkspaceRole = {
    id: number;
    accountId: number;
    account: AccountDto;
    workspaceId: number;
    workspace: WorkspaceDto;
    role: WorkspaceRoleType;
};

export type WorkspaceMemberDto = {
    id: number;
    name: string;
    role?: string | null;
    link?: string | null;
    profileImgUrl?: string | null;
    workspaceId: number;
    workspace: WorkspaceDto;
};

export type FindAllWorkspaceMembersQuery = FindAllQueryDto<WorkspaceMemberDto>;

export type CreateWorkspaceMemberRequestDto = {
    name: string;
    role?: string | null;
    link?: string | null;
    profileImgUrl?: string | null;
};

export type UpdateWorkspaceMemberRequestDto = Partial<Omit<CreateWorkspaceMemberRequestDto, 'workspaceId'>>;
